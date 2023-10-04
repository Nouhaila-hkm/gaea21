<?php

namespace App\Controller\Formulaire;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\SectionMapField;
use App\Entity\Field;
use App\Entity\FieldListeTypeData;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\FormulaireRepository;
use App\Repository\SectionRepository;
use App\Repository\SectionMapFieldRepository;
use App\Repository\FieldRepository;
use App\Repository\TypeRepository;
use App\Repository\FieldListeTypeDataRepository;

/**
 * FormBuilder Controller - Deals with FIELD
 *    [ADD, UPDATE, DELETE]
 */
#[Route('/form/api/field/', name: 'form_api_field_')]
class ApiFieldController extends AbstractController
{
  //Repositories utilisée par Field
  private EntityManagerInterface $entityManager;
  private FormulaireRepository $formulaireRepository;
  private TypeRepository $typeRepository;
  private SectionRepository $sectionRepository;
  private FieldRepository $fieldRepository;
  private FieldListeTypeDataRepository $fieldListeTypeDataRepository;
  private SectionMapFieldRepository $sectionMapFieldRepository;

  public function __construct(
    FormulaireRepository $formulaireRepository,
    TypeRepository $typeRepository,
    EntityManagerInterface $entityManager,
    SectionRepository $sectionRepository,
    FieldRepository $fieldRepository,
    FieldListeTypeDataRepository $fieldListeTypeDataRepository,
    SectionMapFieldRepository $sectionMapFieldRepository,
  ) {
    $this->entityManager = $entityManager;
    $this->formulaireRepository = $formulaireRepository;
    $this->typeRepository = $typeRepository;
    $this->sectionRepository = $sectionRepository;
    $this->fieldListeTypeDataRepository = $fieldListeTypeDataRepository;
    $this->fieldRepository = $fieldRepository;
    $this->sectionMapFieldRepository = $sectionMapFieldRepository;
  }

  /**
   * Ajouter un Field à la Section du Formulaire
   * @method POST
   * @param JSON - sectionID
   * @return JSON Formulaire
   */
  #[Route('add', name: 'add', methods: ["POST"])]
  public function addField(
    Request $request,
  ): Response {
    $data = json_decode($request->getContent(), true);
    $fieldTypes = $this->typeRepository->findAll();

    // Find Section
    $sectionID = $data['section']['id'];
    $section = $this->sectionRepository->find($sectionID);
    $count = count($section->getMappedFields());

    // Create new Field
    $field = new Field;
    $field->setSize(1);
    $field->setClass("Class");
    $field->setPlaceholder("Hint");
    $field->setLabel("Label " . $count + 1);
    $field->setShowLabel(false);
    $field->setIsRequired(0);
    $field->setIsUnique(0);
    $field->setListOrder($count);
    $field->setIsActive(1);
    $field->setType($fieldTypes[0]);

    //Add to MappedField of Section to attach to
    $sectionMapField = new SectionMapField;
    $sectionMapField->setSection($section);
    $sectionMapField->setField($field);
    $section->addMappedField($sectionMapField);

    $this->entityManager->persist($field);
    $this->entityManager->persist($section);
    $this->entityManager->persist($sectionMapField);
    $this->entityManager->flush();

    $form = $this->formulaireRepository->find($data['formID']);

    return $this->json(
      $form,
      200,
      [],
      ['groups' => 'formulaire:read'],
    );
  }

  /**
   * Updater le Field
   * @method POST
   * @param JSON - FieldInfo + potentially Fields of Section
   * @return JSON Formulaire
   */
  #[Route('update', name: 'update', methods: ["POST"])]
  public function editFieldAPI(
    Request $request,
  ): Response {

    $data = json_decode($request->getContent(), true);
    $fieldInfo = $data['field'];
    // Find field
    $field = $this->fieldRepository->find($fieldInfo['id']);

    /**
     * Method to sort order of Fields.
     * This is called if all Fields of the Section are sent in the JSON Request,
     *  which means that the <list_order> of some Fields needs to be changed
     */
    if (isset($data['fields'])) {
      $fieldsID = $data['fields'];
      if (($key = array_search($fieldInfo['id'], $fieldsID)) !== false) {
        unset($fieldsID[$key]);
      }
      if ($field->getListOrder() < $fieldInfo['list_order']) {
        for ($i = $fieldInfo['list_order']; $i > $field->getListOrder(); $i--) {
          $orderedField = $this->fieldRepository->find($fieldsID[$i]);
          $orderedField->setListOrder($i - 1);
        }
      } elseif ($field->getListOrder() > $fieldInfo['list_order']) {
        for ($i = $fieldInfo['list_order']; $i < $field->getListOrder(); $i++) {
          $orderedField = $this->fieldRepository->find($fieldsID[$i]);
          $orderedField->setListOrder($i + 1);
        }
      }
    }

    // Update Field information
    $field->setListOrder($fieldInfo['list_order']);
    $field->setClass($fieldInfo['class']);
    $field->setType($this->typeRepository->find($fieldInfo['type']['id']));
    $field->setSize($fieldInfo['size']);
    $field->setLabel($fieldInfo['label']);
    $field->setShowLabel($fieldInfo['show_label']);
    $field->setPlaceholder($fieldInfo['placeholder']);
    $field->setIsRequired($fieldInfo['is_required']);
    $field->setIsUnique($fieldInfo['is_unique']);
    $field->setIsActive($fieldInfo['is_active']);

    // Create or Update FieldListData informations - ie Select, Radios, Options essentially
    foreach ($data['field']['field_listdatas'] as $value) {
      if (count($value) < 3) {
        $listdata = new FieldListeTypeData;
        $listdata->setLabel($value['label']);
        $listdata->setField($field);
        $listdata->setValue($value['label']);
        $this->entityManager->persist($listdata);
      } else {
        $option = $this->fieldListeTypeDataRepository->find($value['id']);
        $option->setLabel($value['label']);
        $option->setValue($value['label']);
        $this->entityManager->persist($option);
      }
    }

    $this->entityManager->persist($field);
    $this->entityManager->flush();

    $form = $this->formulaireRepository->find($data['formID']);
    return $this->json(
      $form,
      200,
      [],
      ['groups' => 'formulaire:read'],
    );
  }

  /**
   * Effacer le Field 
   * @method POST
   * @param JSON - FieldInfo 
   * @return JSON Formulaire
   */
  #[Route('delete', name: 'delete', methods: ["POST"])]
  public function deleteFieldAPI(
    Request $request,
  ): Response {
    $data = json_decode($request->getContent(), true);
    $fieldInfo = $data['field'];
    //Find Field 
    $field = $this->fieldRepository->find($fieldInfo['id']);
    $sectionMapFields = $field->getSectionMapFields();
    // Delete child Field from the Section
    foreach ($sectionMapFields as $sectionField) {
      $this->sectionMapFieldRepository->remove($sectionField, true);
    }
    // Delete child Field
    $this->fieldRepository->remove($field, true);

    $form = $this->formulaireRepository->find($data['formID']);
    return $this->json(
      $form,
      200,
      [],
      ['groups' => 'formulaire:read'],
    );
  }
}
