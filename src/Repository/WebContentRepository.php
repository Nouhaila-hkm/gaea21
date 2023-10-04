<?php

namespace App\Repository;

use App\Repository\TranslationAdapterRepository;
use App\Entity\WebContent;
use App\Entity\Langue;
use App\Entity\TranslationAdapter;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method WebContent|null find($id, $lockMode = null, $lockVersion = null)
 * @method WebContent|null findOneBy(array $criteria, array $orderBy = null)
 * @method WebContent[]    findAll()
 * @method WebContent[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WebContentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, WebContent::class);
    }

    public function getTranslateds(string $type, $frenchElement, Langue $lang){
      $rep=$this->getEntityManager()->getRepository($type);
      $column=TranslationAdapter::getColumn($type);
      $result=$rep
        ->createQueryBuilder("translated")
        ->innerJoin("translated.translationAdapters","linktranslated")
        ->innerJoin("linktranslated.webContent","webcontent")
        ->innerJoin("webcontent.frenchVersion","frenchlink")
        ->andWhere("frenchlink.".$column."=:frenchelement")
        ->andWhere("webcontent.lang=:langelement")
        ->setParameter(":frenchelement",$frenchElement)
        ->setParameter(":langelement",$lang)
        ->getQuery()
        ->getResult();
      return $result[0] ?? $frenchElement;
    }

    public function linkTranslation(string $type, $french, $translated, $lang){
      $manager=$this->getEntityManager();

      $french->setFrench(true);
      $translated->setFrench(false);

      // Get original webcontent
      $aFrench=new TranslationAdapter();
      $aFrench->set($type,$french);
      $aTrad=new TranslationAdapter();
      $aTrad->set($type,$translated);

      $webcontent=new WebContent();
      $webcontent->setFrenchVersion($aFrench);
      $webcontent->setTranslatedVersion($aTrad);
      $webcontent->setLang($lang);

      $manager->persist($aFrench);
      $manager->persist($aTrad);
      $manager->persist($webcontent);
      $manager->flush();
    }


}
