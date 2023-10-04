<?php

namespace App\DataFixtures;

use DateTime;
use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $user1 = new User();
        $user1->setEmail('user1@user1.com');
        $hashedPassword1 = $this->passwordHasher->hashPassword($user1, 'user1Password');
        $user1->setPassword($hashedPassword1);
        $user1->setGaeauserId(10);
        $user1->setRoles(['ROLE_ADMIN']);
        // $user1->setDisplayName('Display One');
        $user1->setUsername('user1');
        $user1->setLastName('user1');
        $user1->setFirstName('user1');
        $user1->setBirthDay(new DateTime('now'));
        $user1->setNationality('user1');
        $user1->setAdress('user1');
        $user1->setCity('user1');
        $user1->setCountry('user1');
        $user1->setZipCode('user1');


        $manager->persist($user1);

        $user2 = new User();
        $user2->setEmail('user2@user2.com');
        $hashedPassword2 = $this->passwordHasher->hashPassword($user2, 'user2Password');
        $user2->setPassword($hashedPassword2);
        $user2->setGaeauserId(20);
        $user2->setRoles(['ROLE_CONTRIBUTOR']);
        // $user2->setDisplayName('Display Two');
        $user2->setUsername('user2');
        $manager->persist($user2);
        $user2->setLastName('user2');
        $user2->setFirstName('user2');
        $user2->setBirthDay(new DateTime('now'));
        $user2->setNationality('user2');
        $user2->setAdress('user2');
        $user2->setCity('user2');
        $user2->setCountry('user2');
        $user2->setZipCode('user2');

        $manager->flush();
    }
}
