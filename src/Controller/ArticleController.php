<?php
    
    namespace App\Controller;
    
    use App\Entity\Article;
    use App\Entity\Langue;
    use App\Entity\NavBarre;
    use App\Entity\NavigationElem;
    use App\Entity\SocialShareCount;
    use App\Entity\SocialTool;
    use App\Entity\Tag;
    use App\Entity\TagCategory;
    use App\Entity\WebContent;
    use App\Form\ArticleType;
    use App\Repository\ArticleRepository;
    use App\Repository\LangueRepository;
    use App\Repository\SocialShareCountRepository;
    use Doctrine\ORM\EntityManagerInterface;
    use Doctrine\Persistence\ManagerRegistry;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\Routing\Annotation\Route;
    use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
    
    function array_find($xs, $f)
    {
        foreach ($xs as $x) {
            if (call_user_func($f, $x) === true)
                return $x;
        }
        return null;
    }
    
    function optionalDo($tab, $name, callable $default, callable $do)
    {
        if (isset($tab[$name])) return $do($tab[$name]);
        else return $default();
    }
    
    function optional($tab, $name, callable $default)
    {
        if (isset($tab[$name])) return $tab[$name];
        else return $default();
    }
    
    
    class ArticleController extends AbstractController
    {
        
        
        public function getIdLangues($l)
        {
            
            $langueRepository = $this->getDoctrine()->getRepository(Langue::class);
            $langue = $langueRepository->findOneBy(array("Abreviation" => strtoupper($l)));
            return $langue->getId();
            
            
        }
        
        private function setDefaultFilters(&$ofilters)
        {
            $articleRep = $this->getDoctrine()->getRepository(Article::class);
            $tagCategRep = $this->getDoctrine()->getRepository(TagCategory::class);
            $filters = $articleRep->filterToAssociativeUnion($ofilters);
            
            if (!isset($filters["categoryId"]))
                $ofilters[] = ["categoryId", $tagCategRep->findByFilter(["first"])[0]->getId()];
            
            if (!isset($filters["page"]))
                $ofilters[] = ["page", 0];
            
            $ofilters[] = ["newestFirst"];
        }
        
        private function fillOfFilters(&$tab, $ofilters)
        {
            $tagRep = $this->getDoctrine()->getRepository(Tag::class);
            $tagCategRep = $this->getDoctrine()->getRepository(TagCategory::class);
            $articleRep = $this->getDoctrine()->getRepository(Article::class);
            $socialCountRep = $this->getDoctrine()->getRepository(SocialShareCount::class);
            $lang = $this->getLang();
            
            $filters = $articleRep->filterToAssociativeUnion($ofilters);
            // $ofilters[]="french";
            
            $category = optionalDo($filters, "categoryId",
                fn() => null,
                fn($a) => $tagCategRep->findByFilter([["id", $a[0]]])[0],
            );
            
            $this->fillSearch($tab,
                optionalDo($filters, "text", fn() => "", fn($a) => $a[0])
            );
            
            $this->fillTagMenu($tab,
                $category,
                optionalDo($filters, "tagName", fn() => [], fn($a) => $a),
            );
            
            $this->fillMenu($tab,
                $category == null ? -1 : $category->getId()
            );
            
            $this->fillArticles($tab,
                array_map(
                    fn($a) => $this->serializeArticle($a, $socialCountRep->getShareCountsOrCreate($a, $tab["socials"]), $lang),
                    $articleRep->findByFilter($ofilters)
                ),
                optionalDo($filters, "page", fn() => 0, fn($a) => $a[0]),
                $articleRep->countPageByFilter(array_filter($ofilters, fn($e) => $e[0] != "page")),
            );
            
            $this->fillFilterList($tab,
                $filters
            );
            
        }
        
        private function getLang()
        {
            $langRep = $this->getDoctrine()->getRepository(Langue::class);
            return $langRep->getByAbreviation("FR");
            
        }
        
        private function fillSearch(&$tab, $search)
        {
            $tab['search'] = $search;
        }
        
        private function fillTagMenu(&$tab, $selectedTagCateg, $selectedTags)
        {
            $tagRep = $this->getDoctrine()->getRepository(Tag::class);
            
            $tags = array_merge($selectedTagCateg == null ? [] : $selectedTagCateg->getTags()->toArray(), $tagRep->findByFilter([["normalized", $selectedTags]]));
            $tags = array_unique($tags, SORT_REGULAR);
            
            $tab["tags"] = $tags;
            $tab["selectedTags"] = $selectedTags;
        }
        
        private function fillMenu(&$tab, $selectedCategory)
        {
            $navigationRep = $this->getDoctrine()->getRepository(NavigationElem::class);
            $navbarRep = $this->getDoctrine()->getRepository(NavBarre::class);
            $tagCategRep = $this->getDoctrine()->getRepository(TagCategory::class);
            $socialToolRep = $this->getDoctrine()->getRepository(SocialTool::class);
            
            $tab["Elements"] = $navigationRep->findAll();
            $tab["Items"] = $navbarRep->findAll();
            $tab["categories"] = $tagCategRep->findAll();
            $tab["socials"] = $socialToolRep->findAll();
            $tab["selectedCategory"] = $selectedCategory;
            
        }
        
        private function fillArticles(&$tab, $articles, $page, $maxpage)
        {
            $tab["articles"] = $articles;
            $tab["page"] = $page;
            $tab["maxpage"] = $maxpage;
        }
        
        private function serializeArticle($article, $shares, $lang)
        {
            $articleManager = $this->getDoctrine()->getRepository(Article::class);
            $tradManager = $this->getDoctrine()->getRepository(WebContent::class);
            return [
                'id' => $article->getId(),
                'content' => $tradManager->getTranslateds(Article::class, $article, $lang),
               /* 'content'=>$articleManager->getArticleByLangueId(27),*/
             //   'content'=>$articleManager->getArticleByAbreviation('EN'),
                'shares' => $shares,
            ];
        }
        
        private function fillFilterList(&$tab, $associativeFilters)
        {
            $filters = [];
            if (isset($associativeFilters["text"])) {
                $filters[] = ["removed" => ["search"], "text" => "Recherche : " . $associativeFilters["text"][0]];
            }
            foreach (optional($associativeFilters, "tagName", fn() => []) as $t) {
                $filters[] = ["removed" => ["tag=" . $t], "text" => "Tag : " . $t];
            }
            $tab["filters"] = $filters;
        }
        
//        /**
//         * @Route("/{langue}/article", name="article")
//         */
//        public function item(Article $article, $langue, ArticleRepository $articleRepository): Response
//        {
//            $langueId = $this->getIdLangues($langue);
//
//            $request = Request::createFromGlobals();
//
//            // Repositories
//            $langRep = $this->getDoctrine()->getRepository(Langue::class);
//            $articleRep = $this->getDoctrine()->getRepository(Article::class);
//            $socialCountRep = $this->getDoctrine()->getRepository(SocialShareCount::class);
//            $articleRep->setPerPage(6);
//
//            // Langue
//            $langue = $langRep->getByAbreviation("FR");
////      if (strtoupper($langue)=='FR'){
////          $articles = $articleRepository->getFrenchArticles();
////          // $articles->setPerpage(6);
////          $tab['articles'] = $articleRepository->getFrenchArticles();
////      }else
////      {
////          $articles = $articleRepository->getArticleByLangue($langueId);
////          //  $articles->setPerpage(6);
////
////      }
//
//            //Filter
//            $filters = array_merge(
//                [
//                    "complete",
//                    array_merge(["tagName"], $article->getTags()->map(function ($t) {
//                        return $t->getNormalized();
//                    })->toArray()),
//                ],
//                $articleRep->getFiltersOfQuery($request->query),
//            );
//            $this->setDefaultFiltersForItem($filters);
//            $this->fillOfFilters($data, $filters);
//            $data['article'] = $this->serializeArticle($article, $socialCountRep->getShareCountsOrCreate($article, $data["socials"]), $langue);
//            // dd($data);
//            return $this->render('gaea21/articles/item.html.twig', $data);
//        }
    
        /**
         * @Route("/{langue}/article/", name="articles")
         */
        public function list(SocialShareCountRepository $socialShareCountRepository, ArticleRepository $articleRepository, LangueRepository $langueRepository, $langue): Response
        {
            $request = Request::createFromGlobals();
            $langueId = $this->getIdLangues($langue);
        
            // Repositories
            $articleRep = $this->getDoctrine()->getRepository(Article::class)/*->findBy([
        "isFrench"=>1
    ])*/
            ;
            // dd($articleRepository);
            $socialCountRep = $this->getDoctrine()->getRepository(SocialShareCount::class);
        
            // dump($articleRep);
            $articleRep->setPerPage(6);
            //  $articles->setPerPage(6);
        
            //Filter
            $filters = array_merge(
                ["complete"],
                $articleRep->getFiltersOfQuery($request->query
                )
            // $articles->getFiltersOfQuery($request->query)
            );
            $this->setDefaultFilters($filters);
            $this->fillOfFilters($data, $filters);
        
            $articles = $articleRepository->getArticleByLangue(strtoupper($langue));
            // dd($articles);
            $data['langue'] = $langue;
            return $this->render('gaea21/article/list.html.twig', $data);
        }
    
    
    
        /**
         * @Route("/{langue}/article/{article}", name="article")
         */
        public function item(Article $article, $langue): Response
        {
            $request = Request::createFromGlobals();
        
            // Repositories
            $langRep=$this->getDoctrine()->getRepository(Langue::class);
            $articleRep=$this->getDoctrine()->getRepository(Article::class);
            $socialCountRep=$this->getDoctrine()->getRepository(SocialShareCount::class);
            $articleRep->setPerPage(6);
        
            // Langue
            $lang=$langRep->getByAbreviation("FR");
        
            //Filter
            $filters=array_merge(
                [
                    "complete",
                    array_merge(["tagName"], $article->getTags()->map(function($t){
                        return $t->getNormalized();
                    })->toArray()),
                ],
                $articleRep->getFiltersOfQuery($request->query),
            );
            $this->setDefaultFiltersForItem($filters);
            $this->fillOfFilters($data,$filters);
            $data['article']=$this->serializeArticle($article, $socialCountRep->getShareCountsOrCreate($article,$data["socials"]), $lang);
            $data['langue'] = $langue;
           // dd($data);
            return $this->render('gaea21/article/item.html.twig', $data);
        }
    
        private function setDefaultFiltersForItem(&$ofilters)
        {
            $articleRep = $this->getDoctrine()->getRepository(Article::class);
            
            $filters = $articleRep->filterToAssociativeUnion($ofilters);
            
            if (!isset($filters["page"]))
                $ofilters[] = ["page", 0];
        }
        
        /**
         * @Route("/articleshare/{langue}/{article}/{tool}/", name="articleshare")
         */
        public function share(EntityManagerInterface $manager, Article $article, SocialTool $tool, $langue): Response
        {
            // Repository
            $countRep = $this->getDoctrine()->getRepository(SocialShareCount::class);
            $tradManager = $this->getDoctrine()->getRepository(WebContent::class);
            
            // Get objects
            $lang = $this->getLang();
            //$langue =
            $translated = $tradManager->getTranslateds(Article::class, $article, $lang);
            
            // Create url
            $urlarticle = $this->generateUrl('article', ["article" => $article->getId(), "langue" => $langue], UrlGeneratorInterface::ABSOLUTE_URL);
            $sharelink = $tool->createShareLink($urlarticle, $translated->getTitle());
            
            // Up count
            $count = $countRep->getShareCountOrCreate($article, $tool);
            $count->upCount();
            $manager->flush();
            
            // Redirect
            return $this->redirect($sharelink);
        }
        /**
         * @Route("/articleshare/images", name="articleimage")
         *
         */
        public function images(ArticleRepository $articleRepository){


            $articles = $articleRepository->findAll();
            $em = $this->getDoctrine()->getManager();
            foreach ($articles as $article){
                $id = rand(1,500);
               $selectedImage = "https://picsum.photos/id/".$id."/350/250";
               $article->setImage($selectedImage);
               $em->persist($article);
            }
            $em->flush();;

          // dd($articles);
            return $this->render('gaea21/article/item.html.twig');
        }
        private function fillBase(&$tab)
        {
            $tab['controller_name'] = 'Gaea21Controller.php';
        }
        /**
         * @Route("article/ajouter", name="ajouter_article")
         */    public function ajouterArticle( Request $request)
    {
        
        $article = new Article();
        $form = $this->createForm(ArticleType::class,$article);
        $form->handleRequest($request);
    
          if ($form->isSubmitted() && $form->isValid()) {
              
             // dd($article);
              $entityManager = $this->getDoctrine()->getManager();
              $entityManager->persist($article);
              $entityManager->flush();
              return $this->redirectToRoute('ajouter_article');
          }
    
        return $this->render('admin/ajouterArticle.html.twig', [
            'form' => $form->createView(),
        ]);
    }
        
        
    }

