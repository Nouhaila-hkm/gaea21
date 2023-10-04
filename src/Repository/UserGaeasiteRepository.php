<?php

namespace App\Repository;

use App\Entity\UserGaeasite;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method UserGaeasite|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserGaeasite|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserGaeasite[]    findAll()
 * @method UserGaeasite[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserGaeasiteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserGaeasite::class);
    }

     /**
      * @return UserGaeasite[] Returns an array of UserGaeasite objects
      */
    
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    

    
    public function findOneBySomeField($value): ?UserGaeasite
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    
}