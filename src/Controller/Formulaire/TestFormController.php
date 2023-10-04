<?php

namespace App\Controller\Formulaire;

use App\Entity\FieldGroup;
use App\Entity\Formulaire;
use App\Entity\OptionGroup;
use App\Repository\FieldListeTypeDataRepository;
use App\Repository\FieldRepository;
use App\Repository\FormulaireRepository;
use App\Repository\OptionGroupRepository;
use App\Repository\SectionRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

//TODO DELETE FORMER CODE - Ideas for IMPLEMENTATION OF CONDITIONALS if curious, sorry for the lack of comments
class TestFormController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private FormulaireRepository $formulaireRepository;

    public function __construct(FormulaireRepository $formulaireRepository, EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->formulaireRepository = $formulaireRepository;
    }

    /**
     * @Route("/form/api/add/email/", name ="form_api_add_email", methods={"POST"})
     */
    public function addEmail(
        Request $request,
    ): Response {
        $data = json_decode($request->getContent(), true);
        dump($data);

        $form = $this->formulaireRepository->find($data['formID']);
        if ($data['mail'] == '')
            $form->setEmail(null);
        else
            $form->setEmail($data['mail']);
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
     * @Route("/form/api/delete/field/option", name="form_api_delete_field_option", methods={"POST"})
     */
    public function deleteFieldOptionAPI(
        Request $request,
        FieldListeTypeDataRepository $fieldListTypeDataRepository,
    ): Response {

        $data = json_decode($request->getContent(), true);
        $optionInfo = $data['option'];
        $option = $fieldListTypeDataRepository->find($optionInfo['id']);
        $fieldListTypeDataRepository->remove($option, true);

        $form = $this->formulaireRepository->find($data['formID']);
        return $this->json(
            $form,
            200,
            [],
            ['groups' => 'formulaire:read'],
        );
    }

    /**
     * @Route("/form/api/add/option/group", name ="form_api_add_option_group", methods={"POST"})
     */
    public function addOptionGroup(
        Request $request,
        EntityManagerInterface $entityManager,
        FieldListeTypeDataRepository $fieldListeTypeDataRepository,
        SectionRepository $sectionRepository,
    ): Response {
        $data = json_decode($request->getContent(), true);
        $optionData = $data['option'];
        $optionObject = $fieldListeTypeDataRepository->find($optionData['id']);
        $sectionObject = $sectionRepository->find($data['sectionID']);
        $optionGroup = new OptionGroup;
        $optionGroup->setSection($sectionObject);
        $optionGroup->addOption($optionObject);
        $sectionObject->addOptionGroup($optionGroup);
        $entityManager->persist($optionGroup);
        $entityManager->persist($sectionObject);
        $entityManager->flush();

        // dump($optionObject);
        // dump($sectionObject);
        // $testobject = $sectionObject->getOptionGroups();
        // foreach ($testobject as $key => $value) {
        //     dump($value);
        //     # code...
        // }
        // for 
        // dump($optionGroup);

        $form = $this->formulaireRepository->find($data['formID']);
        return $this->json(
            $form,
            200,
            [],
            ['groups' => 'formulaire:read'],
        );
    }

    /**
     * @Route("/form/api/destroy/option/group", name ="form_api_destroy_option_group", methods={"POST"})
     */
    public function destroyOptionGroup(
        Request $request,
    ): Response {
        $data = json_decode($request->getContent(), true);
        dump($data);

        // $form = $this->formulaireRepository->find($data['formID']);
        return $this->json(
            // $form,
            "works",
            200,
            [],
            ['groups' => 'formulaire:read'],
        );
    }

    /**
     * @Route("/form/api/update/option/group", name ="form_api_update_option_group", methods={"POST"})
     */
    public function updateOptionGroup(
        Request $request,
        EntityManagerInterface $entityManager,
        FieldListeTypeDataRepository $fieldListeTypeDataRepository,
        OptionGroupRepository $optionGroupRepository,
    ): Response {
        $data = json_decode($request->getContent(), true);

        $optionObject = $fieldListeTypeDataRepository->find($data['option']['id']);
        $optionGroup = $optionGroupRepository->find($data['optionGroup']['id']);
        $optionGroup->addOption($optionObject);

        $entityManager->persist($optionGroup);
        $entityManager->flush();
        $form = $this->formulaireRepository->find($data['formID']);

        return $this->json(
            $form,
            200,
            [],
            ['groups' => 'formulaire:read'],
        );
    }

    /**
     * @Route("/form/api/delete/option/group", name ="form_api_delete_option_group", methods={"POST"})
     */
    public function deleteOptionGroup(
        Request $request,
        EntityManagerInterface $entityManager,
        SectionRepository $sectionRepository,
        FieldListeTypeDataRepository $fieldListeTypeDataRepository,
        OptionGroupRepository $optionGroupRepository,
    ): Response {
        $data = json_decode($request->getContent(), true);
        $optionObject = $fieldListeTypeDataRepository->find($data['option']['id']);
        $optionGroup = $optionGroupRepository->find($data['optionGroup']['id']);
        // $groupTrigger = false;
        // dump($data);
        // dump($optionObject);
        // dump($optionGroup);
        $optionGroup->removeOption($optionObject);
        $entityManager->persist($optionGroup);
        if (($optionGroup->getOptions()->count() == 0)) {
            $sectionObject = $sectionRepository->find($data['sectionID']);
            $sectionObject->removeOptionGroup($optionGroup);
            $entityManager->persist($sectionObject);
            $optionGroupRepository->remove($optionGroup);
            // dump("Positive");
        }

        $entityManager->flush();
        $form = $this->formulaireRepository->find($data['formID']);
        return $this->json(
            $form,
            200,
            [],
            ['groups' => 'formulaire:read'],
        );
    }

    /**
     * @Route("/form/api/add/field/group", name ="form_api_add_field_group", methods={"POST"})
     */
    public function addFieldGroup(
        Request $request,
        EntityManagerInterface $entityManager,
        OptionGroupRepository $optionGroupRepository,
        SectionRepository $sectionRepository,
        FieldRepository $fieldRepository,
    ): Response {
        $data = json_decode($request->getContent(), true);
        // dump($data);
        $fieldGroup = null;
        $field = $fieldRepository->find($data['field']['id']);
        $optionGroup = $optionGroupRepository->find($data['optionGroup']['id']);
        if (count($optionGroup->getFieldGroups()) == 0) {
            dump("FieldGroup Empty");
            $sectionObject = $sectionRepository->find($data['sectionID']);
            $fieldGroup = new FieldGroup();
            $fieldGroup->addOptionGroup($optionGroup);
            $fieldGroup->setSection($sectionObject);
            $optionGroup->addFieldGroup($fieldGroup);
            $sectionObject->getFieldGroups($fieldGroup);
        }


        $fieldGroup->addField($field);
        $field->addFieldGroup($fieldGroup);
        $entityManager->persist($fieldGroup);
        $entityManager->persist($optionGroup);
        $entityManager->persist($field);
        $entityManager->persist($sectionObject);
        $entityManager->flush();
        // }else {
        //     $fieldGriyo = 
        // }
        $form = $this->formulaireRepository->find($data['formID']);
        return $this->json(
            $form,
            200,
            [],
            ['groups' => 'formulaire:read'],
        );
    }

    /**
     * @Route("/form/api/update/field/group", name ="form_api_update_field_group", methods={"POST"})
     */
    public function updateFieldGroup(
        Request $request,
    ): Response {
        $data = json_decode($request->getContent(), true);

        $form = $this->formulaireRepository->find($data['formID']);
        return $this->json(
            // $form,
            "works",
            200,
            [],
            ['groups' => 'formulaire:read'],
        );
    }

    /**
     * @Route("/form/api/delete/field/group", name ="form_api_delete_field_group", methods={"POST"})
     */
    public function deleteFieldGroup(
        Request $request,
    ): Response {
        $data = json_decode($request->getContent(), true);
        dump($data);

        $form = $this->formulaireRepository->find($data['formID']);
        return $this->json(
            // $form,
            "works",
            200,
            [],
            ['groups' => 'formulaire:read'],
        );
    }



    //TODO DELETE
    /**
     * Former code, uninteresting, just delete
     */
    /**
     * @Route("/testForms", name="testForms", methods={"POST","GET"})
     */
    public function testForms(): Response
    {
        return $this->render('gaea21/testForms.html.twig', []);
    }

    // a mettre dans FormsController
    /**
     * @Route("/answer/formulaire/{id}", name="answer_formulaire_show", methods={"GET"})
     */
    public function showanswerformulaire(Formulaire $formulaire): Response
    {

        return $this->json($formulaire, 200, [], ['groups' => 'formulaire:answer']);
    }
}
