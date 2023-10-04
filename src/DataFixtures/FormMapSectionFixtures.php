<?php

namespace App\DataFixtures;

use App\Entity\FormMapSection;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class FormMapSectionFixtures extends Fixture implements DependentFixtureInterface
{
    public const FORM_MAP_SECTION = [
        [
            'sectionNumber' => 1,
            'formMapSectionReference' => "formMapSectionReference1",
            "formulaireReference" => "formulaire_reference1",
            "sectionReference" => "section_reference1"
        ],
        [
            'sectionNumber' => 2,
            'formMapSectionReference' => "formMapSectionReference2",
            "formulaireReference" => "formulaire_reference2",
            "sectionReference" => "section_reference2"
        ],
        // [
        //     'sectionNumber' => 3,
        //     'formMapSectionReference' => "formMapSectionReference3"
        // ],
        // [
        //     'sectionNumber' => 4,
        //     'formMapSectionReference' => "formMapSectionReference4"
        // ]
    ];

    public function load(ObjectManager $manager): void
    {
        foreach (self::FORM_MAP_SECTION as $FormMapSectionData) {
            $FormMapSection = new FormMapSection();
            
            $FormMapSection->setSectionNumber($FormMapSectionData['sectionNumber']);
            $FormMapSection->setForm($this->getReference($FormMapSectionData['formulaireReference']));
            $FormMapSection->setSection($this->getReference($FormMapSectionData['sectionReference']));
           
            $manager->persist($FormMapSection);
            }
        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            FormulaireFixtures::class,
            SectionFixtures::class
        ];
    }
  }
  