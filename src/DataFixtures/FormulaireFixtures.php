<?php

namespace App\DataFixtures;

use App\Entity\Formulaire;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class FormulaireFixtures extends Fixture
{
    public const FORMULAIRES = [
        [
            'formName' => 'Formulaire Test',
            'class' => 'class1',
            'formulaireReference' => 'formulaire_reference1',
            'formMapSectionReference' => "formMapSection_reference1",
            //'email' => 'email@gaea21.org'
        ],
        [
            'formName' => 'Formulaire Extra',
            'class' => 'class2',
            'formulaireReference' => 'formulaire_reference2',
            'formMapSectionReference' => "formMapSection_reference2",
        ],
    ];

    public function load(ObjectManager $manager): void
    {
        foreach (self::FORMULAIRES as $formulaireData) {

            $formulaire = new Formulaire();

            $formulaire->setFormName($formulaireData['formName']);
            $formulaire->setClass($formulaireData['class']);
            $formulaire->setShowLabel(true);
            $formulaire->setShowDescription(true);
            //$formulaire->setEmail($formulaireData['email']);


            $this->addReference($formulaireData['formulaireReference'], $formulaire);
            $this->addReference($formulaireData['formMapSectionReference'], $formulaire);

            $manager->persist($formulaire);
        };
        $manager->flush();
    }
}
