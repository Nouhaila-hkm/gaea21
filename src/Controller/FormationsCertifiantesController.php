<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/formations/certifiantes')]
class FormationsCertifiantesController extends AbstractController
{
    #[Route('/', name: 'app_formations_certifiantes')]
    public function index(): Response
    {
        return $this->render('formations_certifiantes/index.html.twig', ['title' => "Formations certifiantes"]);
    }
    #[Route('/formation-interne', name: 'app_formations_certifiantes_internes')]
    public function formationInterne(): Response
    {
        return $this->render('formations_certifiantes/formation-interne.html.twig', ['title' => "Formations internes"]);
    }
    #[Route('/programme-de-recherche', name: 'app_programme_de_recherche')]
    public function formationProgrammeRecherche(): Response
    {
        return $this->render('formations_certifiantes/programme-de-recherche.html.twig', ['title' => "Programme de Recherche"]);
    }
}
