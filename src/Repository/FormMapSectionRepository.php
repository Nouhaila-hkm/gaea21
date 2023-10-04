<?php

namespace App\Repository;

use App\Entity\FormMapSection;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method FormMapSection|null find($id, $lockMode = null, $lockVersion = null)
 * @method FormMapSection|null findOneBy(array $criteria, array $orderBy = null)
 * @method FormMapSection[]    findAll()
 * @method FormMapSection[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FormMapSectionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, FormMapSection::class);
    }

    public function remove(FormMapSection $entity, bool $flush = false){
        $this->getEntityManager()->remove($entity);
        
        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    // /**
    //  * @return FormMapSection[] Returns an array of FormMapSection objects
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
    public function findOneBySomeField($value): ?FormMapSection
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
