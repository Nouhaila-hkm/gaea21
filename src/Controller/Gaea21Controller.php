<?php

namespace App\Controller;

use Dompdf\Dompdf;
use Dompdf\Options;
use App\Entity\Langue;
use App\Entity\Article;
use App\Entity\Category;
use App\Entity\NavBarre;
use App\Entity\WebContent;
use App\Form\ArticleType;
use App\Form\ContentType;
use App\Form\CategoryType;
use App\Entity\NavigationElem;
use Doctrine\ORM\EntityManager;
use phpDocumentor\Reflection\Element;
use Doctrine\Persistence\ObjectManager;
use Doctrine\ORM\EntityManagerInterface;
use phpDocumentor\Reflection\Types\Null_;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class Gaea21Controller extends AbstractController
{
  /**
   * @Route("/index/pdf", name="genererPdf")
   */
  public function GenererPdf()
  {
    $pdfOptions = new Options();
    $pdfOptions->set('defaultFont', 'Arial');
    $dompdf = new Dompdf($pdfOptions);
    $repo = $this->getDoctrine()->getRepository(NavigationElem::class);
    $repo1 = $this->getDoctrine()->getRepository(NavBarre::class);
    $Elements = $repo->findAll();
    $Items = $repo1->findAll();
    $html = $this->renderView('gaea21/index.html.twig', [
      'Elements' => $Elements,
      'Items' => $Items
    ]);

    $dompdf->loadHtml($html);

    $dompdf->render();

    $dompdf->stream("mypdf.pdf", [
      "Attachment" => false
    ]);
  }

  /**
   * @Route("/gaea21", name="gaea21")
   */
  public function indexG()
  {
    return $this->render('gaea21/index.html.twig');
  }

  /**
   * @Route("/gaea21/part", name="gaea21_part")
   */
  public function partenaireForm()
  {
    return $this->render('gaea21/part.html.twig');
  }



  /**
   * @Route("/form")
   */
  public function form()
  {
    return $this->render('gaea21/form.html.twig');
  }


  /**
   * @Route("/", name="home")
   */
  public function HomePage()
  {
    $repo = $this->getDoctrine()->getRepository(NavigationElem::class);
    $repo1 = $this->getDoctrine()->getRepository(NavBarre::class);
    $Elements = $repo->findAll();
    $Items = $repo1->findAll();

    // // dd($Elements);
    // dd($Items);
    return  $this->render('gaea21/home.html.twig', [
      'Elements' => $Elements,
      'Items' => $Items
    ]);
  }

  /**
   * @Route("/gaea21", name="gaea21")
   */
  public function QuiSommeNous()
  {
    $repo = $this->getDoctrine()->getRepository(NavigationElem::class);
    $repo1 = $this->getDoctrine()->getRepository(NavBarre::class);
    $repo2 = $this->getDoctrine()->getRepository(Category::class);
    $repo3 = $this->getDoctrine()->getRepository(Langue::class);
    $repo4 = $this->getDoctrine()->getRepository(WebContent::class);
    $Elements = $repo->findAll();
    $Items = $repo1->findAll();
    $categories = $repo2->findAll();
    $Langues = $repo3->findAll();
    $Webcontents = $repo4->findAll();
    return  $this->render('main/gaea21.html.twig', [
      'Elements' => $Elements,
      'Items' => $Items,
      'Categoris' => $categories,
      'Langues' => $Langues,
      'Contents' => $Webcontents,
    ]);
  }

  /**
   * @Route("/Categorie", name="Categorie")
   * @Route("/Categorie/{id}/Edit", name="modifier")
   */
  public function AjoutCategorie(Category $category = null, Request $request, EntityManagerInterface $manager)
  {
    if ($category == null) {
      $category = new Category();
      $statut = true;
    } else {
      $statut = false;
    }
    $form = $this->createForm(CategoryType::class, $category);
    $form->handleRequest($request);
    if ($form->isSubmitted() && $form->isValid()) {
      $manager->persist($category);
      $manager->flush();
      return $this->redirectToRoute('gaea21');
    } else {
      return $this->render('gaea21/Categorie.html.twig', [
        'formCategorie' => $form->createView(),
        'statut' => $statut
      ]);
      return $this->render('gaea21/Categorie.html.twig', [
        'formCategorie' => $form->createView(),
        'statut' => $statut
      ]);
    }

    return $this->render('main/Categorie.html.twig', []);
  }

  /**
   *  @Route("/gaea21/{id}/supprimer", name="delete")
   */
  public function supprimer($id, Request $request, EntityManagerInterface $manager)
  {
    $repo = $this->getDoctrine()->getRepository(Category::class);
    $resultat = $repo->findAll();
    $reponse = $repo->find($id);
    if ($reponse !== null) {
      $manager->remove($reponse);
      $manager->flush();
      return $this->redirectToRoute('gaea21');
    }
    return $this->render('gaea21/gaea21.html.twig', [
      //'controller_name' => 'ContactController',
      'Categoris' =>  $resultat
    ]);
  }

  /**
   * @Route("/Langue", name="Ajout")
   * @Route("/Langue/{id}/editer", name="Modif")
   */
  public function AjoutLangue(Langue $langue = null, Request $request, EntityManagerInterface $manager)
  {

    if ($langue == null) {
      $langue = new Langue();
      $statut = true;
    } else {
      $statut = false;
    }
    $form = $this->createFormBuilder($langue)
      ->add('name', TextType::class)
      ->add('Abreviation', TextType::class)
      ->add('Icons', FileType::class, array('label' => 'Photo (png, jpeg)', 'data_class' => null))
      ->getForm();
    $form->handleRequest($request);
    if ($form->isSubmitted() && $form->isValid()) {
      $file = $langue->getIcons();
      $fileName = md5(uniqid()) . '.' . $file->guessExtension();
      // $file->move($this->getParameter('photos_directory'), $fileName);
      $langue->setIcons($fileName);
      $manager->persist($langue);
      $manager->flush();
      return $this->redirectToRoute('gaea21');
    } else {
      return $this->render('gaea21/Langue.html.twig', [
        'formLangue' => $form->createView(),
        'statut' => $statut
      ]);
      return $this->render('gaea21/Langue.html.twig', [
        'formLangue' => $form->createView(),
        'statut' => $statut
      ]);
    }

    return $this->render('gaea21/Langue.html.twig', []);
  }

  /**
   *  @Route("/gaea21/{id}/Supprimer", name="Del")
   */
  public function supprimerLangue($id, Request $request, EntityManagerInterface $manager)
  {
    $repo = $this->getDoctrine()->getRepository(Langue::class);
    $resultat = $repo->findAll();
    $reponse = $repo->find($id);
    if ($reponse !== null) {
      $manager->remove($reponse);
      $manager->flush();
      return $this->redirectToRoute('gaea21');
    }
    return $this->render('contact/index.html', [
      //'controller_name' => 'ContactController',
      'Langues' =>  $resultat
    ]);
  }

  // Crud du webContent


  // public function AjoutWebContent(WebContent $webcontent=null ,Request $request,EntityManagerInterface $manager)
  // {
  //  if($webcontent==null)
  //                {
  //                   $webcontent = new WebContent();
  //                   $statut = true;

  //                 }else{
  //                   $statut = false;
  //                 }
  //                 $form = $this->createForm(ContentType::class,$webcontent);
  //                 $form->handleRequest($request);
  //                if ($form->isSubmitted() && $form->isValid()) {
  //                  $manager->persist($webcontent);
  //                  $manager->flush();
  //                 return $this->redirectToRoute('gaea21');
  //                } else {
  //                  return $this->render('main/WebContent.html.twig',[
  //                    'formContent'=> $form->createView(),
  //                    'statut' => $statut
  //                ]);
  //                return $this->render('main/WebContent.html.twig',[
  //                  'formContent'=> $form->createView(),
  //                  'statut' => $statut
  //              ]);
  //                }

  //     return $this->render('main/Categorie.html.twig',[
  //     ]);
  // }


  /**
   *  @Route("/gaea21/{id}/suppri", name="del")
   */
  public function supprimerWebCont($id, Request $request, EntityManagerInterface $manager)
  {
    $repo = $this->getDoctrine()->getRepository(WebContent::class);
    $resultat = $repo->findAll();
    $reponse = $repo->find($id);
    if ($reponse !== null) {
      $manager->remove($reponse);
      $manager->flush();
      return $this->redirectToRoute('gaea21');
    }
    return $this->render('gaea21/gaea21.html.twig', [
      'Contents' =>  $resultat
    ]);
  }


  // pour la page coaching carriere


  /**
   * @Route("/coaching", name="coaching")
   * @Route("/coaching/{id}/Editer", name="modif")
   */
  public function CoachingCarriere(WebContent $webcontent = null, Request $request, EntityManagerInterface $manager)
  {
    $repo = $this->getDoctrine()->getRepository(NavigationElem::class);
    $repo1 = $this->getDoctrine()->getRepository(NavBarre::class);
    $repo4 = $this->getDoctrine()->getRepository(WebContent::class);
    $Elements = $repo->findAll();
    $Items = $repo1->findAll();
    $Webcontents = $repo4->findAll();

    if ($webcontent == null) {
      $webcontent = new WebContent();
      $statut = true;
    } else {
      $statut = false;
    }

    $form = $this->createForm(ContentType::class, $webcontent);
    $form->handleRequest($request);
    if ($form->isSubmitted() && $form->isValid()) {
      $manager->persist($webcontent);
      $manager->flush();
      return $this->redirectToRoute('gaea21');
    } else {
      return $this->render('gaea21/coaching.html.twig', [
        'formContent' => $form->createView(),
        'statut' => $statut,
        'Elements' => $Elements,
        'Items' => $Items,
        'Contents' => $Webcontents
      ]);
      return $this->render('gaea21/coaching.html.twig', [
        'formContent' => $form->createView(),
        'statut' => $statut,
        'Elements' => $Elements,
        'Items' => $Items,
        'Contents' => $Webcontents
      ]);
    }
    return  $this->render('gaea21/Coaching.html.twig', []);
  }



  /**
   * @Route("/articl", name="articl")
   * @Route("/articl/{id}/edit", name="modi")
   */

  public function CreationArticle(Article $article = null, Request $request, EntityManagerInterface $manager)
  {
    // Fetch navbar items, navmenu items and webcontent
    $elementRepository = $this->getDoctrine()->getRepository(NavigationElem::class);
    $elements = $elementRepository->findAll();

    $itemRepository = $this->getDoctrine()->getRepository(NavBarre::class);
    $items = $itemRepository->findAll();

    $contentRepository = $this->getDoctrine()->getRepository(WebContent::class);
    $contents = $elementRepository->findAll();

    // Get current article
    if ($article == null) {
      $article = new Article;
      $statut = true;
    } else {
      $statut = false;
    }

    // Fetch current article
    $form = $this->createFormBuilder($article)
      ->add('DateCreation', DateType::class)
      ->add('Date2', DateType::class)
      ->add('Date3', DateType::class)
      ->add('categories', EntityType::class, [
        'class' => Category::class,
        'choice_label' => 'name',
        'multiple' => true,
        'expanded' => true,
        'data' => null
      ])
      ->add('contents', EntityType::class, [
        'class' => Category::class,
        'multiple' => true,
        'choice_label' => 'id'
      ])
      ->getForm();

    $form->handleRequest($request);
    if ($form->isSubmitted() && $form->isValid()) {
      echo "hey";
      $manager->persist($article);
      $manager->flush();
      return $this->redirectToRoute('gaea21');
    } else {
      echo "hey";
      return  $this->render('gaea21/Coaching.html.twig', [
        'formContent' => $form->createView(),
        'statut' => $statut,
        'Elements' => $elements,
        'Items' => $items,
        'Contents' => $contents
      ]);
      return  $this->render('gaea21/Coaching.html.twig', [
        'formContent' => $form->createView(),
        'statut' => $statut,
        'Elements' => $elements,
        'Items' => $items,
        'Contents' => $contents
      ]);
    }


    /*
      $repo=$this->getDoctrine()->getRepository(NavigationElem::class);
      $repo1=$this->getDoctrine()->getRepository(NavBarre::class);
      // $repo4=$this->getDoctrine()->getRepository(WebContent::class);
      $Elements= $repo->findAll();
      $Items= $repo1->findAll();
      if ($article==null) {
        $article = new Article;
        $statut=true;
      } else {
        $statut=false;
      }
      $form=$this->createFormBuilder($article)
      ->add('DateCreation', DateType::class)
      ->add('Date2', DateType::class)
      ->add('Date3', DateType::class)
      ->add('categories', EntityType::class,[
       'class' => Category::class,
       'choice_label' => 'name',
       'multiple' => true,
       'expanded' => true,
       'data' => null
      ])
      ->add('contents', EntityType::class,[
        'class' => Category::class,
        'choice_label' => 'id'
      ])
      ->getForm();
      $form->handleRequest($request);
      if ($form->isSubmitted() && $form->isValid()) {
        $manager->persist($article);
        $manager->flush();
        return $this->redirectToRoute('gaea21');
      }else{
           return  $this->render('gaea21/Coaching.html.twig',[
          'formArticle' => $form->createView(),
          'statut' => $statut,
          'Elements' => $Elements,
          'Items' => $Items,
        ]);
         return  $this->render('gaea21/Coaching.html.twig',[
          'formArticle' => $form->createView(),
          'statut' => $statut,
          'Elements' => $Elements,
          'Items' => $Items,
        ]);
      }*/
  }
}
