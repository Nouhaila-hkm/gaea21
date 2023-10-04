<?php

namespace App\Repository;

use App\Entity\TranslationAdapter;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<TranslationAdapter>
 *
 * @method TranslationAdapter|null find($id, $lockMode = null, $lockVersion = null)
 * @method TranslationAdapter|null findOneBy(array $criteria, array $orderBy = null)
 * @method TranslationAdapter[]    findAll()
 * @method TranslationAdapter[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TranslationAdapterRepository extends ServiceEntityRepository
{




    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TranslationAdapter::class);
    }



    public function add(TranslationAdapter $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(TranslationAdapter $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
    public function findTranslaterByArticleId($id)
    {
       return $this->createQueryBuilder('translater')
           ->andWhere('translater.article=:id')
           ->setParameter('id',$id)
           ->getQuery()
           ->getResult();
    }

//    /**
//     * @return TranslationAdapter[] Returns an array of TranslationAdapter objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('t.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?TranslationAdapter
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
