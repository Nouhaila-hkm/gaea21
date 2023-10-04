<?php

namespace App\Repository;

use App\Entity\JobOffre;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Monolog\DateTimeImmutable;

/**
 * @extends ServiceEntityRepository<JobOffre>
 *
 * @method JobOffre|null find($id, $lockMode = null, $lockVersion = null)
 * @method JobOffre|null findOneBy(array $criteria, array $orderBy = null)
 * @method JobOffre[]    findAll()
 * @method JobOffre[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class JobOffreRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, JobOffre::class);
    }

    public function add(JobOffre $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(JobOffre $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }



    public function findAllPublishedOffers(JobOffre $entity): array {

        $qb = $this->createQueryBuilder('offer')
            ->where('offer.publishedAt != NULL')
            // ->setParameter('publishedAt', $publishedAt)
            ->orderBy('offer.publishedAt', 'DESC')
            ->andWhere('offer.isPublished = TRUE');

            $query = $qb->getQuery();

            return $query->execute();
    }
   



//    /**
//     * @return JobOffre[] Returns an array of JobOffre objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('j')
//            ->andWhere('j.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('j.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?JobOffre
//    {
//        return $this->createQueryBuilder('j')
//            ->andWhere('j.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
