<?php

namespace App\Repository;

use App\Entity\NavBarre;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method NavBarre|null find($id, $lockMode = null, $lockVersion = null)
 * @method NavBarre|null findOneBy(array $criteria, array $orderBy = null)
 * @method NavBarre[]    findAll()
 * @method NavBarre[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NavBarreRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, NavBarre::class);
    }

    // /**
    //  * @return NavBarre[] Returns an array of NavBarre objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('n.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?NavBarre
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
