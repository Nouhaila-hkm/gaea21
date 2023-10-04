<?php

namespace App\Controller\Formulaire;

use App\Entity\Field;
use App\Entity\FormMapSection;
use App\Entity\Formulaire;
use App\Entity\Section;
use App\Entity\SectionMapField;
use App\Repository\FormulaireRepository;
use App\Repository\SectionRepository;
use App\Repository\TypeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * FormBuilder Controller - Deals with FORMULAIRE 
 * 		[ADD, UPDATE, DELETE]
 */
#[Route('/form/api/form/', name: 'form_api_form_')]
class ApiFormulaireController extends AbstractController
{
	//Repositories utilisée par Formulaire
	private EntityManagerInterface $entityManager;
	private FormulaireRepository $formulaireRepository;
	private TypeRepository $typeRepository;
	private SectionRepository $sectionRepository;

	public function __construct(
		FormulaireRepository $formulaireRepository,
		TypeRepository $typeRepository,
		EntityManagerInterface $entityManager,
		SectionRepository $sectionRepository
	) {
		$this->entityManager = $entityManager;
		$this->formulaireRepository = $formulaireRepository;
		$this->typeRepository = $typeRepository;
		$this->sectionRepository = $sectionRepository;
	}


	/**
	 * Créer un formulaire
	 * @method GET 
	 * @return REDIRECT to <route>form_edit</route> of created Formulaire 
	 */
	#[Route('add', name: 'add', methods: ["GET"])]
	public function addForm(): Response
	{
		$num = count($this->formulaireRepository->findAll());
		$fieldTypes = $this->typeRepository->findAll();

		// Create new formulaire
		$form = new Formulaire;
		$form->setFormName("Formulaire " . strval(($num + 1)));
		$form->setClass("Class du Formulaire " . strval(($num + 1)));
		$form->setLabel("Label Formulaire");
		$form->setShowLabel(true);
		//TODO
		/**
		 * setEmail of all forms to yvan.claude for the FormMailer Service, 
		 * 		ou le coder en dure, 
		 * 		sinon aussi dans le .env?
		 * $form->setEmail('yvan.claude@gaea21.org');
		 */
		$form->setDescription("Description Formulaire");
		$form->setShowDescription(true);

		// Create new Section
		$section = new Section;
		$section->setSectionName("Section 1");
		$section->setSectionHeader("Section Header 1");
		$section->setIsActive(1);
		$section->setShowHeader(true);

		//Add to MappedSection of Formulaire to attach to
		$formMapSection = new FormMapSection;
		$formMapSection->setForm($form);
		$formMapSection->setSection($section);
		$formMapSection->setSectionNumber(1);

		// Create Field for Section created
		$field = new Field;
		$field->setSize(1);
		$field->setClass("Class");
		$field->setPlaceholder("Hint");
		$field->setLabel("Label");
		$field->setIsRequired(0);
		$field->setIsUnique(0);
		$field->setListOrder(0);
		$field->setIsActive(1);
		$field->setType($fieldTypes[0]);
		$field->setShowLabel(false);

		// Add to MappedField of Section to attach to
		$sectionMapField = new SectionMapField;
		$sectionMapField->setSection($section);
		$sectionMapField->setField($field);

		$this->entityManager->persist($form);
		$this->entityManager->persist($formMapSection);
		$this->entityManager->persist($section);
		$this->entityManager->persist($sectionMapField);
		$this->entityManager->persist($field);
		$this->entityManager->flush();

		return $this->redirectToRoute('form_edit', [
			'id' => $form->getId()
		]);
	}

	/**
	 * Updater les infos d'un Formulaire et les infos de ses Sections 
	 * @method POST
	 * @param JSON - form {mappedSections[]} 
	 * @return JSON - form
	 */
	#[Route('update', name: 'update', methods: ["POST"])]
	public function editFormAPI(
		Request $request,
	): Response {
		$data = $request->getContent();
		$data = json_decode($data, true);
		$data = $data['state'];
		$sections = $data['mappedSections'];

		//Update MappedSection informations of Formulaire
		foreach ($sections as $sectionInfo) {
			$section = $this->sectionRepository->find($sectionInfo['section']['id']);
			$section->setSectionName($sectionInfo['section']['sectionName']);
			$section->setSectionHeader($sectionInfo['section']['sectionName']);
			$section->setShowHeader($sectionInfo['section']['show_header']);
			$section->setIsActive($sectionInfo['section']['is_active']);
			$this->entityManager->persist($section);
		}

		//Update Formulaire information
		$form = $this->formulaireRepository->find($data['id']);
		$form->setClass($data['class']);
		$form->setFormName($data['formName']);
		$form->setEmail($data['email']);
		$form->setLabel($data['label']);
		$form->setShowLabel($data['show_label']);
		$form->setDescription($data['description']);
		$form->setShowDescription($data['show_description']);
		$this->entityManager->persist($form);
		$this->entityManager->flush();

		//Return Formulaire with updated information and Sections
		return $this->json(
			$form,
			200,
			[],
			['groups' => 'formulaire:read'],
		);
	}

	/**
	 * Archiver un Formulaire
	 * @method POST
	 * @param JSON - formID 
	 * @return RESPONSE - statusCode
	 */
	#[Route('delete', name: 'delete', methods: ["POST"])]
	public function deleteFormAPI(
		Request $request,
	): Response {

		$data = $request->getContent();
		$data = json_decode($data, true);

		// "Delete" Formulaire by Archiving - Adding a DeletedAt date, still accessible from the DB
		$formulaire = $this->formulaireRepository->find($data['id']);
		$formulaire->setDeletedAt(new \DateTimeImmutable());

		$this->entityManager->persist($formulaire);
		$this->entityManager->flush();

		$response = new Response();
		$response->setStatusCode(200);

		return $response;
	}
}
