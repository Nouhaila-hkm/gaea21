<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Proxies\__CG__\App\Entity\SchoolLevel;

class SchoolLevelFixtures extends Fixture
{
    public const SCHOOLLEVELS = [
        [
            'level' => 'Bac'
        ],
        [
            'level' => 'Bac+2'
        ],
        [
            'level' => 'Bac+3'
        ],
        [
            'level' => 'Bac+5'
        ],
      
    ];
    public function load(ObjectManager $manager): void
    {
        foreach (self::SCHOOLLEVELS as $levelsDate) {
            
            $level = new SchoolLevel();

            $level->setLevel($levelsDate['level']);
            $manager->persist($level);
        };

        $manager->flush();
    }
}
