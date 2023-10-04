<?php

namespace App\Controller;

use App\Entity\Announce;
use App\Entity\Formulaire;
use App\Entity\Project;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/backoffice')]
class BackOfficeController extends AbstractController
{

    #[Route('/', name: 'projets_back_office')]
    public function backOffice(): Response
    {
        return $this->render('project_backOffice/index.html.twig');
    }

    #[Route('/get/backoffice_project', name: 'get_projets_back_office')]
    public function getBackOffice(EntityManagerInterface $manager, SerializerInterface $serializer): Response
    {
        $projectRepo = $manager->getRepository(Project::class);

        $projectList = $projectRepo->findAll(array(), array('projectName' => 'ASC'));

        $data = $serializer->serialize($projectList, 'json', ["groups" => "project:read"]);

        return new Response($data);
    }


    #[Route('/get/backoffice_form', name: 'get_form_back_office')]
    public function getBackOfficeForm(EntityManagerInterface $manager, SerializerInterface $serializer): Response
    {
        $formRepo = $manager->getRepository(Formulaire::class);

        $formList = $formRepo->findAll([], ['formName' => 'DESC']);

        $data = $serializer->serialize($formList, 'json', ["groups" => "formulaire:read"]);

        return new Response($data);
    }

    #[Route('/get/backoffice_announce', name: 'get_announce_back_office')]
    public function getBackOfficeAnnounce(EntityManagerInterface $manager, SerializerInterface $serializer): Response
    {
        $announceRepo = $manager->getRepository(Announce::class);

        $announceList = $announceRepo->findAll([], ['title' => 'ASC']);

        $data = $serializer->serialize($announceList, 'json', ["groups" => "project:read"]);

        return new Response($data);
    }


    #[Route('/create/project', name: 'back_office_create_project', methods: ["POST"])]
    public function createProject(EntityManagerInterface $manager, Request $request)
    {

        $req = json_decode($request->getContent(), true);

        $newProject = new Project();
        $newProject->setProjectName($req["projectName"]);
        $newProject->setProjectUrl($req["projectUrl"]);

        $manager->persist($newProject);
        $manager->flush();

        return new Response("Le projet a bien été créé", 200);
    }


    #[Route('/remove/project', name: 'back_office_remove_project', methods: ["POST"])]
    public function removeProject(EntityManagerInterface $manager, Request $request)
    {

        $req = json_decode($request->getContent(), true);
        $projectId = $req["projectId"];

        $projectRepo = $manager->getRepository(Project::class);

        $project = $projectRepo->find($projectId);

        $projectRepo->remove($project, true);

        if ($project ===  null) {
            return new Response("Le projet n'a pas été trouvé.", 400);
        }

        return new Response("Le projet a bien été supprimé", 200);
    }

    #[Route('/remove/form', name: 'projets_back_office_remove_form', methods: ['POST'])]
    public function backOfficeRemoveForm(EntityManagerInterface $manager, Request $request): Response
    {

        //On récupère les données
        $req = json_decode($request->getContent(), true);
        $projectId = $req["projectId"];
        $formId = $req["formId"];


        $projectRepo = $manager->getRepository(Project::class);

        $project = $projectRepo->find($projectId);

        $formRepo = $manager->getRepository(Formulaire::class);
        $form = $formRepo->find($formId);

        if ($project ===  null) {
            return new Response("Le projet n'a pas été trouvé.", 400);
        }
        if ($form === null) {
            return new Response("Le formulaire n'a pas été trouvé", 400);
        } else {
            $project->removeForm($form);
            $manager->flush();
        }

        return new Response("Element bien enregistré", 200);
    }

    #[Route('/add/form', name: 'projets_back_office_add_form', methods: ['POST'])]
    public function backOfficeAddForm(EntityManagerInterface $manager, Request $request): Response
    {

        //On récupère les données
        $req = json_decode($request->getContent(), true);
        $projectId = $req["projectId"];
        $formId = $req["formId"];


        $projectRepo = $manager->getRepository(Project::class);

        $project = $projectRepo->find($projectId);

        $formRepo = $manager->getRepository(Formulaire::class);
        $form = $formRepo->find($formId);

        if ($project ===  null) {
            return new Response("Le projet n'a pas été trouvé.", 400);
        }
        if ($form === null) {
            return new Response("Le formulaire n'a pas été trouvé", 400);
        } else {
            $project->addForm($form);
            $manager->flush();
        }

        return new Response("Element bien envoyé", 200);
    }


    #[Route('/add/announce', name: 'projets_back_office_add_announce', methods: ['POST'])]
    public function backOfficeAddAnnounce(EntityManagerInterface $manager, Request $request): Response
    {

        //On récupère les données
        $req = json_decode($request->getContent(), true);
        $projectId = $req["projectId"];
        $announceId = $req["announceId"];


        $projectRepo = $manager->getRepository(Project::class);

        $project = $projectRepo->find($projectId);

        $announceRepo = $manager->getRepository(Announce::class);
        $announce = $announceRepo->find($announceId);

        if ($project ===  null) {
            return new Response("Le projet n'a pas été trouvé.", 400);
        }
        if ($announce === null) {
            return new Response("L'annonce n'a pas été trouvée", 400);
        } else {
            $project->addAnnounce($announce);
            $manager->flush();
        }

        return new Response("L'annonce a bien été ajoutée", 200);
    }

    #[Route('/remove/announce', name: 'projets_back_office_remove_announce', methods: ['POST'])]
    public function backOfficeRemoveAnnounce(EntityManagerInterface $manager, Request $request): Response
    {

        //On récupère les données
        $req = json_decode($request->getContent(), true);
        $projectId = $req["projectId"];
        $announceId = $req["announceId"];


        $projectRepo = $manager->getRepository(Project::class);

        $project = $projectRepo->find($projectId);

        $announceRepo = $manager->getRepository(Announce::class);
        $announce = $announceRepo->find($announceId);

        if ($project ===  null) {
            return new Response("Le projet n'a pas été trouvé.", 400);
        }
        if ($announce === null) {
            return new Response("L'annonce n'a pas été trouvé", 400);
        } else {
            $project->removeAnnounce($announce);
            $manager->flush();
        }

        return new Response("L'annonce a bien été retirée", 200);
    }
}
