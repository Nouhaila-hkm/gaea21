<?php

namespace App\Controller;

use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\NewsletterSubscriber;
use Monolog\DateTimeImmutable;
use Symfony\Component\HttpFoundation\RedirectResponse;
use App\Service\Validate;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use App\Entity\Comment;
use App\Repository\NewsletterSubscriberRepository;
use App\Repository\CommentRepository;


class NewsletterController extends AbstractController
{
   
    /**
     * @Route("/newsletter", name="app_newsletter")
     */
    public function index(NewsletterSubscriberRepository $subscriberRepository, CommentRepository $commentRepository)
    {

        $comments = $commentRepository->findAll();
        // dd($comments);

       
       
        return $this->render('newsletter/index.html.twig', [
            'subscribers' => count($subscriberRepository->findAll()),
            'comments' => $commentRepository->findAll(),
        ]);
    }



   
    /**
 * @Route("/subscribe", name="app_subscribe")
 * @param Request $request
 * @param Validate $valService
 * @return RedirectResponse|Response
 */
    public function subscribe(Request $request, Validate $valService, MailerInterface $mailer, EntityManagerInterface $em): Response
    {

        // recuperation email et affichage message confirmation
       
        $subscriber = new NewsletterSubscriber();
        $email = $request->get("email");
        $validated = $valService->isValid($email);
        $alreadySubscribed = $em->getRepository(NewsletterSubscriber::class)->findOneByEmail($email);
        if($alreadySubscribed) {
            $this->addFlash(
                'error', 'Vous êtes déjà inscrit avec cette adresse email : ' . $email
            );

            // return $this->redirectToRoute("app_newsletter");
            return $this->redirect($this->generateUrl('app_newsletter').'#section-newsletter');
        }

        if($validated) {
            // envoie mail avec le token
            $confirmation_token = $this->str_random(60);
            $subscriber->setEmail($email);
            $subscriber->setConfirmationtoken($confirmation_token);
            $em->persist($subscriber);
            // dd($subscriber);
            // $em->flush();
            

            $confirmationUrl = $this->generateUrl('register_subscriber', ['token' => $confirmation_token, 'email' => $email], UrlGeneratorInterface::ABSOLUTE_URL);
         
   

             $message = (new TemplatedEmail())
                ->from('contact@sustlivprogram.org')
                ->to($email)
                ->subject('Newsletter gaea21!')
                // ->text("Veuillez confirmer votre inscription à la newsletter de gaea21 en cliquant sur ce lien : " . $confirmationUrl, 'text/html')
                // ->html("<p>Veuillez confirmer votre inscription à la newsletter de gaea21 en cliquant sur ce lien : </p> <br/> <a href='$confirmationUrl'> S'inscrire à la newsletter </a> <br/> Ou copiez le lien suivant: $confirmation_token" ,'text/html');
                ->htmlTemplate('emails/newsletter/newsletter.html.twig')
                ->context(['confirmationUrl' => $confirmationUrl]);
   
             $mailer->send($message);

                $this->addFlash(
                'notice', 'Vous allez recevoir un lien de validation sur votre boîte mail : ' . $email
            );

            // return $this->redirectToRoute("app_newsletter");
            return $this->redirect($this->generateUrl('app_newsletter').'#section-newsletter');
        } else {
            $this->addFlash(
                'notice', 'Adresse mail pas valide'
            );
            // return $this->redirectToRoute("app_newsletter");
            return $this->redirect($this->generateUrl('app_newsletter').'#section-newsletter');
        }
       

    }

    public function str_random($length)
    {
        $alphabet = "0123456789azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN";
        return substr(str_shuffle(str_repeat($alphabet, $length)), 0, $length);
    }



     /**
     * @Route("/register_subscriber/{token}-{email}", name="register_subscriber")
     *
     */
    public function registerSubscriber(string $token, string $email, EntityManagerInterface $em){
        //le lien de validation par mail redirige user vers cette fonction

        $subscriber = new NewsletterSubscriber();
        $subscriber->setEmail($email);
        $subscriber->setConfirmationtoken($token);
        
        $now = new DateTimeImmutable(false);
        $subscriber->setSubscribedAt($now);
        $em->persist($subscriber);
        $em->flush();
      
        $this->addFlash(
            'notice', 'Vous vous êtes bien souscrit à la Newsletter de gaea21!'
        );

        // return $this->redirectToRoute("app_newsletter");
        return $this->redirect($this->generateUrl('app_newsletter').'#section-newsletter');
    }


 /**
     * @Route("/unsubscribe", name="unsubscribe_url")
     *
     */
    public function urlUnsubscribe () {


        $unsubscribe_token = $this->str_random(60);
        $email = "toma@mail.com";
        
        $unsubscribeUrl = $this->generateUrl('unsubscribe', ['email' => $email, 'token' => $unsubscribe_token], UrlGeneratorInterface::ABSOLUTE_URL);
        dd($unsubscribeUrl);
    }



    /**
     * @Route("/unsubscribe/{email}-{token}", name="unsubscribe")
     *
     */
    public function unsubscribe(string $email, string $token, EntityManagerInterface $em){

        $subscriber = $em->getRepository(NewsletterSubscriber::class)->findOneByEmail($email);
        $unsubscribedtoken = $subscriber->setUnsubscribedToken($token);
        // dd($subscriber);
        if (!empty($unsubscribedtoken)) {
            $em->remove($subscriber);
            $em->flush();
        return $this->redirectToRoute("app_newsletter"); 
        }
       

    }

   /**
     * @Route("/comment", name="comment")
     *
     */
    public function sendComment(Request $request, MailerInterface $mailer, EntityManagerInterface $em){

        $email = $request->get("email");
        $firstname = $request->get("firstname");
        $message = $request->get("message");

        $comment = new Comment();
        $comment->setFirstname($firstname);
        $comment->setEmail($email);
        $comment->setMessage($message);
        $em->persist($comment);


        // $deleteUrl = $this->generateUrl('delete_comment', ['id' => $id], UrlGeneratorInterface::ABSOLUTE_URL);
        // $validationUrl = $this->generateUrl('validate_comment', ['id' => $id], UrlGeneratorInterface::ABSOLUTE_URL);
        

        $mail = (new Email())
                ->from($email)
                ->to('avis@gaea21.org')
                ->subject('Vous avez un nouveau commentaire!')
                ->text($message, 'text/html')
                ->html("<p>Vous avez un nouveau commentaire de $firstname ($email) sur le site de gaea21: </p><br> $message <br><br> Vous pouvez le  <button href=''> supprimer</button> ou <button href=''> valider</button>");

        $mailer->send($mail);

     
        $em->flush();



        $this->addFlash(
            'comment', 'Votre message à été bien envoyé!'
        );

        return $this->redirectToRoute("app_newsletter"); // à modifier pour redirect à la même section de la page
    }
}
