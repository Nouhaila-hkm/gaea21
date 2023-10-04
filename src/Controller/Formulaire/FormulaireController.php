<?php

namespace App\Controller\Formulaire;

use App\Repository\FormulaireRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * Formulaire Controller - Créer les pages liées au Formulaire
 *    [ListeFormulaires, ListeFormDatas, SingleFormulaireEdit, SingleProjetFormulaireBuild ]
 */
#[Route('/form', name: 'form_')]
class FormulaireController extends AbstractController
{
    //Repositories utilisée par Formulaire Controller
    private FormulaireRepository $formulaireRepository;

    public function __construct(
        FormulaireRepository $formulaireRepository,
    ) {
        $this->formulaireRepository = $formulaireRepository;
    }

    /**
     * Retourner un render de la liste de tout les Formulaires de la bases de données pour la Dashboard
     * @method GET
     * @return Response Twig -  Formulaire[]
     */
    #[Route('/list', name: 'list', methods: ['GET'])]
    public function indexFormulaires(): Response
    {
        return $this->render('formulaires/dashboard/index.html.twig', []);
    }

    /**
     * Retourner un render de la liste de tout les FormDatas de la bases de données pour la Dashboard
     * @method GET
     * @return Response Twig - FormData[]
     */
    #[Route('/data/list/', name: 'data_list', methods: ['GET'])]
    public function indexFormDatas(): Response
    {
        return $this->render('formulaires/data/index.html.twig', []);
    }

    /**
     * Retourner un render d'un Formulaire par son id pour éditer
     * @method GET
     * @param id
     * @return Response Twig render - Formulaire
     */
    #[Route('/edit/{id}', name: 'edit', methods: ['GET'])]
    public function editFormulaire(
        $id,
    ): Response {
        $formName = $this->formulaireRepository->find($id)->getFormName();
        return $this->render('formulaires/dashboard/edit.html.twig', [
            'id' => $id,
            'form_name' => $formName
        ]);
    }

    /**
     * Retourner un render d'un Formulaire par son nom pour le client
     * TODO - Faire que la méthode utilisée soit POST pour avoir un URL plus propre
     *  modifié comment c'est implémenter dans les pages projets
     * @method GET
     * @param formName, projectName
     * @return Response Twig render - Formulaire
     */
    #[Route('/build/{formInfo}/{projet}', name: 'build_projet', methods: ['GET'])]
    public function renderProjetFormulaire($formInfo, $projet): Response
    {
        $form = $this->formulaireRepository->findOneBy(array('formName' => $formInfo));
        if ($form == null) {
            // Si aucun Formulaire trouver, retourner le Formulaire Contact par défaut
            $form = $this->formulaireRepository->findOneBy(array('formName' => "Contact"));
        }
        $formName = $form->getFormName();
        $formID = $form->getId();
        return $this->render('formulaires/build/projetFormulaire.html.twig', [
            'id' => $formID,
            'form_name' => $formName,
            'form_title' => $formName . ' - ' . $projet,
            'projet' => $projet
        ]);
    }

    /**
     * Retourner un render d'un Formulaire par son nom pour le client
     * TODO - Faire que la méthode utilisée soit POST pour avoir un URL plus propre
     *  modifié comment c'est implémenter dans les pages projets
     * @method GET
     * @param formName
     * @return Response Twig render - Formulaire
     */
    #[Route('/build/{formInfo}/', name: 'build', methods: ['GET'])]
    public function renderFormulaire($formInfo): Response
    {
        $form = $this->formulaireRepository->findOneBy(array('formName' => $formInfo));
        if ($form == null) {
            // Si aucun Formulaire trouver, retourner le Formulaire Contact par défaut
            $form = $this->formulaireRepository->findOneBy(array('formName' => "Contact"));
        }
        $formName = $form->getLabel();
        $formID = $form->getId();
        return $this->render('formulaires/build/projetFormulaire.html.twig', [
            'id' => $formID,
            'form_name' => $formName,
            'form_title' => $formName,
        ]);
    }
}
