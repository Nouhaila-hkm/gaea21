<?php

namespace App\Controller\Formulaire;

use App\Entity\Field;
use App\Entity\FormMapSection;
use App\Entity\Section;
use App\Entity\SectionMapField;
use App\Repository\FieldRepository;
use App\Repository\FormMapSectionRepository;
use App\Repository\FormulaireRepository;
use App\Repository\SectionRepository;
use App\Repository\TypeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * FormBuilder Controller - Deals with SECTION 
 *    [ADD, UPDATE, DELETE]
 */
#[Route('/form/api/section/', name: 'form_api_section_')]
class ApiSectionController extends AbstractController
{
  //Repositories utilisée par Section
  private EntityManagerInterface $entityManager;
  private FormulaireRepository $formulaireRepository;
  private SectionRepository $sectionRepository;
  private FieldRepository $fieldRepository;
  private FormMapSectionRepository $formMapSectionRepository;
  private TypeRepository $typeRepository;

  public function __construct(
    FormulaireRepository $formulaireRepository,
    EntityManagerInterface $entityManager,
    SectionRepository $sectionRepository,
    FieldRepository $fieldRepository,
    TypeRepository $typeRepository,
    FormMapSectionRepository $formMapSectionRepository,
  ) {
    $this->entityManager = $entityManager;
    $this->formulaireRepository = $formulaireRepository;
    $this->sectionRepository = $sectionRepository;
    $this->fieldRepository = $fieldRepository;
    $this->formMapSectionRepository = $formMapSectionRepository;
    $this->typeRepository = $typeRepository;
  }

  /**
   * Ajouter une Section au Formulaire
   * @method POST
   * @param JSON - formID
   * @return JSON Formulaire
   */
  #[Route('add', name: 'add', methods: ["POST"])]
  public function addSection(
    Request $request,
  ): Response {
    $data = json_decode($request->getContent(), true);
    $id = $data['state']['id'];
    //Find Formulaire
    $form = $this->formulaireRepository->find($id);
    $sectionCount = count($form->getMappedSections());
    $fieldTypes = $this->typeRepository->findAll();

    // Create new Section
    $section = new Section;
    $section->setSectionName("Section " . $sectionCount);
    $section->setSectionHeader("Section Header " . $sectionCount);
    $section->setShowHeader(true);
    $section->setIsActive(1);

    //Add to MappedSection of Formulaire to attach to
    $formMapSection = new FormMapSection;
    $formMapSection->setForm($form);
    $formMapSection->setSection($section);
    $formMapSection->setSectionNumber($sectionCount);
    $form->addMappedSection($formMapSection);

    // Create Field for Section created
    $field = new Field;
    $field->setSize(1);
    $field->setClass("Class");
    $field->setPlaceholder("");
    $field->setLabel("Label 1");
    $field->setIsRequired(0);
    $field->setIsUnique(0);
    $field->setListOrder(0);
    $field->setIsActive(1);
    $field->setShowLabel(false);
    $field->setType($fieldTypes[0]);

    // Add to MappedField of Section to attach to
    $sectionMapField = new SectionMapField;
    $sectionMapField->setSection($section);
    $sectionMapField->setField($field);
    $section->addMappedField($sectionMapField);

    $this->entityManager->persist($section);
    $this->entityManager->persist($sectionMapField);
    $this->entityManager->persist($formMapSection);
    $this->entityManager->persist($field);
    $this->entityManager->persist($form);
    $this->entityManager->flush();

    return $this->json(
      $form,
      200,
      [],
      ['groups' => 'formulaire:read'],
    );
  }

  /**
   * Updater une Section du Formulaire
   * @method POST 
   * @param JSON - sectionData
   * @return JSON "sucess"
   */
  #[Route('update', name: 'update', methods: ["POST"])]
  public function editSectionAPI(
    Request $request,
  ): Response {
    $data = $request->getContent();
    $data = json_decode($data, true);
    //Find Section
    $section = $this->sectionRepository->find($data['section']['id']);

    //Update Section information
    $section->setSectionName($data['section']['sectionName']);
    $section->setSectionHeader($data['section']['sectionName']);
    $section->setShowHeader($data['section']['show_header']);
    $section->setIsActive($data['section']['is_active']);

    $this->entityManager->flush($section);
    return $this->json(
      "Success",
      200,
      [],
      ['groups' => 'formulaire:read'],
    );
  }

  /**
   * Effacer une Section du Formulaire
   * @method POST 
   * @param JSON - sectionData + fields info
   * @return JSON Formulaire
   */
  #[Route('delete', name: 'delete', methods: ["POST"])]
  public function deleteSectionAPI(
    Request $request,
  ): Response {
    $data = json_decode($request->getContent(), true);

    // Delete all child Fields of the Section
    foreach ($data['fields'] as $field) {
      $field = $this->fieldRepository->find($field['field']['id']);
      $this->fieldRepository->remove($field);
    }
    // Delete Section
    $section = $this->sectionRepository->find($data['id']);
    $this->sectionRepository->remove($section);
    $formMap = $this->formMapSectionRepository->find($data['mappedID']);
    $this->formMapSectionRepository->remove($formMap);

    $this->entityManager->flush();

    // Find Form to return it to update page
    $form = $this->formulaireRepository->find($data['formID']);
    return $this->json(
      $form,
      200,
      [],
      ['groups' => 'formulaire:read'],
    );
  }
}
