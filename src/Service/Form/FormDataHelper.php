<?php

namespace App\Service\Form;

use App\Entity\FormData;
use App\Repository\FormDataRepository;
use App\Repository\FormulaireRepository;
use App\Repository\MappedFormDataRepository;
use App\Repository\ProjetRepository;

class FormDataHelper
{
  private FormDataRepository $formDataRepository;
  private FormulaireRepository $formulaireRepository;
  private ProjetRepository $projetRepository;
  private MappedFormDataRepository $mappedFormDataRepository;

  public function __construct(
    FormDataRepository $formDataRepository,
    FormulaireRepository $formulaireRepository,
    ProjetRepository $projetRepository,
    MappedFormDataRepository $mappedFormDataRepository
  ) {
    $this->formDataRepository =  $formDataRepository;
    $this->formulaireRepository = $formulaireRepository;
    $this->projetRepository = $projetRepository;
    $this->MappedFormDataRepository =  $mappedFormDataRepository;
  }

  public function filterData($options)
  {
    extract(array_merge([
      'formType' => '-1',
      'project' => '-1',
      'sort' => 2,
      'search' => null
    ], $options));

    $queryBuilder = $this->formDataRepository->createQueryBuilder('f')
      ->select('f');

    if ($search != null && $search != "") {
      $queryBuilder = $this->filterSearch($search, $queryBuilder);
    }

    if ($formType != null) {
      $queryBuilder = $this->filterByForm($formType, $queryBuilder);
    }

    if ($project != null) {
      $queryBuilder = $this->filterByProject($project, $queryBuilder);
    }

    $queryBuilder = $this->sortOrder($sort, $queryBuilder);


    $query = $queryBuilder->getQuery();
    $query->execute();
    // dump($query);
    // dump($query->getResult());

    return $query->getResult();
  }

  public function filterByForm($formID, $queryBuilder)
  {
    $form = $this->formulaireRepository->find($formID);
    if ($form != null) {
      $queryBuilder = $queryBuilder->andWhere('f.linkedForm = :formulaire')
        ->setParameter('formulaire', $form);
    }
    return $queryBuilder;
  }


  public function filterByProject($projectID, $queryBuilder)
  {
    $project = $this->projetRepository->find($projectID);
    if ($project != null) {
      $queryBuilder = $queryBuilder->andWhere('f.linkedProject = :project')
        ->setParameter('project', $project);
    }
    return $queryBuilder;
  }

  public function filterSearch($search, $queryBuilder)
  {
    $queryBuilder = $queryBuilder
      ->leftJoin('f.mappedFormData', 'm')
      ->andWhere('m.answer like :answer')
      ->setParameter(':answer', '%' . $search . '%');

    return $queryBuilder;
  }

  public function sortOrder($sort, $queryBuilder)
  {
    switch ($sort) {
      case 1:
        return $queryBuilder->orderBy('f.createdAt', 'ASC');
      default:
        return $queryBuilder->orderBy('f.createdAt', 'DESC');
    }
  }
}
