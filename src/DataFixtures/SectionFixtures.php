<?php

namespace App\DataFixtures;

use App\Entity\Section;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class SectionFixtures extends Fixture implements DependentFixtureInterface
{
    public const SECTIONS = [
        [
            'sectionName' => 'Info Générale',
            'sectionHeader' => 'section_header1',
            'sectionReference' => 'section_reference1'
        ],
        [
            'sectionName' => 'section_name2',
            'sectionHeader' => 'section_header2',
            'sectionReference' => 'section_reference2'
        ],
        [
            'sectionName' => 'section_name3',
            'sectionHeader' => 'section_header3',
            'sectionReference' => 'section_reference3'
        ],
        [
            'sectionName' => 'section_name4',
            'sectionHeader' => 'section_header4',
            'sectionReference' => 'section_reference4'
        ],
    ];

    public function load(ObjectManager $manager): void
    {
        foreach (self::SECTIONS as $sectionData) {

            $section = new Section();

            $section->setSectionName($sectionData['sectionName']);
            $section->setSectionHeader($sectionData['sectionHeader']);
            $section->setIsActive(1);
            $section->setShowHeader(true);
            $manager->persist($section);

            $this->addReference($sectionData['sectionReference'], $section);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            FormulaireFixtures::class,
        ];
    }
}
