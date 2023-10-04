<?php

namespace App\Entity;

use App\Repository\NavBarreRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=NavBarreRepository::class)
 */
class NavBarre
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $IconsName;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $ItemsName;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $Identity;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIconsName(): ?string
    {
        return $this->IconsName;
    }

    public function setIconsName(?string $IconsName): self
    {
        $this->IconsName = $IconsName;

        return $this;
    }

    public function getItemsName(): ?string
    {
        return $this->ItemsName;
    }

    public function setItemsName(?string $ItemsName): self
    {
        $this->ItemsName = $ItemsName;

        return $this;
    }

    public function getIdentity(): ?int
    {
        return $this->Identity;
    }

    public function setIdentity(?int $Identity): self
    {
        $this->Identity = $Identity;

        return $this;
    }
}
