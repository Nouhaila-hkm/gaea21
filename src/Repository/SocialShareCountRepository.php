<?php

namespace App\Repository;

use App\Entity\SocialShareCount;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<SocialShareCount>
 *
 * @method SocialShareCount|null find($id, $lockMode = null, $lockVersion = null)
 * @method SocialShareCount|null findOneBy(array $criteria, array $orderBy = null)
 * @method SocialShareCount[]    findAll()
 * @method SocialShareCount[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SocialShareCountRepository extends BetterServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SocialShareCount::class, "sharecount");
    }

    public function add(SocialShareCount $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(SocialShareCount $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function filterComplete($query)
    {
      return $query
        ->innerJoin("sharecount.tool","tool");
    }

    public function filterTool($query,$tool)
    {
      $param=unique("tool");
      return $query
        ->andWhere("sharecount.tool=:$param")
        ->setParameter($param,$tool);
    }

    public function filterArticle($query,$article)
    {
      $param=unique("article");
      return $query
        ->andWhere("sharecount.article=:$param")
        ->setParameter($param,$article);
    }

    public function getShareCountOrCreate($article,$tool)
    {
      $count=$this->findByFilter(["complete",["tool",$tool],["article",$article]]);
      if(count($count)==0){
        $count=new SocialShareCount();
        $count->setArticle($article);
        $count->setTool($tool);
        $count->setCount(0);
        $this->add($count,true);
        return $count;
      }
      else return $count[0];
    }

    public function getShareCountsOrCreate($article, $tools){
      $ret=[];
      foreach($tools as $tool){
        $ret[$tool->getId()]=$this->getShareCountOrCreate($article,$tool);
      }
      return $ret;
    }



}
