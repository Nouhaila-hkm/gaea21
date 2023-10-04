<?php

namespace App\DataFixtures;

use App\Entity\Langue;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use App\Service\RandomGenerator;
use App\Service\GeneratorsPack;
use App\Service\StringManipulator;
use App\Service\EntityMaker;

class LangueFixtures extends Fixture
{



  private $gen;
  private $pack;
  private $strmanipulator;
  private $maker;



  public function __construct(RandomGenerator $gen, GeneratorsPack $pack, StringManipulator $strmanipulator, EntityMaker $maker){
    $this->gen=$gen;
    $this->strmanipulator=$strmanipulator;
    $this->maker=$maker;
    $this->pack=$pack;
  }



  public function load(ObjectManager $manager): void
  {
    $this->maker->setEntityType(Langue::class,["name","abreviation","icons"]);
    $this->maker->create("Francais","FR","Images/lang/fr.png");
    $this->maker->create("English","EN","Images/lang/en.png");
    $this->maker->create("Italiano","IT","Images/lang/it.png");
    $this->maker->flush();
  }
}
