<?php

namespace App\Controller;



use DateTimeImmutable;
use App\Entity\JobType;
use App\Entity\JobOffre;
use App\Entity\Department;

use App\Entity\Experience;

use App\Entity\SchoolLevel;
use App\Repository\JobOffreRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AddOffreController extends AbstractController
{
    #[Route('/add/offre', name: 'app_add_offre')]
    public function index(): Response
    {
        return $this->render('add_offre/index.html.twig', [
            'controller_name' => 'AddOffreController',
        ]); 
    }

    #[Route('/dashboardoffre', name: 'dashboard_offre')]
    public function dashboard(): Response
    {
        return $this->render('add_offre/dashboardOffre.html.twig');
    }
    #[Route('/modificationoffre/{id}', name: 'modification_offre')]
    public function modification(): Response
    {
        return $this->render('add_offre/modificationOffre.html.twig');
    }

    #[Route('/addofferemploi', name: 'add_offer_emploi', methods:['POST'])]
    public function addUser(Request $request, ManagerRegistry $doctrine, JobOffreRepository $jobOffre): JsonResponse
    {
        $information = json_decode($request->getContent());
        
        $entityManager = $doctrine->getManager();
        $offre= new JobOffre();
        $offre->setTitle($information->title);
        
        $offre->setCreatedAt(new DateTimeImmutable());
        if($information->isPublished === "true"){
            $offre->setPublishedAt(new DateTimeImmutable());
        }
        //$offre->setPublishedAt($information->publishedAt);
        //$offre->setUpdatedAt($information->updatedAt);
        
        $offre->setisPublished($information->isPublished);
        $department = $entityManager->find(Department::class, $information->department);
        $offre->setDepartment($department);
   
        $schoolLevel = $entityManager->find(SchoolLevel::class, $information->schoolLevel);
        $offre->setSchoolLevel($schoolLevel);
        $experience = $entityManager->find(Experience::class, $information->experience);
        $offre->setExperience($experience);
        dump($experience);
        die;
        $jobType=$entityManager->find(JobType::class, $information->jobType);
        $offre->setJobType($jobType);

        $entityManager->persist($offre);
        $entityManager->flush();
        dump($information);
        die;
        
        
        //getting the body sending through fetch via react
       
       
       
       
     
    
       $jsonContent = $serializer->serialize($json, 'json');
        
      
        //creating the USER
        
        return new JsonResponse($jsonContent);
    }

    #[Route('/offrepdf/{id}', name: 'pdf_offre')]
    public function pdf(): Response
    {
        return $this->render('add_offre/offrePdf.html.twig');
    }
}
