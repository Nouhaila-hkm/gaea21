<?php

namespace App\Repository;

use App\Entity\SectionMapField;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method SectionMapField|null find($id, $lockMode = null, $lockVersion = null)
 * @method SectionMapField|null findOneBy(array $criteria, array $orderBy = null)
 * @method SectionMapField[]    findAll()
 * @method SectionMapField[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SectionMapFieldRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SectionMapField::class);
    }

    public function remove(SectionMapField $entity, bool $flush = false){
        $this->getEntityManager()->remove($entity);
        
        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    // /**
    //  * @return SectionMapField[] Returns an array of SectionMapField objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?SectionMapField
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
