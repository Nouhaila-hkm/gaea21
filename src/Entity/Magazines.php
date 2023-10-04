<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\MagazinesRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=MagazinesRepository::class)
 */
#[ApiResource]
class Magazines
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     */
    private $magazineDate;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $lienMagazine;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMagazineDate(): ?\DateTimeInterface
    {
        return $this->magazineDate;
    }

    public function setMagazineDate(\DateTimeInterface $magazineDate): self
    {
        $this->magazineDate = $magazineDate;

        return $this;
    }

    public function getLienMagazine(): ?string
    {
        return $this->lienMagazine;
    }

    public function setLienMagazine(string $lienMagazine): self
    {
        $this->lienMagazine = $lienMagazine;

        return $this;
    }
}
