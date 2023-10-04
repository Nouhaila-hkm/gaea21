<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\HumansGaea21Messages;
use App\Entity\Magazines;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class HumansGaea21Controller extends AbstractController
{
    /**
     * @Route("/humansGaea21", name="humansGaea21")
     */
    public function homeHumansGaea21()
    {
        return $this->render('gaea21/humansGaea21/home.html.twig');
    }

    /**
     * @Route("/humansGaea21/temoignages", name="humansGaea21Temoignage" )
     */
    public function temoignage()
    {
        return $this->render('gaea21/humansGaea21/temoignage.html.twig');
    }

    /**
     * @Route("/humansGaea21/magazine", name="humansGaea21Magazine" )
     */
    public function magazine()
    {
        return $this->render('gaea21/humansGaea21/magazine.html.twig');
    }

    /**
     * @Route("/humansGaea21/programme", name="humansGaea21Programme" )
     */
    public function programme()
    {
        return $this->render('gaea21/humansGaea21/programme.html.twig');
    }

    /**
     * @Route("/humansGaea21/staff", name="humansGaea21Staff" )
     */
    public function staff()
    {
        return $this->render('gaea21/humansGaea21/staff.html.twig');
    }

    /**
     * @Route("/humansGaea21/alumni", name="humansGaea21Alumni")
     */
    public function alumni()
    {
        return $this->render('gaea21/humansGaea21/alumni.html.twig');
    }

    /**
     * @Route("/humansGaea21/newMessage", name="newMessage")
     */
    public function newMessage(MailerInterface $mailer, ManagerRegistry $doctrine, Request $request)
    {

        $donnerForm = $request->query;
        $message = new HumansGaea21Messages();

        ///Affecter les attributs  
        $message->setNom($donnerForm->get('nom'));
        $message->setPrenom($donnerForm->get('prenom'));
        $message->setEmail($donnerForm->get('mail'));
        $message->setMessage($donnerForm->get('message'));

        ///Envoyer les donnée vers la BD 
        $entityManager = $doctrine->getManager();
        $entityManager->persist($message);
        $entityManager->flush();

        $email = (new Email())
            ->from('massinissa.tighilt@gaea21.org')
            ->to($message->getEmail())
            //->cc('cc@example.com')
            //->bcc('bcc@example.com')
            //->replyTo('fabien@example.com')
            //->priority(Email::PRIORITY_HIGH)
            ->subject('Message reçu')
            ->text('Votre message est bien reçu!')
            ->html('<p>Votre message est bien reçu</p>');

        $mailer->send($email);

        $email = (new Email())
            ->from($message->getEmail())
            ->to('massinissa.tighilt@gaea21.org')
            //->cc('cc@example.com')
            //->bcc('bcc@example.com')
            //->replyTo('fabien@example.com')
            //->priority(Email::PRIORITY_HIGH)
            ->subject('Message reçu')
            ->text('Vous avez reçu un messages')
            ->html('<p>Vous avez reçu un messages</p>');

        $mailer->send($email);

        return $this->redirect('/humansGaea21');
    }

    /**
     * @ROUTE("/humansGaea21/magazine/getMagazine")
     */

    public function getMagazines(ManagerRegistry $doctrine)
    {
        $magazines = $doctrine->getRepository(Magazines::class)->findBy(array(), array('magazineDate' => 'ASC'));

        return $this->json($magazines);
    }
}
