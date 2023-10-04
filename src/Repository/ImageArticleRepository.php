<?php

namespace App\Repository;

use App\Entity\ImageArticle;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ImageArticle|null find($id, $lockMode = null, $lockVersion = null)
 * @method ImageArticle|null findOneBy(array $criteria, array $orderBy = null)
 * @method ImageArticle[]    findAll()
 * @method ImageArticle[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ImageArticleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ImageArticle::class);
    }

    // /**
    //  * @return ImageArticle[] Returns an array of ImageArticle objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('i.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ImageArticle
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
