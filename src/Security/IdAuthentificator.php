<?php

namespace App\Security;

use App\Entity\User;
use AppBundle\Repository\UserSlpRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use GaeaUserBundle\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpKernel\Controller\ControllerResolverInterface;
use Symfony\Component\Routing\Matcher\RedirectableUrlMatcherInterface;
use Symfony\Component\Routing\Router;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;
use Symfony\Component\Serializer\SerializerInterface;

class IdAuthentificator extends AbstractGuardAuthenticator
{
    private $em;

    public function __construct(EntityManagerInterface $em, RouterInterface $router, SerializerInterface $serializer)
    {
        $this->em = $em;
        $this->router = $router;
        $this->serializer = $serializer;
        //$this->redirect = $redirectResponse;

    }

    /**
     * Called on every request to decide if this authenticator should be
     * used for the request. Returning `false` will cause this authenticator
     * to be skipped.
     */
    public function supports(Request $request)
    {
        if ($request->getPathInfo() != '/redirectLogin' || !$request->isMethod('POST')) {
            return false;
        }
        return true;
    }

    /**
     * Called on every request. Return whatever credentials you want to
     * be passed to getUser() as $credentials.
     */
    public function getCredentials(Request $request)
    {
        // if ($request->getPathInfo() != '/redirectLogin' || !$request->isMethod('POST')) {
        //     return;
        // }
        $contenu = $request->getContent();

        /* $userrv = explode("&",$contenu);
        $gaeaid = substr($userrv[0],3);
        //$email = substr($userrv[1],6);
        //$email = str_replace("%40","@",substr($userrv[1],6));
        $id = intval($gaeaid);
        //var_dump($id);
        return $id; */

        $userrv = explode("&", $contenu);
        $gaeaid = intval(substr($userrv[0], 3));
        $email = substr($userrv[1], 6);
        $email = str_replace("%40", "@", substr($userrv[1], 6));
        $username = substr($userrv[2], 9);

        return [$gaeaid, $email, $username];
    }

    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        if (null === $credentials) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"

            return null;
        }

        // if a User is returned, checkCredentials() is called
        return $this->em->getRepository(User::class)->findOneBy(['gaeauserId' => $credentials[0]]);
    }

    public function checkCredentials($credentials, UserInterface $user)
    {
        // check credentials - e.g. make sure the password is valid
        // no credential check is needed in this case
        if ($credentials) {
            return true;
        }

        // return true to cause authentication success
        return false;
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
    {
        $contenu = $request->getContent();
        $userrv = explode("&", $contenu);
        $gaeaid = substr($userrv[0], 3);
        $id = intval($gaeaid);

        $email = str_replace("%40", "@", substr($userrv[1], 6));
        $username = str_replace("%40", "@", substr($userrv[2], 9));
        //var_dump($email,$username) ;
        $request->getSession()->set('username', $username);
        $request->getSession()->set('email', $email);

        /* $companyid = $userrv->getId();
        $company = $this->em->getRepository(Company::class)->findOneBy(['id'=>$companyid]);



        $request->getSession()->set('id',$companyid);
        $request->getSession()->set('company',$company);

        if ($company->getActivated() === false){
            $request->getSession()->set('message','Veuillez vous connecter pour pouvoir accéder aux fonctionnalités SLP');
            $url = $this->router->generate('logout');
            return new RedirectResponse($url);
        } */

        // on success, let the request continue
        return null;
    }

    /**
     * If the authentication fails, It means that the user exists in the gaeauser database but not in the gaea21 database
     * It redirects then in the expansion page.
     * @param Request $request
     * @param AuthenticationException $exception
     * @return RedirectResponse
     */
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        $url = $this->router->generate('expansion');

        return new RedirectResponse($url, 307);
    }

    public function supportsRememberMe()
    {
        return false;
    }

    /**
     * Called when authentication is needed, but it's not sent
     */
    public function start(Request $request, AuthenticationException $authException = null)
    {
        $data = [
            // you might translate this message
            'message' => 'Authentication Required'
        ];

        $request->getSession()->set('message', 'Veuillez vous connecter pour pouvoir accéder aux fonctionnalités SLP');
        $url = $this->router->generate('home');

        return new RedirectResponse($url);


        //return new JsonResponse($data, Response::HTTP_UNAUTHORIZED);

    }

    public function supportsClass($class)
    {
        return true;
    }
}
