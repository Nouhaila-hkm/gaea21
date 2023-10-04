<?php

namespace App\Repository;

use App\Entity\MappedFormData;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method MappedFormData|null find($id, $lockMode = null, $lockVersion = null)
 * @method MappedFormData|null findOneBy(array $criteria, array $orderBy = null)
 * @method MappedFormData[]    findAll()
 * @method MappedFormData[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MappedFormDataRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MappedFormData::class);
    }

    // /**
    //  * @return MappedFormData[] Returns an array of MappedFormData objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?MappedFormData
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
