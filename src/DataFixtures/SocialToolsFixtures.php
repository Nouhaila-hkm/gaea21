<?php

namespace App\DataFixtures;

use App\Entity\SocialTool;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use App\Service\RandomGenerator;
use App\Service\GeneratorsPack;
use App\Service\StringManipulator;
use App\Service\EntityMaker;

class SocialToolsFixtures extends Fixture
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
    $this->maker->setEntityType(SocialTool::class,["name","color","sharelink","homepath"]);

    $this->maker->create(
      "Facebook", 0x3B5998,
      "https://www.facebook.com/sharer/?u=%URL%",
      "https://www.facebook.com"
    );

    $this->maker->create(
      "Linkedin", 0x0A66C2,
      "https://www.linkedin.com/share?url=%URL%",
      "https://www.linkedin.com"
    );

    $this->maker->create(
      "Mail", 0xffffff,
      "mailto:?subject=%NAME%&body=%URL%",
      "mailto:"
    );

    $this->maker->create(
      "Twitter", 0x1D9BF0,
      "https://twitter.com/intent/tweet?url=%URL%&text=%NAME%&hashtags=gaea21",
      "https://twitter.com"
    );

    $this->maker->create(
      "Skype", 0x00B6EF,
      "https://web.skype.com/share?url=%URL%&text=%NAME%",
      "https://web.skype.com"
    );

    $this->maker->create(
      "Phone", 0xFFAAAA,
      "sms:?body=%NAME%: %URL%",
      "sms:"
    );

    $this->maker->create(
      "Pinterest", 0xD50B20,
      "http://pinterest.com/pin/create/link/?url=%URL%",
      "http://pinterest.com"
    );

    $this->maker->create(
      "WhatsApp", 0x26D367,
      "https://api.whatsapp.com/send?text=%NAME% :%URL%",
      "https://whatsapp.com"
    );

    $this->maker->create(
      "Reddit", 0xED561E,
      "https://reddit.com/submit?url=%URL%&title=%NAME%",
      "https://reddit.com"
    );

    $this->maker->flush();
  }
}
