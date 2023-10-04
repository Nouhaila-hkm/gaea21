<?php

namespace App\Entity;

use App\Repository\NewsletterSubscriberRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=NewsletterSubscriberRepository::class)
 */
class NewsletterSubscriber
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=125)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=60)
     */
    private $confirmationtoken;

    /**
     * @ORM\Column(type="datetime_immutable")
     */
    private $subscribed_at;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getConfirmationToken(): ?string
    {
        return $this->confirmationtoken;
    }

    public function setConfirmationToken(string $confirmationtoken): self
    {
        $this->confirmationtoken = $confirmationtoken;

        return $this;
    }

    public function getSubscribedAt(): ?\DateTimeImmutable
    {
        return $this->subscribed_at;
    }

    public function setSubscribedAt(\DateTimeImmutable $subscribed_at): self
    {
        $this->subscribed_at = $subscribed_at;

        return $this;
    }
}
