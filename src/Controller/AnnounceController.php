<?php

namespace App\Controller;

use Dompdf\Dompdf;
use Dompdf\Options;
use App\Entity\Announce;
use App\Entity\AnnounceSection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Constraints\DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AnnounceController extends AbstractController
{
    #[Route('/rh/announce', name: 'listAnnounce')]
    public function index(): Response
    {
        return $this->render('announce/index.html.twig', [
            'controller_name' => 'AnnounceController',
        ]);
    }

    #[Route('/rh/announce/new', name: 'newAnnounce')]
    public function newAnnounce(): Response
    {
        return $this->render('announce/new.html.twig'); 
    }

    #[Route('/rh/announce/edit/{id}', name: 'editAnnounce')]
    public function editAnnounce(Announce $announce): Response
    {
        return $this->render('announce/edit.html.twig', [
            'announce' => $announce,
        ]);
    }

    #[Route('/rh/announce/show/{id}', name: 'annunceShow')]
    public function annunceShow(Announce $announce): Response
    {
        return $this->render('announce/show.html.twig', [
            'announce' => $announce,
        ]);

        
    }

    #[Route("/api/rh/announce/new", name:"newAnnonceRh")]
    public function newAnnonceRh(Request $request, EntityManagerInterface $em)
    {
        $contenu = $request->request->get('objArr');
        $contenuDecode = json_decode($contenu,true);

        if($contenuDecode){
            $user = $this->getUser();

            $title = $contenuDecode['title'];
            $collaborators = $contenuDecode['collaborators'];
            $sections = $contenuDecode['sections'];

            $announce = new Announce();

            //On récupere toutes les sections par nom/prenom
            for($i=0; $i<count($sections); $i++){
                
                $announceSection = 'announceSection'.$i;
                //variable dynamique

                ${$announceSection} = new AnnounceSection();
                if(isset($sections[$i][0]))
                    ${$announceSection}->setTitle($sections[$i][0]);
                if(isset($sections[$i][1]))
                    ${$announceSection}->setContent($sections[$i][1]);

                $em->persist(${$announceSection});

                $announce->addAnnounceSection(${$announceSection});

            }


            //initiales user, initiales collaborateurs, +001
            $reference = $user->getFirstName()[0].$user->getLastName()[0];

            for($i=0; $i<count($collaborators); $i++){
                $reference .= $collaborators[$i][0][0]; //On rajoute l'initial du prenom
                $reference .= $collaborators[$i][1][0]; //On rajoute l'initial du nom
            }

            $reference .= "001";

            $announce->setReference(strtoupper($reference));
            $announce->setCreatedDate(new \DateTime());

            $announce->setTitle($title);
            $announce->setCollaborators($collaborators);

            $user->addAnnounce($announce);

            $em->persist($announce);
            $em->persist($user);

            $em->flush();
        
            return $this->json(['status'=> 200,'message' => "Annonce enregistrée"]);
        }
        return $this->json(['status'=> 404,'message' => "L'annonce n'a pas pût être enregistrée"]);
    }

    #[Route("/api/rh/announce/edit/{id}", name:"editAnnonceRh")]
    public function editAnnonceRh(Request $request, EntityManagerInterface $em, Announce $announce)
    {
        $contenu = $request->request->get('objArr');
        $contenuDecode = json_decode($contenu,true);

        if($contenuDecode && $announce){
            //Ressortir l'annonce concernée et appliquer les modifs title, collaborators, sections, date modif, reference.

            $user = $this->getUser();

            $title = $contenuDecode['title'];
            $collaborators = $contenuDecode['collaborators'];
            $sections = $contenuDecode['sections'];

            //On vide l'ancien tableau de sections
            foreach($announce->getAnnounceSections() as &$announceSectionVal){
                $announce->removeAnnounceSection($announceSectionVal);
            }


            //On remplit le nouveau tableau de sections
            for($i=0; $i<count($sections); $i++){
                
                $announceSection = 'announceSection'.$i;
                //variable dynamique

                ${$announceSection} = new AnnounceSection();
                if(isset($sections[$i][0]))
                    ${$announceSection}->setTitle($sections[$i][0]);
                else
                    ${$announceSection}->setTitle("");
                if(isset($sections[$i][1]))
                    ${$announceSection}->setContent($sections[$i][1]);
                else
                    ${$announceSection}->setContent("");

                $em->persist(${$announceSection});

                $announce->addAnnounceSection(${$announceSection});
            }

                $announce->setTitle($title);
                $announce->setCollaborators($collaborators);

                $reference = $user->getFirstName()[0].$user->getLastName()[0];

                for($i=0; $i<count($collaborators); $i++){
                    $reference .= $collaborators[$i][0][0]; //On rajoute l'initial du prenom
                    $reference .= $collaborators[$i][1][0]; //On rajoute l'initial du nom
                }

                $referenceNumber = intval(substr($announce->getReference(), -3, 3));
                $referenceNumber++;
                
                $referenceNumberFormatage = str_pad((string)$referenceNumber,3,"0", STR_PAD_LEFT); //formatage avec 0 pour faire un nombre de 3
                $reference .= $referenceNumberFormatage;
                $announce->setReference(strtoupper($reference));

                $announce->setUpdatedDate(new \DateTime());

                
                $em->persist($announce);
                $em->flush();

                return $this->json(['status'=> 200,'message' => "Annonce modifiée"]);
            }
            return $this->json(['status'=> 404,'message' => "L'annonce n'a pas pût être modifiée"]);
    }

    #[Route("/rh/announce/delete/{id}", name:"deleteAnnonce")]
    public function deleteAnnonce(Request $request, EntityManagerInterface $em, Announce $announce)
    {
        $em->remove($announce);
        $em->flush();

        return $this->redirectToRoute("listAnnounce");
    }

    #[Route("/api/rh/announce/generatePdf/{id}", name:"pdfGenerator")]
    public function pdfGenerator(Announce $announce)
    {
        $html = $this->renderView('announce/pdf.html.twig', [
            'announce' => $announce,
        ]);

        $pdfOptions = new Options();
        $pdfOptions->set('defaultFont', 'Calibri');
        $pdfOptions->setIsRemoteEnabled(true);
        $dompdf = new Dompdf($pdfOptions);

        $dompdf->loadHtml($html);

        $dompdf->setPaper('A4', 'portrait');
         
        $dompdf->render();

        return new Response ($dompdf->stream("announceRH.pdf", [
            "Attachment" => true
        ]));
    }
}

