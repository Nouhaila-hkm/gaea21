<?php

namespace App\Controller;

use App\Entity\FiltreSearch;
use App\Form\FiltreSearchGaea21Type;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
//use ApiPlatform\Core\DataProvider\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class EmploiEtStageController extends AbstractController
{
    #[Route('/emploi-et-stage', name: 'app_emploi_et_stage')]
    public function index(): Response
    {
        return $this->render('emploi_et_stage/accueil.html.twig', [
            'controller_name' => 'EmploiEtStageController',
        ]);
    }


    #[Route('/emploi-et-stage/demande', name: 'app_demande')]
    public function demande() : Response
    {
        return $this->render('emploi_et_stage/demande.html.twig', [
            'controller_name' => 'EmploiEtStageController',
        ]);
    }

    #[Route('/emploi-et-stage/offre', name: 'app_offre')]
    public function offre() : Response
    {
        return $this->render('emploi_et_stage/offre.html.twig', [
            'controller_name' => 'EmploiEtStageController',
        ]);
    }

    #[Route('/emploi-et-stage/offre/details/{id}', name: 'app_offre_details')]
    public function offre_details() : Response
    {
        return $this->render('emploi_et_stage/offre_details.html.twig', [
            'controller_name' => 'EmploiEtStageController',
        ]);
    }

    #[Route('/emploi-et-stage/reseau', name: 'app_reseau')]
    public function reseau() : Response
    {
        return $this->render('emploi_et_stage/reseau.html.twig', [
            'controller_name' => 'EmploiEtStageController',
        ]);
    }
    #[Route('/emploi-et-stage/reseau/details/{id}', name: 'app_reseau_details')]
    public function reseau_details() : Response
    {
        return $this->render('emploi_et_stage/offre_reseau_details.html.twig', [
            'controller_name' => 'EmploiEtStageController',
        ]);
    }

    #[Route('/emploi-et-stage/profils', name: 'app_profils')]
    public function profils() : Response
    {
       

        return $this->render('emploi_et_stage/profils.html.twig', [
            'controller_name' => 'EmploiEtStageController',
        ]);

    }

    #[Route('/emploi-et-stage/profils/details', name: 'app_profil_details')]
    public function profil_details() : Response
    {
        return $this->render('emploi_et_stage/profil_details.html.twig', [
            'controller_name' => 'EmploiEtStageController',
        ]);
    }
}
