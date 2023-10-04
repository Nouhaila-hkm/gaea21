<?php

namespace App\DataFixtures;

use App\Entity\OfferSectionTitle;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class OfferSectionFixtures extends Fixture
{
    public const SECTION_TITLES = [
        [
            'offerSectionTitle' => 'Description des tâches à faire',
            'icon' => 'icon.svg'
        ],
        [
            'offerSectionTitle' => 'Descriptif du projet et du sous-projet',
            'icon' => 'icon.svg'
        ],
        [
            'offerSectionTitle' => 'Modalités du poste',
            'icon' => 'icon.svg'
        ],
        [
            'offerSectionTitle' => 'Votre profil pour avancer ensemble',
            'icon' => 'icon.svg'
        ],
        [
            'offerSectionTitle' => 'Nous vous offrons',
            'icon' => 'icon.svg'
        ],
        [
            'offerSectionTitle' => 'Comment postuler',
            'icon' => 'icon.svg'
        ],
      
    ];
    public function load(ObjectManager $manager): void
    {
        foreach (self::SECTION_TITLES as $titleData) {
            
            $sectionTitle = new OfferSectionTitle();

            $sectionTitle->setTitle($titleData['offerSectionTitle']);
            $sectionTitle->setIcon($titleData['icon']);
            $manager->persist($sectionTitle);
        };

        $manager->flush();
    }
}
