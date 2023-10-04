<?php

namespace App\Controller;

use App\Repository\JobOfferNetworkRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class JobOfferNetworkController extends AbstractController
{
   /**
   * @Route(
   * path="apiTest/job_offres_network/{id}/publish",
     *  name="publish_offer_network"
   * )
   */
  public function publishOfferNetwork(JobOfferNetworkRepository $jobOfferNetworkRepository, $id, EntityManagerInterface $em): Response

  {
      $jobOffreNetwork = $jobOfferNetworkRepository->findOneById($id);
      $isPublished = $jobOffreNetwork->getisPublished();
      
      if($isPublished != true) {
          $jobOffreNetwork->setisPublished(true);
          $jobOffreNetwork->setPublishedAt(new \DateTimeImmutable(false));
          $em->persist($jobOffreNetwork);
          $em->flush();            
      }
          
          return new Response();
  }
/**
 * @Route(
 * path="apiTest/job_offres_network/{id}/unpublish",
   *  name="unpublish_offer_network"
 * )
 */
  public function unpublishOfferNetwork(JobOfferNetworkRepository $jobOfferNetworkRepository, $id, EntityManagerInterface $em): Response

  {
      $jobOffreNetwork = $jobOfferNetworkRepository->findOneById($id);
     
      $publicationDate = $jobOffreNetwork->getPublishedAt();
      // dd($publicationDate);
      
      if($publicationDate !== null) {
          $jobOffreNetwork->setisPublished(false);
          // $jobOffreNetwork->setPublishedAt(new DateTimeImmutable());
      
          $em->persist($jobOffreNetwork);
          $em->flush();            
      }
      return new Response();
  }



  /**
   * @Route(
   *  path="apiTest/job_offres_network/latestOffers",
   *  name="lastest_offers_network",
   *  methods={"GET"}
   * )
   */
  public function getlatestJobOffersNetwork(JobOfferNetworkRepository $jobOfferNetworkRepository) {
      $latestJobOffersNetwork = $jobOfferNetworkRepository->findBy(array(),array('id'=>'DESC'),2,0); // modifier le nombre en fonction de l'affichage
      return $this->json($latestJobOffersNetwork);
  }


   /**
   * @Route(
   *  path="apiTest/job_offres_network/filteredByPublishedDate",
   *  name="filter_offers_network_date",
   *  methods={"GET"}
   * )
   */
  public function filterByPublishedDate(JobOfferNetworkRepository $jobOfferNetworkRepository) {

      
      $filteredByPublishedDate = $jobOfferNetworkRepository->findBy(['isPublished' => true]);
      return $this->json($filteredByPublishedDate);
  }


     /**
   * @Route(
   *  path="apiTest/job_offres_network/allOffers",
   *  name="offersnetwork",
   *  methods={"GET"}
   * )
   */
  public function getAll(JobOfferNetworkRepository $jobOfferNetworkRepository) {

      
      $allOffers = $jobOfferNetworkRepository->findAll();
      // dd($allOffers);
      return $this->json($allOffers);
  }
}
