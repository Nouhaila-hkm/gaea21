<?php
    
    namespace App\Controller;
    
    use App\Entity\Article;
    use App\Entity\TranslationAdapter;
    use App\Form\ArticleType;
    use App\Repository\ArticleRepository;
    use App\Repository\TranslationAdapterRepository;
    use Doctrine\ORM\EntityManagerInterface;
    use Knp\Component\Pager\PaginatorInterface;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\Routing\Annotation\Route;
    
    class ArticleAdminController extends AbstractController
    {
        #[Route('/article/admin', name: 'app_article_admin')]
        public function index(Request $request, ArticleRepository $articleRepository, EntityManagerInterface $manager, PaginatorInterface $paginator): Response
        {
            //  $articles = $articleRepository->findAll();
            $articles = $paginator->paginate(
                $articleRepository->findAllArticles(), /* query NOT result */
                $request->query->getInt('page', 1), /*page number*/
                8 /*limit per page*/
            );
            // dd($articles);
            return $this->render('article_admin/index.html.twig', [
                'articles' => $articles
            ]);
        }
        #[Route('/article/admin/ajouter', name: 'app_article_admin_ajouter')]
        public function ajouterArticle(Request $request)
        {
        
            $article = new Article();
            $form = $this->createForm(ArticleType::class, $article);
            $form->handleRequest($request);
        
            if ($form->isSubmitted() && $form->isValid()) {
            
                // dd($article);
                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->persist($article);
                $entityManager->flush();
                return $this->redirectToRoute('app_article_admin_ajouter');
            }
        
            return $this->render('admin/ajouterArticle.html.twig', [
                'form' => $form->createView(),
            ]);
        }
    
        #[Route('/article/admin/{id}', name: 'afficher_article', methods: [ 'GET'])]
        public function afficher(ArticleRepository $articleRepository,$id){
            $article = $articleRepository->find($id);
            return $this->render('article_admin/article.admin.html.twig', [
                'article' => $article
            ]);
        }
        
   
    
        // remove an article

        #[Route('/article/admin/supprimer/{id}', name: 'supprimer_article', methods: ['POST', 'GET'])]
        public function deleteArticle(int $id,TranslationAdapterRepository $translationAdapterRepository): Response
        {
            // $article = $this->getDoctrine()->getRepository(Article::class)->find($id);
            
            $article = $this->getDoctrine()
                ->getRepository(Article::class)
                ->find($id);
            $adapter = $this->getDoctrine()->getRepository(TranslationAdapter::class);
            $adapter->findTranslaterByArticleId($id);
           
            //dd($tid);
            $manager = $this->getDoctrine()->getManager();
            $manager->remove($adapter);
           // $translationAdapterRepository->remove($article->getTranslationAdapters());
          //  $article->removeTranslationAdapter();
            $manager->remove($article);
           // $translationAdapterRepository->remove();
          // $manager->remove();
            $manager->flush();
            
            
            return $this->redirectToRoute('app_article_admin');
        }
        
    }
