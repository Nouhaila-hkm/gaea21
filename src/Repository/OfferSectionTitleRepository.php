<?php

namespace App\Repository;

use App\Entity\OfferSectionTitle;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<OfferSectionTitle>
 *
 * @method OfferSectionTitle|null find($id, $lockMode = null, $lockVersion = null)
 * @method OfferSectionTitle|null findOneBy(array $criteria, array $orderBy = null)
 * @method OfferSectionTitle[]    findAll()
 * @method OfferSectionTitle[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OfferSectionTitleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, OfferSectionTitle::class);
    }

    public function add(OfferSectionTitle $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(OfferSectionTitle $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return OfferSectionTitle[] Returns an array of OfferSectionTitle objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('o')
//            ->andWhere('o.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('o.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?OfferSectionTitle
//    {
//        return $this->createQueryBuilder('o')
//            ->andWhere('o.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
