<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CommunautesController extends AbstractController
{
    #[Route('/communautes', name: 'communautes')]
    public function index(): Response
    {
        return $this->render('communautes/index.html.twig', [
            'controller_name' => 'CommunautesController',
        ]);
    }

    #[Route('/dimension_humaine', name: 'dimension_humaine')]
    public function dimension_humaine(): Response
    {
        return $this->render('communautes/dimension_humaine.html.twig', [
            'controller_name' => 'CommunautesController',
        ]);
    }
    #[Route('/valeurs', name: 'valeurs')]
    public function valeurs(): Response
    {
        return $this->render('communautes/valeurs.html.twig', [
            'controller_name' => 'CommunautesController',
        ]);
    }
    #[Route('/developpement_durable', name: 'developpement_durable')]
    public function developpement_durable(): Response
    {
        return $this->render('communautes/dd.html.twig', [
            'controller_name' => 'CommunautesController',
        ]);
    }
}
