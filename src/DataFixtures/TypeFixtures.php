<?php

namespace App\DataFixtures;

use App\Entity\Type;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class TypeFixtures extends Fixture
{
    public const TYPE = [
        [
            'typeName' => 'text',
            'typeReference' => 'typeReferencetext',
            'rule' => '[A-Za-z]{3,}',
        ],
        [
            'typeName' => 'select',
            'typeReference' => 'typeReferenceselect',
            'rule' => '',
        ],
        [
            'typeName' => 'password',
            'typeReference' => 'typeReferencepassword',
            'rule' => "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$",
        ],
        [
            'typeName' => 'date',
            'typeReference' => 'typeReferencedate',
            'rule' => '',
        ],
        [
            'typeName' => 'email',
            'typeReference' => 'typeReferenceemail',
            'rule' => "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$",
        ],
        [
            'typeName' => 'phone',
            'typeReference' => 'typeReferencephone',
            'rule' => '/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/',
        ],
        [
            'typeName' => 'radio',
            'isRequired' => true,
            'typeReference' => 'typeReferenceradio',
            'rule' => '',
        ],
        [
            'typeName' => 'checkbox',
            'typeReference' => 'typeReferencecheckbox',
            'rule' => '',
        ],
        [
            'typeName' => 'url',
            'typeReference' => 'typeReferenceurl',
            'rule' => "^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$",
        ],
        [
            'typeName' => 'file',
            'typeReference' => 'typeReferencefile',
            'rule' => '',
        ],
        [
            'typeName' => 'textarea',
            'rule' => '',
            'typeReference' => 'typeReferencetextarea'
        ],
        [
            'typeName' => 'question',
            'rule' => '',
            'typeReference' => 'typeReferencequestion'
        ]
    ];

    public function load(ObjectManager $manager): void
    {
        foreach (self::TYPE as $typeData) {

            $type = new Type();

            $type->setTypeName($typeData['typeName']);
            $type->setRule($typeData['rule']);


            $manager->persist($type);
            $this->addReference($typeData['typeReference'], $type);
        }
        $manager->flush();
    }
}
