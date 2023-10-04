<?php

namespace App\DataFixtures;

use App\Entity\FieldListeTypeData;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class FieldListeTypeDataFixtures extends Fixture
{
    public const FIELD_LISTE_TYPE_DATA = [
        [
            'value' => 'Suisse',
            'label' => 'Suisse',
            'fieldListeTypeReference' => 'fieldListeTypeReference2'
        ],
        [
            'value' => 'Anglais',
            'label' => 'Anglais',
            'fieldListeTypeReference' => 'fieldListeTypeReference3'
        ],
        [
            'value' => 'Français',
            'label' => 'Français',
            'fieldListeTypeReference' => 'fieldListeTypeReference4'
        ],
        [
            'value' => 'Suisse',
            'label' => 'Suisse',
            'fieldListeTypeReference' => 'fieldListeTypeReference5'
        ],
        [
            'value' => 'Anglais',
            'label' => 'Anglais',
            'fieldListeTypeReference' => 'fieldListeTypeReference6'
        ],
        [
            'value' => 'Français',
            'label' => 'Français',
            'fieldListeTypeReference' => 'fieldListeTypeReference7'
        ],
    ];

    public function load(ObjectManager $manager): void
    {
        foreach (self::FIELD_LISTE_TYPE_DATA as $fieldListeTypeData) {

            $fieldListeType=new FieldListeTypeData();

            $fieldListeType->setValue($fieldListeTypeData['value']);
            $fieldListeType->setLabel($fieldListeTypeData['label']);

            $manager->persist($fieldListeType);

            $this->addReference($fieldListeTypeData['fieldListeTypeReference'], $fieldListeType);
        }

        $manager->flush();
    }
}
