<?php

namespace App\DataFixtures;

use App\Entity\Field;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class FieldFixtures extends Fixture implements DependentFixtureInterface
{
    public const FIELD = [
        [
            'size' => 1,
            'class' => "class",
            'value' => "",
            'label' => "Nom",
            'placeholder' => "Veuillez entrez votre nom",
            'fieldReference' => 'fieldReference1',
            'typeReference' => 'typeReferencetext',
        ],
        [
            'size' => 1,
            'class' => "class",
            'value' => "",
            'label' => "Prénom",
            'placeholder' => "Veuillez entrez votre prénom",
            'fieldReference' => 'fieldReference2',
            'typeReference' => 'typeReferencetext',
        ],
        [
            'size' => 2,
            'class' => "class",
            'value' => "",
            'label' => "Mot de passe",
            'placeholder' => "Veuillez entrez votre mdp",
            'fieldReference' => 'fieldReference3',
            'typeReference' => 'typeReferencepassword',
        ],
        [
            'size' => 1,
            'class' => "class",
            'value' => "",
            'label' => "Date de naissance",
            'placeholder' => "Date",
            'fieldReference' => 'fieldReference4',
            'typeReference' => 'typeReferencedate',
        ],
        [
            'size' => 1,
            'class' => "class",
            'value' => "",
            'label' => "Nationalité",
            'placeholder' => "Choisir une nationalité",
            'fieldReference' => 'fieldReference5',
            'typeReference' => 'typeReferenceselect',
            'fieldListeTypeReference' => [
                'fieldListeTypeReference1',
                'fieldListeTypeReference2',
                'fieldListeTypeReference3',
                'fieldListeTypeReference4'
            ]
        ],
        [
            'size' => 1,
            'class' => "class",
            'value' => "",
            'label' => "Email",
            'placeholder' => "placeholder",
            'fieldReference' => 'fieldReference6',
            'typeReference' => 'typeReferenceemail',
        ],
        [
            'size' => 1,
            'class' => "class",
            'value' => "",
            'label' => "Téléphone",
            'placeholder' => "placeholder",
            'fieldReference' => 'fieldReference7',
            'typeReference' => 'typeReferencephone',
        ],
        [
            'size' => 1,
            'class' => "class",
            'value' => "",
            'label' => "Pays",
            'placeholder' => "placeholder",
            'fieldReference' => 'fieldReference8',
            'typeReference' => 'typeReferenceradio',
            'fieldListeTypeReference' => [
                'fieldListeTypeReference5',
                'fieldListeTypeReference6',
                'fieldListeTypeReference7'
            ]
        ],
    ];

    public function load(ObjectManager $manager): void
    {
        foreach (self::FIELD as $key => $fieldData) {

            $field = new Field();

            $field->setSize($fieldData['size']);
            $field->setClass($fieldData['class']);
            $field->setPlaceholder($fieldData['placeholder']);
            $field->setValue($fieldData['value']);
            $field->setLabel($fieldData['label']);
            $field->setIsRequired(0);
            $field->setIsUnique(0);
            $field->setListOrder($key);
            $field->setIsActive(1);
            $field->setShowLabel(true);

            $field->setType($this->getReference($fieldData['typeReference']));

            // if (isset($fieldData['fieldListeTypeReference'])) {
            //     foreach ($fieldData['fieldListeTypeReference'] as $fieldDataType) {
            //         $field->addFieldListdata($this->getReference($fieldDataType));
            //     }
            // }

            $manager->persist($field);

            $this->addReference($fieldData['fieldReference'], $field);
        }

        $manager->flush();
    }
    public function getDependencies()
    {
        return [
            TypeFixtures::class,
            FieldListeTypeDataFixtures::class
        ];
    }
}
