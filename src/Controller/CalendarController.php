<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class CalendarController extends AbstractController
{
    #[Route('/calendar', name: 'app_calendar')]
    public function index(): Response
    {
        return $this->render('calendar/index.html.twig', [
            'controller_name' => 'CalendarController',
        ]);
    }
    
    #[Route('/api/events', name: 'app_calendar_events')]
    public function getEvents(SerializerInterface $serializer): Response
    {
        $events = [
            [
                'title' => 'Mon événement 1',
                'start' => '2023-07-25',
                'end' => '2023-07-27',
            ],
            [
                'title' => 'Mon événement 2',
                'start' => '2023-07-28',
                'end' => '2023-07-30',
            ]
        ];

        $jsonDataUsers = $serializer-> serialize($events,'json');
        return new Response($jsonDataUsers, Response::HTTP_OK, [], true);
    
    }
}
