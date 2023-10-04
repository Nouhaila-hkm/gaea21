<?php

namespace App\Controller\Formulaire;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\Common\Collections\ArrayCollection;
use App\Entity\FormData;
use App\Entity\MappedFormData;
use App\Repository\ProjetRepository;
use App\Service\Form\FormMailer;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\FieldRepository;
use App\Repository\FormulaireRepository;

/**
 * FormulaireExecutable - Execute des actions sur un Formulaire après une intéraction avec un Utilisateur
 *    [ SimpleFormulaireReader]
 */
#[Route('/form', name: 'form_')]
class FormulaireExecutable extends AbstractController
{
	//Repositories utilisée par FormulaireExecutable + FormMailer Service
	private EntityManagerInterface $entityManagerInterface;
	private FormulaireRepository $formulaireRepository;
	private FieldRepository $fieldRepository;
	private ProjetRepository $projetRepository;
	private FormMailer $formMailer;

	public function __construct(
		FormulaireRepository $formulaireRepository,
		FieldRepository $fieldRepository,
		EntityManagerInterface $entityManagerInterface,
		ProjetRepository $projetRepository,
		FormMailer $formMailer,

	) {
		$this->entityManagerInterface = $entityManagerInterface;
		$this->formulaireRepository = $formulaireRepository;
		$this->fieldRepository = $fieldRepository;
		$this->projetRepository = $projetRepository;
		$this->formMailer = $formMailer;
	}

	//TODO FIX IT
	/**
	 * Retourner les réponses d'un Fomulaire Simple (pas de MDP) entrées par l'utilisateur après le traitement de ceux-ci
	 * 	càd - entrées en BDD puis l'email de confirmation envoyé aux personnes intéréssées
	 * Les informations retournées sont ratachées au groupe
	 *  {formConfirm:read}
	 * @method POST
	 * @param JSON - data[] + formID 
	 * @return JSON FormData
	 */
	#[Route('/reader/readForm', name: 'read_form', methods: ['POST'])]
	public function simpleFormulaireReader(
		Request $request
	): Response {
		$data = json_decode($request->getContent(), true);
		// dump($data);

		$response = new ArrayCollection();
		$userMail = null;
		$userName = '';

		$userResponse = $data['data'];
		$form = $this->formulaireRepository->find($data['formID']);
		$formData = new FormData;
		$formData->setCreatedAt(new \DateTimeImmutable());
		$project = null;

		//TODO if user is connected
		// $user = $userRepository->find($userID);		
		// $formData->setUserLinked($user);
		// $user->addFormData($formData);
		//$this->entityManagerInterface->persist($user);

		foreach ($userResponse as $fieldID => $answer) {
			$field = $this->fieldRepository->find($fieldID);

			$mappedFormData = new MappedFormData;
			$mappedFormData->setAnswer($answer);
			$mappedFormData->setField($field);
			$mappedFormData->setForm($form);
			$mappedFormData->setData($formData);

			// If of Field->Type 'email' use as userMail
			if (strtolower($field->getType()->getTypeName()) == 'email') {
				$userMail = $answer;
			}
			// If of Field->Type 'projet' find Projet and link it to FormData
			if (strtolower($field->getType()->getTypeName()) == 'projet') {
				$project = $this->projetRepository->findOneBy(array('projectName' => $answer));
				if ($project != null) {
					$formData
						->setLinkedProject($project);
				}
			}
			// Create userName if field matches conditions
			if (
				strtolower($field->getLabel()) == 'nom'
				|| strtolower($field->getLabel()) == 'prénom'
				|| strtolower($field->getLabel()) == 'pseudo'
			) {
				$userName .= ' ' . $answer;
			}

			$formData->addMappedFormData($mappedFormData);
			$form->addMappedFormData($mappedFormData);
			$field->addMappedFormData($mappedFormData);

			//TODO - Should Dissapear
			$response->add($mappedFormData);

			$this->entityManagerInterface->persist($mappedFormData);
			$this->entityManagerInterface->persist($formData);
			$this->entityManagerInterface->persist($form);
			$this->entityManagerInterface->persist($field);
		}

		//TODO CLEAN UP MAILER
		// IF PARTENARIAT
		// TO MODERATORS
		if ($form->getFormName() == 'Partenariat') {
			$this->formMailer->exeFormToMail($response, $userMail, $form->getFormName(), $userName, $project->getEmail(), true);
		} else {
			if ($project != null)
				$this->formMailer->exeFormToMail($response, $userMail, $form->getFormName(), $userName, $project->getEmail());
			else
				$this->formMailer->exeFormToMail($response, $userMail, $form->getFormName(), $userName);
		}
		$this->entityManagerInterface->flush();

		//TODO Response should be FormData now, and get it all fixed etc.
		return $this->json(
			$response,
			200,
			[],
			['groups' => 'formConfirm:read'],
		);
	}
}
