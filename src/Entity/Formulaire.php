<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\FormulaireRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Andante\SoftDeletableBundle\SoftDeletable\SoftDeletableInterface;

/**
 * @ApiResource(
 *  normalizationContext={"groups"={"formulaire:read"}},
 *  denormalizationContext={"groups"={"formulaire:write"}},
 *  collectionOperations={"get"},
 *  itemOperations={"get", "put"}
 * )
 * @ORM\Entity(repositoryClass=FormulaireRepository::class)
 */
class Formulaire implements SoftDeletableInterface
{

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"formulaire:read","formulaire:write"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=768)
     * @Groups({"formulaire:read","formulaire:write","mappedFormData:read","formData:read"})
     */
    private $formName;

    /**
     * @ORM\OneToOne(targetEntity=NavigationElem::class, cascade={"persist", "remove"})
     */
    private $navElemParent;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"formulaire:read", "formulaire:write"})
     */
    private $class;

    /**
     * @ORM\OneToMany(targetEntity=FormMapSection::class, mappedBy="Form", orphanRemoval=true)
     * @Groups({"formulaire:read","formulaire:write","FormMapSection:write"})
     */
    private $mappedSections;

    /**
     * @ORM\OneToMany(targetEntity=MappedFormData::class, mappedBy="form")
     * @Groups({"formulaire:answer" ,"formulaire:write", "mappedFormData:write"})
     */
    private $mappedFormData;

    /**
     * @ORM\OneToMany(targetEntity=FormData::class, mappedBy="linkedForm")
     * @Groups({"formulaire:answer"})
     */
    private $linkedFormData;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"formulaire:answer", "formulaire:read" ,"formulaire:write","formData:read" , "project:read"})
     */
    private $email;

    /**
     * 
     * @Groups({"formulaire:answer", "formulaire:read" ,"formulaire:write"})
     */
    private ?\DateTimeImmutable $deletedAt = null;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"formulaire:read","formulaire:write", "formulaire:answer"})
     */
    private $label;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"formulaire:read", "formulaire:answer"})
     */
    private $show_label;

    /**
     * @ORM\Column(type="string", length=512, nullable=true)
     * @Groups({"formulaire:read","formulaire:write", "formulaire:answer"})
     */
    private $description;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"formulaire:read", "formulaire:answer"})
     */
    private $show_description;

    /**
     * @ORM\ManyToMany(targetEntity=Project::class, mappedBy="form", cascade={"persist"})
     * @Groups({"formulaire:read"})
     */
    private $projects;

    public function __construct()
    {
        $this->mappedSections = new ArrayCollection();
        $this->mappedFormData = new ArrayCollection();
        $this->projects = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFormName(): ?string
    {
        return $this->formName;
    }

    public function setFormName(string $formName): self
    {
        $this->formName = $formName;

        return $this;
    }

    public function getNavElemParent(): ?NavigationElem
    {
        return $this->navElemParent;
    }

    public function setNavElemParent(?NavigationElem $navElemParent): self
    {
        $this->navElemParent = $navElemParent;

        return $this;
    }

    public function getClass(): ?string
    {
        return $this->class;
    }

    public function setClass(?string $class): self
    {
        $this->class = $class;

        return $this;
    }

    /**
     * @return Collection|FormMapSection[]
     */
    public function getMappedSections(): array|ArrayCollection|Collection
    {
        return $this->mappedSections;
    }

    public function addMappedSection(FormMapSection $mappedSection): self
    {
        if (!$this->mappedSections->contains($mappedSection)) {
            $this->mappedSections[] = $mappedSection;
            $mappedSection->setForm($this);
        }

        return $this;
    }

    public function removeMappedSection(FormMapSection $mappedSection): self
    {
        if ($this->mappedSections->removeElement($mappedSection)) {
            // set the owning side to null (unless already changed)
            if ($mappedSection->getForm() === $this) {
                $mappedSection->setForm(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, MappedFormData>
     */
    public function getLinkedFormData(): Collection
    {
        return $this->linkedFormData;
    }

    public function addLinkedFormData(FormData $linkedFormData): self
    {
        if (!$this->linkedFormData->contains($linkedFormData)) {
            $this->linkedFormData[] = $linkedFormData;
            $linkedFormData->setLinkedForm($this);
        }

        return $this;
    }

    public function removeLinkedFormData(FormData $linkedFormData): self
    {
        if ($this->linkedFormData->removeElement($linkedFormData)) {
            // set the owning side to null (unless already changed)
            if ($linkedFormData->getLinkedForm() === $this) {
                $linkedFormData->setLinkedForm(null);
            }
        }

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getDeletedAt(): ?\DateTimeImmutable
    {
        return $this->deletedAt;
    }

    public function setDeletedAt(\DateTimeImmutable $deletedAt = null): void
    {
        $this->deletedAt = $deletedAt;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(?string $label): self
    {
        $this->label = $label;

        return $this;
    }

    public function isShowLabel(): ?bool
    {
        return $this->show_label;
    }

    public function setShowLabel(bool $show_label): self
    {
        $this->show_label = $show_label;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function isShowDescription(): ?bool
    {
        return $this->show_description;
    }

    public function setShowDescription(bool $show_description): self
    {
        $this->show_description = $show_description;

        return $this;
    }

    /**
     * @return Collection<int, MappedFormData>
     */
    public function getMappedFormData(): Collection
    {
        return $this->mappedFormData;
    }

    public function addMappedFormData(MappedFormData $mappedFormData): self
    {
        if (!$this->mappedFormData->contains($mappedFormData)) {
            $this->mappedFormData[] = $mappedFormData;
            $mappedFormData->setForm($this);
        }

        return $this;
    }

    public function removeMappedFormData(MappedFormData $mappedFormData): self
    {
        if ($this->mappedFormData->removeElement($mappedFormData)) {
            // set the owning side to null (unless already changed)
            if ($mappedFormData->getForm() === $this) {
                $mappedFormData->setForm(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Project>
     */
    public function getProjects(): Collection
    {
        return $this->projects;
    }

    public function addProject(Project $project): self
    {
        if (!$this->projects->contains($project)) {
            $this->projects[] = $project;
            $project->addForm($this);
        }

        return $this;
    }

    public function removeProject(Project $project): self
    {
        if ($this->projects->removeElement($project)) {
            $project->removeForm($this);
        }

        return $this;
    }
}
