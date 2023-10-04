<?php

namespace App\Controller;

use App\Entity\WebContent;
use App\Repository\WebContentRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ApiController extends AbstractController
{
    /**
     * @Route("/api/webcontents", name="api_webcontents",methods={"GET"})
     */
    public function index(WebContentRepository $webContentRepository): Response
    {

        $contents=$webContentRepository->findAll();
        
        return $this->json($contents,200,[],['groups'=>'Contents:read']);
    }
}