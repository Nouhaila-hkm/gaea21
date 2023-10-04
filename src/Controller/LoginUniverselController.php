<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LoginUniverselController extends AbstractController
{
    #[Route('/login_universel', name: 'app_login_universel')]
    public function index(): Response
    {
        return $this->render('login_universel/loginUniverseIndex.html.twig');
    }
}
