<?php

namespace App\DataFixtures;

use DateTime;
use App\Entity\Announce;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class AnnounceFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
 

        $announce = new Announce();
        $announce->setReference("Test Référence");
        $announce->setTitle("Title announce ");
        $announce->setCreatedDate(new DateTime());

        $announce1 = new Announce();
        $announce1->setReference("Test Référence 2");
        $announce1->setTitle("Title announce 2");
        $announce1->setCreatedDate(new DateTime());

        $announce2 = new Announce();
        $announce2->setReference("Test Référence 3");
        $announce2->setTitle("Title announce 3");
        $announce2->setCreatedDate(new DateTime());


        $manager->persist($announce);
        $manager->persist($announce1);
        $manager->persist($announce2);
        $manager->flush();
    }
}
