<?php

namespace App\DataFixtures;

use App\Entity\JobType;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class JobTypeFixtures extends Fixture
{
    public const TYPES = [
        [
            'name' => 'Télétravail'
        ],
        [
            'name' => 'Présentiel'
        ],
        [
            'name' => 'Mixte/Hybride'
        ]
      
    ];
    public function load(ObjectManager $manager): void
    {
        foreach (self::TYPES as $jobTypeData) {
            
            $jobType = new JobType();

            $jobType->setName($jobTypeData['name']);
            $manager->persist($jobType);
        };

        $manager->flush();
    }



}
