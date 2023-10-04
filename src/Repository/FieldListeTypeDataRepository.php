<?php

namespace App\Repository;

use App\Entity\FieldListeTypeData;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method FieldListeTypeData|null find($id, $lockMode = null, $lockVersion = null)
 * @method FieldListeTypeData|null findOneBy(array $criteria, array $orderBy = null)
 * @method FieldListeTypeData[]    findAll()
 * @method FieldListeTypeData[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FieldListeTypeDataRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, FieldListeTypeData::class);
    }

    public function remove(FieldListeTypeData $entity, bool $flush = false){
        $this->getEntityManager()->remove($entity);
        
        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    // /**
    //  * @return FieldListeTypeData[] Returns an array of FieldListeTypeData objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('f.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?FieldListeTypeData
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
