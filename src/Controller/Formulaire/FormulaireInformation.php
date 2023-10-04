<?php

namespace App\Controller\Formulaire;

use App\Repository\FormulaireRepository;
use App\Repository\FormDataRepository;
use App\Repository\ProjetRepository;
use App\Repository\TypeRepository;
use App\Service\Form\FormDataHelper;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * FormulaireInformation - Donne des informations liées au Formulaire pour le Backend/Dashboard de celui-ci
 *    [ListeFormulaires, SingleFormulaire, ListeFieldTypes, ListeProjets, ListeFormDatas, FilterFormDatas]
 */
#[Route('/form/api', name: 'form_api_')]
class FormulaireInformation extends AbstractController
{
    //Repositories utilisée par FormulaireInformation + FormDataHelper Servoce
    private FormulaireRepository $formulaireRepository;
    private TypeRepository $typeRepository;
    private FormDataRepository $formDataRepository;
    private ProjetRepository $projetRepository;
    private FormDataHelper $formDataHelper;

    public function __construct(
        FormulaireRepository $formulaireRepository,
        TypeRepository $typeRepository,
        FormDataRepository $formDataRepository,
        ProjetRepository $projetRepository,
        FormDataHelper $formDataHelper,
    ) {
        $this->formulaireRepository = $formulaireRepository;
        $this->typeRepository = $typeRepository;
        $this->formDataRepository = $formDataRepository;
        $this->projetRepository = $projetRepository;
        $this->formDataHelper = $formDataHelper;
    }

    /**
     * Retourner la liste de tout les Formulaires de la bases de données
     * Les informations retournées sont ratachées au groupe
     *  {formulaire:read}
     * @method GET
     * @return JSON Formulaire[]
     */
    #[Route('/list', name: 'list', methods: ["GET"])]
    public function listForms(): Response
    {
        $forms = $this->formulaireRepository->findAll();

        if (!$forms) {
            return $this
                ->json([
                    'code' => 404,
                    'data' => "Formulaire list could not be found"
                ], 404);
        }
        return $this->json(
            $forms,
            200,
            [],
            ['groups' => 'formulaire:read']
        );
    }

    /**
     * Retourne un Formulaire par son formName ou id 
     * Les informations retournées sont ratachées au groupe
     *  {formulaire:read}
     * @method POST
     * @param JSON (formID ||formName)
     * @return JSON Formulaire
     */
    #[Route('/info/', name: 'info', methods: ["POST"])]
    public function showForm(Request $request,): Response
    {
        $data = json_decode($request->getContent(), true);
        // S'il y'a une ID on l'utilise sinon il y'a le formName
        if (isset($data['id']))
            $form = $this->formulaireRepository->find($data['id']);
        else
            $form = $this->formulaireRepository->findOneBy(array('formName' => $data['formName']));

        if (!$form) {
            return $this
                ->json([
                    'code' => 404,
                    'data' => "Formulaire could not be found"
                ], 404);
        }
        return $this->json(
            $form,
            200,
            [],
            ['groups' => 'formulaire:read'],
        );
    }

    /**
     * Retourner la liste de tout les Types (Field Types) de la bases de données
     * Les informations retournées sont ratachées au groupes
     *  {formulaire:read}
     * @method GET
     * @return JSON Type[]
     */
    #[Route('/formTypes', name: 'field_types', methods: ["GET"])]
    public function listFieldTypes(): Response
    {
        $types = $this->typeRepository->findAll();

        if (!$types) {
            return $this
                ->json([
                    'code' => 404,
                    'data' => "Field Type list could not be found"
                ], 404);
        }
        return $this->json(
            $types,
            200,
            [],
            ['groups' => 'formulaire:read'],
        );
    }

    /**
     * Retourner la liste de tout les Projets de la bases de données
     * TODO - Celui-ci devrait être placer dans le Controller pour Projet
     * Les informations retournées sont ratachées au groupe
     *  {projet:read}
     * @method GET
     * @return JSON Projet[]
     */
    #[Route('/project', name: 'project', methods: ["GET"])]
    public function listProjets(): Response
    {
        $projets = $this->projetRepository->findAll();

        if (!$projets) {
            return $this
                ->json([
                    'code' => 404,
                    'data' => "Project list could not be found"
                ], 404);
        }
        return $this->json(
            $projets,
            200,
            [],
            ['groups' => 'projet:read'],
        );
    }

    /**
     * Retourner la liste de tout les FormDatas de la BDD
     * Les informations retournées sont ratachées au groupe
     *  {formData:read}
     * @method GET
     * @return JSON FormData[]
     */
    #[Route('/data', name: 'data_list', methods: ["GET"])]
    public function listFormDatas(): Response
    {
        $formDatas = $this->formDataRepository->findAll();

        if (!$formDatas) {
            return $this
                ->json([
                    'code' => 404,
                    'data' => "FormData list could not be found."
                ], 404);
        }
        return $this->json(
            $formDatas,
            200,
            [],
            ['groups' => 'formData:read']
        );
    }

    /**
     * Filtre les FormDatas par rapport aux options
     * @method POST
     * @param JSON - options['formType','project','sortOrder','search'}
     * @return JSON FormDatas[]
     */
    #[Route('/data/filter', name: 'data_filter', methods: ["POST"])]
    public function filterFormDatas(
        Request $request
    ): Response {

        $data = json_decode($request->getContent(), true);
        $options = $data['options'];
        // Use the filter to get list of FormDatas that fit the criteria of the search based on @param with default options in Service
        $response = $this->formDataHelper->filterData($options);
        return $this->json(
            $response,
            200,
            [],
            ['groups' => 'formData:read'],
        );
    }
}
