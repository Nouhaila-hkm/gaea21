<?php

namespace App\DataFixtures;

use App\Entity\Article;
use App\Entity\Langue;
use App\Entity\WebContent;
use App\Entity\SocialShareCount;
use App\Entity\Tag;
use App\Entity\SocialTool;

use App\DataFixtures\LangueFixtures;
use App\DataFixtures\SocialToolsFixtures;

use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use App\Service\RandomGenerator;
use App\Service\GeneratorsPack;
use App\Service\StringManipulator;
use App\Service\EntityMaker;

class ArticleFixtures extends Fixture implements DependentFixtureInterface
{



  private $gen;
  private $pack;
  private $strmanipulator;
  private $maker;



  public function __construct(RandomGenerator $gen, GeneratorsPack $pack, StringManipulator $strmanipulator, EntityMaker $maker)
  {
    $this->gen = $gen;
    $this->strmanipulator = $strmanipulator;
    $this->maker = $maker;
    $this->pack = $pack;
  }



  public function load(ObjectManager $manager): void
  {
    // $tools = $manager->getRepository(SocialShareCount::class)->findAll();
    // $langs = $manager->getRepository(Langue::class)->findAll();
    // $tags = $manager->getRepository(Tag::class)->findAll();
    // $tradManager = $manager->getRepository(WebContent::class);

    // # Article
    // $this->maker->setEntityType(Article::class, ["dateCreation", "title", "rawText", "formatedText", "author", "tag"]);
    // $articles = [];
    // for ($i = 0; $i < 50; $i++) {
    //   $first = null;
    //   $text = $this->gen->generate($this->pack->HTML_PARAGRAPH);
    //   $rawtext = preg_replace("/\<[^\<\>]+\>/", "", $text);
    //   $title = $this->strmanipulator->ucsentences($this->gen->generate($this->pack->AFFIRMATION_SENTENCE));
    //   $articledata = [
    //     $this->gen->genDate(new \DateTime("2000-00-00"), new \DateTime("2100-00-00")),
    //     "", "", "",
    //     $this->gen->generate($this->pack->PERSON),
    //     $this->gen->genTab($tags, $this->gen->genInt(2, 4)),
    //   ];
    //   foreach ([[$langs[0], fn ($a) => $a], [$langs[1], [$this->pack, "frenchToEnglish"]], [$langs[2], [$this->pack, "frenchToItalian"]]] as $lang) {
    //     $articledata[1] = $lang[1]($title);
    //     $articledata[2] = $lang[1]($rawtext);
    //     $articledata[3] = $lang[1]($text);
    //     $newarticle = $this->maker->create(...$articledata);
    //     $articles[] = $newarticle;

    //     if ($first == null) $first = $newarticle;
    //     else $tradManager->linkTranslation(Article::class, $first, $newarticle, $lang[0]);
    //   }
    // }

    // # Social Share Counts
    // $this->maker->setEntityType(SocialShareCount::class, ["tool", "article", "count"]);
    // foreach ($articles as $article) {
    //   foreach ($tools as $tool) {
    //     $article->addSocialShareCount($this->maker->create(
    //       $tool,
    //       $article,
    //       $this->gen->genInt(0, 94) * pow(10, $this->gen->genInt(-2, 7)),
    //     ));
    //   }
    // }

    // $this->maker->flush();
  }

  public function getDependencies()
  {
    return [
      LangueFixtures::class,
      SocialToolsFixtures::class,
    ];
  }
}
