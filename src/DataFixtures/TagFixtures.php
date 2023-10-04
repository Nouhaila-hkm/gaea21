<?php

namespace App\DataFixtures;

use App\Entity\Tag;
use App\Entity\Langue;
use App\Entity\TagCategory;
use App\Entity\WebContent;

use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use App\Service\RandomGenerator;
use App\Service\GeneratorsPack;
use App\Service\StringManipulator;
use App\Service\EntityMaker;

class TagFixtures extends Fixture
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



  public function createTag($manager, $text) : Tag
  {
    $tag=$manager->getRepository(Tag::class)->getOrCreate($text);
    return $tag;
  }

  public function load(ObjectManager $manager): void
  {
    $langs=$manager->getRepository(Langue::class)->findAll();
    $tradManager=$manager->getRepository(WebContent::class);

    # Tag
    $tags=[];
    $tags[]=$this->createTag($manager, "Communautés durables");
    $tags[]=$this->createTag($manager, "Lois & réglementation");
    $tags[]=$this->createTag($manager, "Green Reporting");
    $tags[]=$this->createTag($manager, "Gouvernance");
    $tags[]=$this->createTag($manager, "Programmes internationaux");
    $tags[]=$this->createTag($manager, "Responsabilité sociale");
    $tags[]=$this->createTag($manager, "Régions durables");
    $tags[]=$this->createTag($manager, "Villes durables");
    for($i=0; $i<24; $i++){
      $tags[]=$this->createTag(
        $manager,
        ucwords($this->gen->generate($this->pack->NOUN)." ".$this->gen->generate($this->pack->ADJECTIF)),
      );
    }

    # Translation
    foreach($tags as $tag){
      foreach([ [$langs[1],[$this->pack,"frenchToEnglish"]], [$langs[2],[$this->pack,"frenchToItalian"]] ] as $lang){
        $translated=new Tag();
        $translated->setRawText($lang[1]($tag->getRawText()));
        $translated->setNormalized($lang[1]($tag->getNormalized()));
        $manager->persist($translated);
        $tradManager->linkTranslation(Tag::class, $tag, $translated, $lang[0]);
      }
    }

    # Tag Category
    $this->maker->setEntityType(TagCategory::class,["name"]);
    $categories=[];
    $categories[]=$this->maker->create("Macro");
    $categories[]=$this->maker->create("Humain");
    $categories[]=$this->maker->create("Technique");
    $categories[]=$this->maker->create("Général");

    $categCount=count($categories);
    $tagCount=count($tags);
    $tagPerCateg=$tagCount/$categCount;
    for($i=0; $i<$categCount; $i++){
      for($y=(int)($tagPerCateg*$i); $y<(int)($tagPerCateg*($i+1)); $y++){
        $categories[$i]->addTag($tags[$y]);
      }
    }

    $this->maker->flush();
  }
}
