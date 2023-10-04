<?php

namespace App\DataFixtures;

use App\Entity\Project;
use App\Entity\Announce;
use App\Entity\Formulaire;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class ProjectFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $form = new Formulaire();
        $formRepo = $manager->getRepository($form::class);

        $firstForm = $formRepo->findAll();
        $firstForm = $firstForm[0];

        $firstAnnonce = new Announce();
        $announceRepo = $manager->getRepository(Announce::class);

        $firstAnnonce = $announceRepo->findAll();
        $firstAnnonce = $firstAnnonce[0];


        $project = new Project();

        $project->setProjectName("Projet 1");
        $project->setProjectUrl("http://project1.com");
        $project->addForm($firstForm);

        $projectEmptyForm = new Project();
        $projectEmptyForm->setProjectName("Projet 2");
        $projectEmptyForm->setProjectUrl("http://project2.com");

        $projectWithAnnounceAndForm = new Project();
        $projectWithAnnounceAndForm->setProjectName("Projet 3");
        $projectWithAnnounceAndForm->setProjectUrl("http://project1.com");
        $projectWithAnnounceAndForm->addForm($firstForm);
        $projectWithAnnounceAndForm->addAnnounce($firstAnnonce);

        // $product = new Product();
        $manager->persist($project);
        $manager->persist($projectEmptyForm);
        $manager->persist($projectWithAnnounceAndForm);

        $manager->flush();
    }
}
