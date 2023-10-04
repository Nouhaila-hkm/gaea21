<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Mime\Email;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use phpDocumentor\Reflection\DocBlock\Tags\Method;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class UserController extends AbstractController
{
    private HttpClientInterface $client;
    private UserRepository $userRepository;
    private EntityManagerInterface $em;

    public function __construct(HttpClientInterface $client, UserRepository $userRepository, EntityManagerInterface $em)
    {
        $this->client = $client;
        $this->userRepository = $userRepository;
        $this->em = $em;
    }

    #[Route('/redirectRegister', name: 'redirectRegister', methods: ['POST'])]
    public function setGaeaUserId(Request $request, SerializerInterface $serializer)
    {
        $requestContent = $request->getContent();
        $contenuDecode = json_decode($requestContent, true);

        if ($contenuDecode) {
            $user = new User();

            $user->setGaeauserId($contenuDecode['gaeaUserId']);
            $user->setEmail($contenuDecode['mail']);
            $user->setUsername($contenuDecode['userName']);
            $user->setFirstName($contenuDecode['firstName']);
            $user->setLastName($contenuDecode['lastName']);
            $user->setBirthDay(new \DateTime($contenuDecode['birthDay']));
            $user->setNationality($contenuDecode['nationality']);
            $user->setAdress($contenuDecode['adress']);
            $user->setCity($contenuDecode['city']);
            $user->setZipCode($contenuDecode['zip']);
            $user->setCountry($contenuDecode['country']);
            if (array_key_exists('phone', $contenuDecode))
                $user->setPhone($contenuDecode['phone']);
            if (array_key_exists('additionalAdress', $contenuDecode))
                $user->setAdditionalAdress($contenuDecode['additionalAdress']);

            $this->em->persist($user);

            $this->em->flush();

            return new JsonResponse(['success' => true], 200, ['Access-Control-Allow-Origin' => 'all', 'exemple' => 'ok']);
        }

        return $this->json(['status' => 404, 'message' => "Informations inexistantes"]);
    }


    #[Route("/redirectLogin", name: "logged")]
    public function redirectLog(Request $request)
    {
        //S'i l'on se connecte et que le pseudo ou l'email est modifié => on le modifie sur le site avec la bonne information (API GAEA user)
        if ($request->getContent() !== "") {
            $contenu = explode("&", $request->getContent());
            $email = str_replace("%40", "@", substr($contenu[1], 6));
            $username = str_replace("%40", "@", substr($contenu[2], 9));

            //On vérifie si l'utilisateur n'a pas de valeur par défaut
            //(Un compte par défaut lui est créer lors de sa connexion sur le site s'il n'existe pas dans la bdd locale)
            $user = $this->userRepository->findOneBy(['email' => $email]);
            if ($user->getEmail() !== $email)
                $user->setEmail($email);
            if ($user->getUsername() !== $username)
                $user->setUsername($username);

            $this->em->persist($user);
            $this->em->flush();

            return $this->redirectToRoute('home');
        }
        return $this->json(['status' => 404, 'message' => "Une erreur est survenue"]);
    }

    #[Route("/getUserInfos", name: 'user_infos', methods: "GET")]
    public function getUserInfos(Session $session, SerializerInterface $serializer)
    {
        $userMail = $session->get('email');

        $user = $this->userRepository->findOneBy(array("email" => $userMail));

        return new Response($serializer->serialize($user, "json"), 200);
    }

    #[Route("/userShow", name: 'userShow')]
    public function show()
    {
        return $this->render('profile/show.html.twig', []);
    }

    /**
     * This Route is call when the user has a gaeauser account but not a gaea21 account.
     * @return Response
     */
    #[Route("/expansion", name: 'expansion')]
    public function redirectExpansion(Request $request)
    {
        $data = $request->getContent();
        $userrv = explode("&", $data);
        $gaeauser_id = intval(substr($userrv[0], 3));

        return $this->render('login/expansion.html.twig', [
            'gaeauser_id' => $gaeauser_id
        ]);
    }

    /**
     * This route is used to get the values the user has entered in the form
     * to expand his account by saving them in the gaea21 database
     * @param Request $request
     * @return Response
     */
    #[Route("/expandAccount", name: 'expandAccount')]
    public function expandAccount(Request $request)
    {
        //TODO : REGISTER USER IN GAEA21 DATABASE WITH THE INFORMATION GET FROM THE FORM
        //redirect to the redirectLogin route to make the user login to the site
        return $this->redirectToRoute('logged',/*TODO ENTER THE USER INFORMATION HAS ARRAY*/);
    }

    #[Route("/accountConfirmed/{token}", name: "accountConfirmation")]
    public function confirmationMail($token)
    {
        $apiUrl = $this->getParameter('URL_API');

        $response = $this->client->request(
            'POST',
            $apiUrl . '/apictrl/confirm/' . $token,
            []
        );

        return $this->render('Validation/validation.html.twig', []);
    }

    #[Route("/disableAccount", name: "disableAccount")]
    public function disableAccount()
    {
        return $this->render('profile/disableConfirm.html.twig', []);
    }

    #[Route("/disableAccount/{id}", name: "disableAccountConfirm")]
    public function disableAccountConfirm($id)
    {
        /* $response = $this->client->request(
            'POST',
             'https://gaea21user.sustlivprogram.org/apictrl/confirm/'
            'http://127.0.0.1:8000/apictrl/disable/'. $id, [
            'json' => [
                'id' => $id
            ]
        ]);

        dd($response->getStatusCode()); */
        /* return $this->redirectToRoute('home'); */
    }

    #[Route("/updateAccount", name: "updateAccount")]
    public function updateAccount()
    {
        return $this->render('profile/update.html.twig', []);
    }

    #[Route('/profile/update', name: 'profileUpdate')]
    public function profileUpdate(Request $request, SerializerInterface $serializer, EntityManagerInterface $em)
    {
        //$contenu = $request->getContent();
        $contenu = $request->request->get('objArr');
        $contenuDecode = json_decode($contenu, true);

        $id = $contenuDecode['gaeaUserId'];
        $userName = $contenuDecode['firstName'];
        $firstName = $contenuDecode['firstName'];
        $lastName = $contenuDecode['lastName'];
        $phone = $contenuDecode['phone'];
        $adress = $contenuDecode['adress'];
        $city = $contenuDecode['city'];
        $country = $contenuDecode['country'];

        $user = $this->userRepository->findOneBy(['gaeauserId' => $id]);

        $user->setUsername($userName);
        $user->setFirstName($firstName);
        $user->setLastName($lastName);
        $user->setPhone($phone);
        $user->setAdress($adress);
        $user->setCity($city);
        $user->setCountry($country);


        $em->persist($user);

        $em->flush();

        return $this->json(['status' => 200, 'message' => "Ok"]);
    }

    #[Route("/updatePassword", name: "updatePassword")]
    public function updatePassword()
    {
        return $this->render('profile/updatePassword.html.twig', []);
    }

    #[Route("/reinitPassword", name: "reinitPassword")]
    public function reinitPassword()
    {
        return $this->render('profile/reinitPassword.html.twig', []);
    }

    #[Route("/resetPassword/{token}", name: "resetpassword")]
    public function resetpassword($token)
    {
        return $this->render('profile/reinitPasswordLost.html.twig', ['token' => $token]);
    }

    #[Route("/apictrl/getUser/{gaeauser_id}", name: "getUserFromgaeaUser")]
    public function getUserForAnyPlateform($gaeauser_id, SerializerInterface $serializer)
    {
        $user = $this->userRepository->findOneBy(['gaeauserId' => $gaeauser_id]);

        $userJson = $serializer->serialize($user, 'json');

        return new Response($userJson, 200, [
            'Content-Type' => 'application/json'
        ]);
    }

}
