<?php

namespace App\Controller;

use App\Entity\JobOffre;
use App\Repository\JobOffreRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Monolog\DateTimeImmutable;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class JobOfferController extends AbstractController
{
    /**
     * @Route(
     * path="apiTest/job_offres/{id}/publish",
     *  name="publish_offer"
     * )
     */
    public function publishOffer(JobOffreRepository $jobOffreRepository, $id, EntityManagerInterface $em): Response

    {
        $jobOffre = $jobOffreRepository->findOneById($id);
        $isPublished = $jobOffre->getisPublished();

        if ($isPublished != true) {
            $jobOffre->setisPublished(true);
            $jobOffre->setPublishedAt(new \DateTimeImmutable(false));
            $em->persist($jobOffre);
            $em->flush();
        }

        return new Response();
    }
    /**
     * @Route(
     * path="apiTest/job_offres/{id}/unpublish",
     *  name="unpublish_offer"
     * )
     */
    public function unpublishOffer(JobOffreRepository $jobOffreRepository, $id, EntityManagerInterface $em): Response

    {
        $jobOffre = $jobOffreRepository->findOneById($id);

        $publicationDate = $jobOffre->getPublishedAt();
        // dd($publicationDate);

        if ($publicationDate !== null) {
            $jobOffre->setisPublished(false);
            // $jobOffre->setPublishedAt(new DateTimeImmutable());

            $em->persist($jobOffre);
            $em->flush();
        }
        return new Response();
    }



    /**
     * @Route(
     *  path="apiTest/job_offres/latestOffers",
     *  name="lastest_offers",
     *  methods={"GET"}
     * )
     */
    public function getlatestJobOffers(JobOffreRepository $jobOffreRepository)
    {
        $latestJobOffers = $jobOffreRepository->findBy(array(), array('id' => 'DESC'), 2, 0); // modifier le nombre en fonction de l'affichage
        return $this->json($latestJobOffers);
    }
    /**
     * @Route(
     *  path="apiTest/job_offres/filteredByPublishedDate",
     *  name="filter_offers_date",
     *  methods={"GET"}
     * )
     */
    public function filterByPublishedDate(JobOffreRepository $jobOffreRepository)
    {
        $filteredByPublishedDate = $jobOffreRepository->findBy(['isPublished' => true]);
        return $this->json($filteredByPublishedDate, 200, [], ['groups' => ['offer:read']]);
    }
    /**
     * @Route(
     *  path="apiTest/job_offres/allOffers",
     *  name="offers",
     *  methods={"GET"}
     * )
     */
    public function getAll(JobOffreRepository $jobOffreRepository)
    {


        $allOffers = $jobOffreRepository->findAll();
        // dd($allOffers);
        return $this->json($allOffers);
    }
}
