<?php

namespace App\Repository;

use App\Entity\Langue;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Langue|null find($id, $lockMode = null, $lockVersion = null)
 * @method Langue|null findOneBy(array $criteria, array $orderBy = null)
 * @method Langue[]    findAll()
 * @method Langue[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LangueRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Langue::class);
    }

    public function queryAll()
    {
        return $this->createQueryBuilder('langue');
    }

    public function queryByAbreviation($query,$abbr)
    {
        return $query
          ->andWhere("langue.Abreviation=:abbr")
          ->setParameter("abbr",$abbr);
    }

    public function getByAbreviation($abbr){
      $result=$this->queryByAbreviation($this->queryAll(),$abbr)->setMaxResults(1)->getQuery()->getResult();
      return count($result)>0 ? $result[0] : null;
    }

    // /**
    //  * @return Langue[] Returns an array of Langue objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('l.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    
    public function findOneBySomeField($value): ?Langue
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

}
