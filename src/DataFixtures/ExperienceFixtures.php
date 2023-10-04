<?php

namespace App\DataFixtures;

use App\Entity\Experience;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ExperienceFixtures extends Fixture
{
    public const EXPERIENCES = [
        [
            'experience' => '0-1'
        ],
        [
            'experience' => '2-4'
        ],
        [
            'experience' => '4-6'
        ],
        [
            'experience' => '7+'
        ],
      
    ];
    public function load(ObjectManager $manager): void
    {
        foreach (self::EXPERIENCES as $experienceDate) {
            
            $experience = new Experience();

            $experience->setExperience($experienceDate['experience']);
            $manager->persist($experience);
        };

        $manager->flush();
    }
}
