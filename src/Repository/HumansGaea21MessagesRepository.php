<?php

namespace App\Repository;

use App\Entity\HumansGaea21Messages;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<HumansGaea21Messages>
 *
 * @method HumansGaea21Messages|null find($id, $lockMode = null, $lockVersion = null)
 * @method HumansGaea21Messages|null findOneBy(array $criteria, array $orderBy = null)
 * @method HumansGaea21Messages[]    findAll()
 * @method HumansGaea21Messages[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class HumansGaea21MessagesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, HumansGaea21Messages::class);
    }

    public function add(HumansGaea21Messages $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(HumansGaea21Messages $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return HumansGaea21Messages[] Returns an array of HumansGaea21Messages objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('h')
//            ->andWhere('h.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('h.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?HumansGaea21Messages
//    {
//        return $this->createQueryBuilder('h')
//            ->andWhere('h.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
