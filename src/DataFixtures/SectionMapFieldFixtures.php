<?php

namespace App\DataFixtures;

use App\Entity\SectionMapField;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class SectionMapFieldFixtures extends Fixture implements DependentFixtureInterface
{
    public const SECTION_MAP_FIELD = [
        [
            'number' => 1,
            'fieldReference' => 'fieldReference1'
        ],
        [
            'number' => 2,
            'fieldReference' => 'fieldReference2'
        ],
        [
            'number' => 3,
            'fieldReference' => 'fieldReference3'
        ],
        [
            'number' => 4,
            'fieldReference' => 'fieldReference4'
        ],
        [
            'number' => 5,
            'fieldReference' => 'fieldReference5'
        ],
        [
            'number' => 6,
            'fieldReference' => 'fieldReference6'
        ],
        [
            'number' => 7,
            'fieldReference' => 'fieldReference7'
        ],
        [
            'number' => 8,
            'fieldReference' => 'fieldReference8'
        ]
    ];

    public function load(ObjectManager $manager): void
    {
        foreach (self::SECTION_MAP_FIELD as $SectionMapFieldData) {

            $SectionMapField = new SectionMapField();

            
            $SectionMapField->setSection($this->getReference('section_reference1'));
            $SectionMapField->setField($this->getReference($SectionMapFieldData['fieldReference']));

            $manager->persist($SectionMapField);
            }
        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            SectionFixtures::class,
            FieldFixtures::class
        ];
    }
  }
