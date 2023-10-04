<?php

namespace App\Controller;

use App\Repository\CommentRepository;
use App\Repository\NewsletterSubscriberRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/QuiSommesNous')]
class QuiSommesNousController extends AbstractController
{
    #[Route('/', name: 'app_QuiSommesNous_index')]
    public function index(): Response
    {
        return $this->render('qui_sommes_nous/index.html.twig', [
            'controller_name' => 'QuiSommesNousController',
        ]);
    }

    #[Route('/Historique', name: 'app_QuiSommesNous_historique')]
    public function historique()
    {
      return $this->render('qui_sommes_nous/historique.html.twig');
    }

    #[Route('/Newsletter', name: 'app_QuiSommesNous_newsletter')]
    public function newsLetter(NewsletterSubscriberRepository $subscriberRepository, CommentRepository $commentRepository)
    {

        $comments = $commentRepository->findAll();
        // dd($comments);

       
       
        return $this->render('newsletter/index.html.twig', [
            'subscribers' => count($subscriberRepository->findAll()),
            'comments' => $commentRepository->findAll(),
        ]);
    }

    #[Route('/Organigramme', name: 'app_QuiSommesNous_organigramme')]
    public function organigramme()
    {
      return $this->render('qui_sommes_nous/organigramme.html.twig');
    }

    #[Route('/Organigramme/OrganeDecisionnel', name: 'app_QuiSommesNous_organeDecisionnel')]
    public function organeDecisionnel()
    {
      return $this->render('qui_sommes_nous/organeDecisionnel.html.twig');
    }

    #[Route('/Organigramme/OrganeOperationnel', name: 'app_QuiSommesNous_organeOperationnel')]
    public function organeOperationnel()
    {
      return $this->render('qui_sommes_nous/organeOperationnel.html.twig');
    }

    #[Route('/Organigramme/OrganeConsultatif', name: 'app_QuiSommesNous_organeConsultatif')]
    public function organeConsultatif()
    {
      return $this->render('qui_sommes_nous/organeConsultatif.html.twig');
    }
    #[Route('/univers_gaea', name: 'app_QuiSommesNous_univers_gaea')]
    public function universGaea(): Response
    {
        return $this->render('qui_sommes_nous/universGaea.html.twig');
    }
    #[Route('/contactez_nous', name: 'app_QuiSommesContactez_nous')]
    public function contactezNous(): Response
    {
        return $this->render('qui_sommes_nous/contactezNous.html.twig');
    }

    #[Route('/partenaire', name: 'partenaire')]
    public function partenaire(): Response
    {
        return $this->render('qui_sommes_nous/partenaire.html.twig');
    }

    #[Route('/autrepartenaire', name: 'partenaire_autre')]
    public function autre(): Response
    {
        return $this->render('qui_sommes_nous/partenaire.html.twig');
    }

    #[Route('/modele', name: 'modele')]
    public function modele(): Response
    {
        return $this->render('qui_sommes_nous/modele_gaea.html.twig');
    }

    #[Route('/transdisciplinaire', name: 'transdisciplinaire')]
    public function transdisciplinaire(): Response
    {
        return $this->render('qui_sommes_nous/transdisciplinaire.html.twig');
    }

    #[Route('/gestionprojet', name: 'gestionprojet')]
    public function gestionprojet(): Response
    {
        return $this->render('qui_sommes_nous/gestion_projet.html.twig');
    }
    
    #[Route('/analyse', name: 'analyse')]
    public function analyse(): Response
    {
        return $this->render('qui_sommes_nous/analyse_de_cycle.html.twig');
    }

    #[Route('/lean', name: 'lean')]
    public function lean(): Response
    {
        return $this->render('qui_sommes_nous/lean_management.html.twig');
    }

    #[Route('/coevolution', name: 'coevolution')]
    public function coevolution(): Response
    {
        return $this->render('qui_sommes_nous/coevolution.html.twig');
    }

    #[Route('/behavior', name: 'behavior')]
    public function behavior(): Response
    {
        return $this->render('qui_sommes_nous/behaviorism.html.twig');
    }
    #[Route('/multiplicateureco', name: 'multiplicateur')]
    public function multiplicateur(): Response
    {
        return $this->render('qui_sommes_nous/multiplicateur_economique.html.twig');
    }
}
