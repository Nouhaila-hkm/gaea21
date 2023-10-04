<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class LoginController extends AbstractController
{
    #[Route("/login", name: "login")]
    public function index(Request $request): Response
    {
        //This line verify if the creation of the account is successful
        $isSuccess = $request->request->get('success') ?? false;

        return $this->render('login/index.html.twig', ['reinitPass' => '', 'isSuccess' => $isSuccess]);
    }

    #[Route('/logout', name: 'app_logout', methods: ['GET'])]
    public function logout()
    {
        // controller can be blank: it will never be called!
        throw new \Exception('Don\'t forget to activate logout in security.yaml');
    }

    #[Route('/register', name: 'register')]
    public function register()
    {
        return $this->render('login/register.html.twig');
    }
}
