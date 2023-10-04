<?php

namespace App\Repository;

use App\Entity\Tag;
use App\Service\StringManipulator;
use App\Repository\BetterServiceEntityRepository;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Tag>
 *
 * @method Tag|null find($id, $lockMode = null, $lockVersion = null)
 * @method Tag|null findOneBy(array $criteria, array $orderBy = null)
 * @method Tag[]    findAll()
 * @method Tag[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TagRepository extends BetterServiceEntityRepository
{


  
    private $stringManipulator;



    public function __construct(ManagerRegistry $registry, StringManipulator $sm)
    {
        parent::__construct($registry, Tag::class, "tag");
        $this->stringManipulator=$sm;
    }



    public function add(Tag $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Tag $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function getOrCreate(string $text): Tag
    {
      $ret=$this->get($text);
      if($ret==null){
        $ret=new Tag();
        $ret->setRawText($text);
        $ret->setNormalized($this->stringManipulator->normalizeText($text));
        $this->add($ret);
      }
      return $ret;
    }

    public function get(string $text): ?Tag
    {
      $result=$this->findByFilter([["autoNormalized",$text]]);
      return count($result)>0 ? $result[0] : null;
    }

    public function filterNormalized($query,...$normalized){
      return $query
        ->andWhere('tag.normalized in (:normalized)')
        ->setParameter("normalized",$normalized);
    }

    public function filterAutoNormalized($query,$text){
      return $this->filterNormalized($query,$this->stringManipulator->normalizeText($text));
    }
}
