import React from 'react';
import ReactDOM from 'react-dom';
import ModalModele from '../Modal/ModalModele.jsx';
import apcd from '/public/images/QuiSommesNous/modele/apcd.png'
import pdca from '/public/images/QuiSommesNous/modele/pdca.svg'
import KnowMore from '/public/images/QuiSommesNous/modele/knowmore.png'
import '../../../../public/style/sass/quiSommesNous/modele/gestion_projet.scss'


const container1 = document.getElementById('ModalModele1');
const container2 = document.getElementById('ModalModele2');
const container3 = document.getElementById('ModalModele3');
const container4 = document.getElementById('ModalModele4');
const container5 = document.getElementById('ModalModele5');
const container6 = document.getElementById('ModalModele6');
const container7= document.getElementById('ModalModele7');
const container8 = document.getElementById('ModalModele8');
const container9 = document.getElementById('ModalModele9');
const container10 = document.getElementById('ModalModele10');

const tscText = 
    <>
                <p className='text_modal'>
                    Ce tableau permet de suivre le parcours du nouveau collaborateur, son contexte de recrutement,
                    ses projets et ses objectifs au sein de gaea21. Les ressources humaines y notent tout d’abord les
                    projets professionnels, les expériences académiques et professionnelles du nouveau collaborateur.
                    Le coordinateur valide le projet et les compétences du collaborateur.
                    Lors du premier entretien avec le président, il sera analysé et défini les compétences,
                    le plan carrière du collaborateur : des projets seront attribués par le président
                    qui choisira le coordinateur projet, chargé de l’intégration de la nouvelle recrue.
                    Chez gaea21, le coordinateur est une personne indispensable à l’association car il a pour
                    tâche d’encadrer le travail du nouveau collaborateur, de l’accueillir, de lui présenter son
                    projet en l’initiant aux outils de gestion de projets et de management.
                    Le but du coordinateur est d’aider le nouveau collaborateur à réaliser ses objectifs personnels
                    et professionnels les plus ambitieux au sein de l’association.
                </p>

                <p className='text_modal'>
                    A l’aide du TSC reçu par mail, tout juste après la première séance d’accueil avec le président,
                    le coordinateur prépare un second entretien appelé “la séance d’accueil projet”.
                    Il aura d’une part à identifier ses compétences nécessaires, et d’autre part,
                    à assurer le suivi des avancements du (ou des) projets(s), le soutien et l’accompagnement
                    individuel des membres de son équipe, la planification et l’organisation des activités
                    hebdomadaires et quotidiennes de son équipe, au moyen d’outils de gestion de projets
                    et de management.
                </p>

                <p className='text_modal'>
                    Après sa phase d’intégration, le collaborateur a pour mission de suivre les directives
                    de son coordinateur de projets et de présenter en temps voulu chaque livrable du projet.
                    En plus des outils de gestion personnels, le collaborateur aura à compléter chaque semaine
                    la troisième partie de son TSC,  le tableau des tâches, une to do list pour pouvoir évaluer
                    les tâches à réaliser durant la semaine courante. Ce tableau est utile pour le collaborateur
                    car il permet de rédiger un rapport de fin de stage.Finalement, le TSC est un outil indispensable
                    à l’association car il permet de connaître en un coup d’œil le parcours, les réalisations
                    du collaborateur et ses accomplissements tout au long de son stage au sein de l’association gaea.
                </p>
    </>

const compText =

    <>
        <p className='text_modal'>
            Ce tableau permet de choisir les métiers gaea21 correspondant au profil carrière du collaborateur.
            Il comprend deux parties: l’une une fiche métier qui répertorie tous les métiers possibles par département
            et l’autre une liste de compétences par métier.
        </p>

        <p className='text_modal'>
             Chez gaea21, la communication est indispensable à la bonne marche de l’association,
             le coordinateur est un bon communicant, facilitant l’accomplissement des étapes du projet.
             Durant la phase d’intégration, le coordinateur échangera avec le collaborateur pour identifier
             les connaissances et compétences nécessaires au projet.
             Il sélectionnera le niveau de métier - faible, moyen ou fort, pour déterminer le métier que le nouveau
             collaborateur exercera chez gaea21, les connaissances et compétences utiles pour réaliser le projet attribué.
        </p>
    </>

const charge =

    <>
        <p className='text_modal'>
            Il est complémentaire au modèle de collaboration, le cahier des charges spécifiques indique
            de manière plus précise les tâches que le collaborateur aura à effectuer,
            à savoir le nom du (ou des) projet(s), le type et le temps de séance,
            le temps de travail réelle et le temps consacré à la gestion des outils.
        </p>
    </>

const team =

    <>
        <p className='text_modal'>
            Ce tableau permet au coordinateur de prendre connaissance des projets,
            compétences et réalisations de chaque membre de l’équipe.
            Il permet d’identifier les points forts et atouts de chacun dans le projet pour pouvoir attribuer
            leurs tâches correspondant à leur centre d’intérêt, leur domaine de recherche, de spécialisation
            et/ou d’expertise.
        </p>
    </>

const summary =

    <>
        <p className='text_modal'>
            Tout comme un CV, il présente globalement et de manière concise le résumé du projet,
            ses objectifs, ses étapes, ses stratégies et son impact au plan social, environnemental,
            économique. Il doit donner l’envie de participer, de s’investir dans le projet ou tout simplement
            de lire le business plan du projet. Il est généralement présenté à un investisseur financier hors Gaea.
            L’executive summary est nécessaire à la mise en place du Gantt.
        </p>
    </>

const gantt =

    <>
        <p className='text_modal'>
            Un outil de pilotage de projet qui permet d’ordonnancer les différentes tâches à effectuer dans
            le temps, de connaître le timing de toutes les opérations et de prévenir leurs chevauchements.
            Le coordinateur peut à la fois suivre les avancements ou blocages du projet par étape ainsi que
            les tâches de chaque membre de l’équipe.
        </p>
    </>

const activite =

    <>
        <p className='text_modal'>
            Chaque semaine la qualité de travail du collaborateur est évaluée par un système de notation.
            Le collaborateur y inscrit les nouvelles tâches communiquées par le coordinateur qui lui transmet
            ses nouvelles tâches, ses objectifs, sa méthode de travail à adopter, selon des critères d’évaluation
            liés au métier qu’il aura à exercer chez Gaea, entre autres, la valorisation du travail,
            l’intérêt du travail, l’implication, le respect des règles et de la culture, le sens des responsabilités
            et son contenu. Par la suite, en fonction de ces critères, le coordinateur identifiera les compétences
            acquises, atteintes et non-atteintes, les points d’amélioration de chaque collaborateur de sorte à ce
            que le collaborateur puisse semaine après semaine se perfectionner.
        </p>
    </>

const hebdo =

    <>
        <p className='text_modal'>
            Chaque semaine, les jeudis avant midi, le président et l’équipe formation interne reçoivent des
            coordinateurs ce document qui présente synthétiquement les avancées du projet,
            les réalisations par équipe et qui peut rapidement faciliter l’identification des
            performances de chaque équipe.
        </p>
    </>

const log =

    <>
        <p className='text_modal'>
            chaque semaine, le coordinateur reçoit le document qui lui permet d’évaluer chaque membre de l’équipe,
            d’une part les performances, c’est-à-dire, le rapport entre les ressources employées et la réussite
            ou la mesure du degré de perception des membres de l’équipe et la réussite, et d’autre part,
            leur productivité, autrement dit la capacité à produire plus ou le rapport entre les ressources
            utilisées et la production. Les tâches sont réparties selon les objectifs du Gantt et les consignes
            du président données durant les réunions bimensuelles d’équipe.
        </p>
    </>
    
const textApcd =

    <>
        <p className='text_modal'>
            La méthode PDCA signifie <b>« Plan Do Check Act »</b>, ce qui peut se traduire en français
            par <b>Planifier, Déployer, Contrôler, Agir</b>.Ces quatre phases forment un cycle vertueux
            dit«Roue de Deming ».
        </p>

        <p className='text_modal'>
            Elle est donc fondée sur le principe de répétition.
            Comme un cercle qui n’a pas de fin, le cycle PDCA doit être répété constamment
            dans une recherche d’amélioration continue.
        </p>
    </> 

ReactDOM.render(
    <ModalModele 
    title="TSC (tableau suivi collaborateur)"
    height='90%'
    width='70%'
    class='hidden'
    img={KnowMore}
    text={tscText}
    />, container1);

ReactDOM.render(
    <ModalModele
        title="Tableau de compétences métier"
        text={compText}
        class='hidden'
        width='70%'
        img={KnowMore}
    />, container2);

ReactDOM.render(
    <ModalModele
        title="Cahier des charges spécifiques"
        text={charge}
        class='hidden'
        width='70%'
        img={KnowMore}
    />, container3);

ReactDOM.render(
    <ModalModele
        title="Tableau de suivi des équipes"
        text={team}
        class='hidden'
        width='70%'
        img={KnowMore}
    />, container4);

ReactDOM.render(
    <ModalModele
        title="Executive summary"
        text={summary}
        class='hidden'
        width='70%'
        img={KnowMore}
    />, container5);

ReactDOM.render(
    <ModalModele
        title="Gantt"
        text={gantt}
        class='hidden'
        width='70%'
        img={KnowMore}
    />, container6);

ReactDOM.render(
    <ModalModele
        title="Rapport d’activités"
        text={activite}
        class='hidden'
        width='70%'
        img={KnowMore}
    />, container7);

ReactDOM.render(
    <ModalModele
        title="Rapport hebdomadaire"
        text={hebdo}
        class='hidden'
        width='70%'
        img={KnowMore}
    />, container8);

ReactDOM.render(
    <ModalModele
        title="Action log"
        text={log}
        class='hidden'
        width='70%'
        img={KnowMore}
    />, container9);

ReactDOM.render(
    <ModalModele
        title="Méthode PDCA :"
        text={textApcd}
        source={apcd}
        width='80%'
        height='60%'
        class='modele_img'
        img={pdca}
    />, container10);