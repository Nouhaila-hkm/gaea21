<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\FormMapSectionRepository;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *  normalizationContext={"groups"={"FormMapSection:read"}},
 *  denormalizationContext={"groups"={"FormMapSection:write"}},
 *  collectionOperations={"get"},
 *  itemOperations={"get", "put"}
 * )
 * @ORM\Entity(repositoryClass=FormMapSectionRepository::class)
 */
class FormMapSection
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"formulaire:read","formulaire:write"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Formulaire::class, inversedBy="mappedSections")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"formulaire:read","formulaire:write"})
     */
    private $Form;

    /**
     * @ORM\OneToOne(targetEntity=Section::class, cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"formulaire:read","formulaire:write","section:write"})
     */
    private $section;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"formulaire:read","formulaire:write"})
     */
    private $sectionNumber;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getForm(): ?Formulaire
    {
        return $this->Form;
    }

    public function setForm(?Formulaire $Form): self
    {
        $this->Form = $Form;

        return $this;
    }

    public function getSection(): ?Section
    {
        return $this->section;
    }

    public function setSection(Section $section): self
    {
        $this->section = $section;

        return $this;
    }

    public function getSectionNumber(): ?int
    {
        return $this->sectionNumber;
    }

    public function setSectionNumber(int $sectionNumber): self
    {
        $this->sectionNumber = $sectionNumber;

        return $this;
    }
}
