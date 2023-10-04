<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/projets')]
class ProjetsController extends AbstractController
{
    #[Route('/', name: 'Index')]
    public function index(): Response
    {
        return $this->render('projet_gaea21/index.html.twig');
    }

    // Sous pages de la section des recherches appliquées

    #[Route('/RA', name: 'Recherches_appliquees')]
    public function ra(): Response
    {
        return $this->render('projet_gaea21/Recherches_Appliquees.html.twig', 
        // [
        //     'controller_name' => 'ProjetsController',
        // ]
    );
    }

    #[Route('/RA/RV', name: 'Repertoire-Vert')]
    public function rv(): Response
    {
        return $this->render('projet_gaea21/Repertoire_Vert.html.twig', [
            'controller_name' => 'ProjetsController',
        ]);
    }

    #[Route('/RA/SIB', name: 'Sustainability-in-a-box')]
    public function sib(): Response
    {
        return $this->render('projet_gaea21/Sustainability-in-a-box.html.twig', [
            'controller_name' => 'ProjetsController',
        ]);
    }

    #[Route('/RA/PA', name: 'Pre-analyse')]
    public function preAnalyse(): Response
    {
        return $this->render('projet_gaea21/Pre_analyse.html.twig', [
            'controller_name' => 'ProjetsController',
        ]);
    }

    #[Route('/RA/GCC', name: 'Green-Coaching-Communes')]
    public function gcc(): Response
    {
        return $this->render('projet_gaea21/Green_Coaching_Communes.html.twig', [
            'controller_name' => 'ProjetsController',
        ]);
    }

    #[Route('/RA/Eco-minds', name: 'Eco-minds')]
    public function Ecominds(): Response
    {
        return $this->render('projet_gaea21/Ecominds.html.twig', [
            'controller_name' => 'ProjetsController',
        ]);
    }

    #[Route('/RA/TA', name: 'Take_Action')]
    public function ta(): Response
    {
        return $this->render('projet_gaea21/Take_Action.html.twig', [
            'controller_name' => 'ProjetsController',
        ]);
    }

    #[Route('/RA/GES', name: 'Green_Events_Series')]
    public function ges(): Response
    {
        return $this->render('projet_gaea21/Green_Event_Series.html.twig', [
            'controller_name' => 'ProjetsController',
        ]);
    }

    #[Route('/RA/PDI', name: 'Plateformes_des_Initiatives')]
    public function pdi(): Response
    {
        return $this->render('projet_gaea21/Plateforme_des_initiatives.html.twig', [
            'controller_name' => 'ProjetsController',
        ]);
    }

    #[Route('/RA/Coaching-teletravail', name: 'Coaching_teletravail')]
    public function coaching_teletravail(): Response
    {
        return $this->render('projet_gaea21/Coaching_teletravail.html.twig', [
            'controller_name' => 'ProjetsController',
        ]);
    }

    #[Route('/RA/SLP', name: 'Sustainable_Living_Program')]
    public function slp(): Response
    {
        return $this->render('projet_gaea21/Sustainable_Living_Program.html.twig', [
            'controller_name' => 'ProjetsController',
        ]);
    }
    
    #[Route('/RA/SCE', name: 'Sustainable_City_Event')]
    public function sce(): Response
    {
        return $this->render('projet_gaea21/Sustainable_City_Event.html.twig', [
            'controller_name' => 'ProjetsController',
        ]);
    }


    // Section projets pilotes
    #[Route('/projet_pilotes', name: 'Pilotes')]
    public function projetsPilotes(): Response
    {
        return $this->render('projet_gaea21/projets_pilotes.html.twig', [
            'controller_name' => 'ProjetsController',
        ]);
    }

    // Section participation projets
    #[Route('/participer', name: 'Participer')]
    public function participer(): Response
    {
        return $this->render('projet_gaea21/participer-projet-gaea/participation_projet.html.twig', [
            'controller_name' => 'ProjetsController',
        ]);
    }

    // Section Coaching de projet durables
    #[Route('/coaching', name: 'Coaching_de_projet_durables')]
    public function coaching(): Response
    {
        return $this->render('projet_gaea21/coaching.html.twig', [
            'controller_name' => 'ProjetsController',
        ]);
    }

    // Section projets expansion gaea21
    #[Route('/expansion', name: 'Expansion')]
    public function expansion(): Response
    {
        return $this->render('projet_gaea21/projet_expansion.html.twig', [
            'controller_name' => 'ProjetsController',
        ]);
    }

}