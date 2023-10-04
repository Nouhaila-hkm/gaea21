<?php


namespace App\DataFixtures;

use App\Entity\FormData;
use App\Entity\MappedFormData;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class MappedFormDataFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $mappedformdata = new MappedFormData();
        $mappedformdata->setAnswer('Hello');
        $mappedformdata->setField($this->getReference('fieldReference1'));
        $mappedformdata->setForm($this->getReference('formulaire_reference1'));
        $formdata = new FormData();
        $formdata->setCreatedAt();
        $formdata->addMappedFormData($mappedformdata);
        $manager->persist($mappedformdata);
        $manager->persist($formdata);

        $mappedformdata2 = new MappedFormData();
        $mappedformdata2->setAnswer('Hello2');
        $mappedformdata2->setField($this->getReference('fieldReference2'));
        $mappedformdata2->setForm($this->getReference('formulaire_reference1'));
        $formdata2 = new FormData();
        $formdata->setCreatedAt();
        $formdata2->addMappedFormData($mappedformdata2);
        $manager->persist($mappedformdata2);
        $manager->persist($formdata2);

        $mappedformdata = new MappedFormData();
        $mappedformdata->setAnswer('Hello3');
        $mappedformdata->setField($this->getReference('fieldReference3'));
        $mappedformdata->setForm($this->getReference('formulaire_reference1'));
        $formdata = new FormData();
        $formdata->setCreatedAt();
        $formdata->addMappedFormData($mappedformdata);
        $manager->persist($mappedformdata);
        $manager->persist($formdata);

        $mappedformdata = new MappedFormData();
        $mappedformdata->setAnswer('Hello4');
        $mappedformdata->setField($this->getReference('fieldReference4'));
        $mappedformdata->setForm($this->getReference('formulaire_reference1'));
        $formdata = new FormData();
        $formdata->setCreatedAt();
        $formdata->addMappedFormData($mappedformdata);
        $manager->persist($mappedformdata);
        $manager->persist($formdata);

        $mappedformdata = new MappedFormData();
        $mappedformdata->setAnswer('Hello5');
        $mappedformdata->setField($this->getReference('fieldReference5'));
        $mappedformdata->setForm($this->getReference('formulaire_reference1'));
        $formdata = new FormData();
        $formdata->setCreatedAt();
        $formdata->addMappedFormData($mappedformdata);
        $manager->persist($mappedformdata);
        $manager->persist($formdata);

        $mappedformdata = new MappedFormData();
        $mappedformdata->setAnswer('Hello6');
        $mappedformdata->setField($this->getReference('fieldReference6'));
        $mappedformdata->setForm($this->getReference('formulaire_reference1'));
        $formdata = new FormData();
        $formdata->setCreatedAt();
        $formdata->addMappedFormData($mappedformdata);
        $manager->persist($mappedformdata);
        $manager->persist($formdata);

        $mappedformdata = new MappedFormData();
        $mappedformdata->setAnswer('Hello7');
        $mappedformdata->setField($this->getReference('fieldReference7'));
        $mappedformdata->setForm($this->getReference('formulaire_reference1'));
        $formdata = new FormData();
        $formdata->setCreatedAt();
        $formdata->addMappedFormData($mappedformdata);
        $manager->persist($mappedformdata);
        $manager->persist($formdata);

        $mappedformdata = new MappedFormData();
        $mappedformdata->setAnswer('Hello8');
        $mappedformdata->setField($this->getReference('fieldReference8'));
        $mappedformdata->setForm($this->getReference('formulaire_reference1'));
        $formdata = new FormData();
        $formdata->setCreatedAt();
        $formdata->addMappedFormData($mappedformdata);
        $manager->persist($mappedformdata);
        $manager->persist($formdata);

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            FieldFixtures::class
        ];
    }
}
