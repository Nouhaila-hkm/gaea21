<?php

namespace App\Service\Form;

use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;

class FormMailer
{
  private MailerInterface $mailer;

  public function __construct(MailerInterface $mailer)
  {
    $this->mailer = $mailer;
  }

  public function sendMail($email)
  {
    $email->from('contact@sustlivprogram.org');
    $this->mailer->send($email);
  }

  public function exeFormToMail(
    ArrayCollection $data,
    String $userMail = null,
    String $formName,
    String $userName,
    String $moderatorMails = 'sean.ephraim@gaea21.org',
    bool $partenariat = false,
    //TODO String $moderatorMails = 'yvan.claude@gaea21.org'
  ) {
    if ($userMail != null) {
      if ($userMail != '')
        $this->userMailer($userMail, $data, $formName, $userName);
      else
        $this->userMailer($userMail, $data, $formName);
    }
    $mails = explode(",", $moderatorMails);
    foreach ($mails as  $modMail) {
      // $this->moderatorMailer($modMail, $data, $formName);
    }
    if ($partenariat) {
      dump('partenariat@gaea21.org');
      // $this->moderatorMailer('partenariat@gaea21.org', $data, $formName);
    }
    dump("Mail Yvan - yvan.claude@gaea21.org");
    // $this->moderatorMailer('yvan.claude@gaea21.org', $data, $formName);
  }

  public function userMailer(
    String $userMail,
    ArrayCollection $data,
    String $formName,
    String $userName = null
  ) {
    $email = (new TemplatedEmail())
      ->to($userMail)
      ->subject('gaea21 vous remercie')
      ->htmlTemplate('emails/form/responseUser.html.twig')
      ->context([
        'datas' => $data,
        'formName' => $formName,
        'name' => $userName,
      ]);
    $this->sendMail($email);
  }

  public function moderatorMailer(String $modoMail, ArrayCollection $data, String $formName)
  {
    $email = (new TemplatedEmail())
      ->to($modoMail)
      ->subject('Site Web gaea21 - Formulaire renseigné')
      ->htmlTemplate('emails/form/responseModo.html.twig')
      ->context([
        'datas' => $data,
        'formName' => $formName,
        'name' => null,
      ]);
    $this->sendMail($email);
  }
}
