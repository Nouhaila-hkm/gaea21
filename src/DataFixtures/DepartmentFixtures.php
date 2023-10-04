<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Proxies\__CG__\App\Entity\Department;

class DepartmentFixtures extends Fixture
{


    public const DEPARTMENTS = [
        [
            'name' => 'Ressources humaines',
            'icon' => 'icon-law.svg'
        ],
        [
            'name' => 'Business Management & Développement',
            'icon' => 'icon-law.svg'
        ],
        [
            'name' => 'Administration & Finance',
            'icon' => 'icon-law.svg'
        ],
        [
            'name' => 'Consulting & coaching',
            'icon' => 'icon-law.svg'
        ],
        [
            'name' => 'Sciences humaines',
            'icon' => 'icon-law.svg'
        ],
        [
            'name' => 'Community Management & Développement',
            'icon' => 'icon-law.svg'
        ],
        [
            'name' => 'Marketing',
            'icon' => 'icon-law.svg'
        ],
        [
            'name' => 'Education',
            'icon' => 'icon-law.svg'
        ],
        [
            'name' => 'Design',
            'icon' => 'icon-law.svg'
        ],
        [
            'name' => 'Recherche académique',
            'icon' => 'icon-law.svg'
        ],
        [
            'name' => 'Opérations',
            'icon' => 'icon-law.svg'
        ],
        [
            'name' => 'Ingénierie',
            'icon' => 'icon-law.svg'
        ],
        [
            'name' => 'IT',
            'icon' => 'icon-law.svg'
        ],
        [
            'name' => 'Sciences de la terre',
            'icon' => 'icon-law.svg'
        ],
      
    ];
    public function load(ObjectManager $manager): void
    {
        foreach (self::DEPARTMENTS as $departmentData) {
            
            $department = new Department();

            $department->setName($departmentData['name']);
            $department->setIcon($departmentData['icon']);
            $manager->persist($department);
        };

        $manager->flush();
    }
}
