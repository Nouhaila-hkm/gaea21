<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CoachingController extends AbstractController
{
    #[Route('/coaching', name: 'app_coaching')]
    public function index(): Response
    {
        return $this->render('coaching/index.html.twig', [
            'controller_name' => 'CoachingController',
        ]);
    }

    #[Route('/coaching/modele_accompagnement', name: 'app_modele_accompagnement')]
    public function modele_accompagnement(): Response
    {
        return $this->render('coaching/modele_accompagnement.html.twig', [
            'controller_name' => 'CoachingController',
        ]);
    }

    #[Route('/coaching/modele_accompagnement2', name: 'app_modele_accompagnement2')]
    public function modele_accompagnement2(): Response
    {
        return $this->render('coaching/modele.html.twig', [
            'controller_name' => 'CoachingController',
        ]);
    }

    #[Route('/coaching/humain', name: 'app_coaching_humain')]
    public function humain(): Response
    {
        return $this->render('coaching/humain.html.twig', [
            'controller_name' => 'CoachingController',
        ]);
    }

    #[Route('/coaching/humain/avant', name: 'app_coaching_humain_avant')]
    public function humain_avant(): Response
    {
        return $this->render('coaching/humain_avant.html.twig', [
            'controller_name' => 'CoachingController',
        ]);
    }

    #[Route('/coaching/humain/pendant', name: 'app_coaching_humain_pendant')]
    public function humain_pendant(): Response
    {
        return $this->render('coaching/humain_pendant.html.twig', [
            'controller_name' => 'CoachingController',
        ]);
    }

    #[Route('/coaching/humain/apres', name: 'app_coaching_humain_apres')]
    public function humain_apres(): Response
    {
        return $this->render('coaching/humain_apres.html.twig', [
            'controller_name' => 'CoachingController',
        ]);
    }

    #[Route('/coaching/projet', name: 'app_coaching_projet')]
    public function projet(): Response
    {
        return $this->render('coaching/projet.html.twig', [
            'controller_name' => 'CoachingController',
        ]);
    }

    #[Route('/coaching/projet/avant', name: 'app_coaching_projet_avant')]
    public function avant (): Response
    {
        return $this->render('coaching/avant.html.twig', [
            'controller_name' => 'CoachingController',
        ]);
    }

    #[Route('/coaching/projet/pendant', name: 'app_coaching_projet_pendant')]
    public function pendant (): Response
    {
        return $this->render('coaching/pendant.html.twig', [
            'controller_name' => 'CoachingController',
        ]);
    }

    #[Route('/coaching/projet/apres', name: 'app_coaching_projet_apres')]
    public function apres (): Response
    {
        return $this->render('coaching/apres.html.twig', [
            'controller_name' => 'CoachingController',
        ]);
    }

}
