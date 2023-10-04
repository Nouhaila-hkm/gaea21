<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *  normalizationContext={"groups"={"formData:read"}},
 *  denormalizationContext={"groups"={"formData:write"}},
 *  collectionOperations={"get"},
 *  itemOperations={"get", "put"}
 * )
 * @ORM\Entity(repositoryClass=FormDataRepository::class)
 */
class FormData
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"formData:read"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="formData")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"formData:read"})
     */
    private $userLinked;

    /**
     * @ORM\ManyToOne(targetEntity=Projet::class, inversedBy="formData")
     * @Groups({"formData:read"})
     */
    private $linkedProject;

    /**
     * @ORM\OneToMany(targetEntity=MappedFormData::class, mappedBy="data", orphanRemoval=true)
     * @Groups({"formData:read"})
     */
    private $mappedFormData;

    /**
     * @ORM\ManyToOne(targetEntity=Formulaire::class, inversedBy="linkedFormData")
     * @Groups({"formData:read"})
     */
    private $linkedForm;

    /**
     * @ORM\Column(type="datetime_immutable")
     * @Groups({"formData:read"})
     */
    private ?\DateTimeImmutable $createdAt = null;

    public function __construct()
    {
        $this->mappedFormData = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserLinked(): ?User
    {
        return $this->userLinked;
    }

    public function setUserLinked(?User $userLinked): self
    {
        $this->userLinked = $userLinked;

        return $this;
    }

    /**
     * @return Collection|MappedFormData[]
     */
    public function getMappedFormData(): Collection
    {
        return $this->mappedFormData;
    }

    public function addMappedFormData(MappedFormData $mappedFormData): self
    {
        if (!$this->mappedFormData->contains($mappedFormData)) {
            $this->mappedFormData[] = $mappedFormData;
            $mappedFormData->setData($this);
        }

        return $this;
    }

    public function removeMappedFormData(MappedFormData $mappedFormData): self
    {
        if ($this->mappedFormData->removeElement($mappedFormData)) {
            // set the owning side to null (unless already changed)
            if ($mappedFormData->getData() === $this) {
                $mappedFormData->setData(null);
            }
        }

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt = new \DateTimeImmutable()): void
    {
        $this->createdAt = $createdAt;
    }

    /**
     * @Groups({"formData:read"})
     */
    public function getForm(): ?Formulaire
    {
        return $this->getMappedFormData()[0]->getForm();
    }

    /**
     * @Groups({"formData:read"})
     */
    public function getCleanDate(): ?String
    {
        return $this->getCreatedAt()->format('d-m-Y H:i');
    }

    public function getLinkedProject(): ?Projet
    {
        return $this->linkedProject;
    }

    public function setLinkedProject(?Projet $linkedProject): self
    {
        $this->linkedProject = $linkedProject;

        return $this;
    }

    public function getLinkedForm(): ?Formulaire
    {
        return $this->linkedForm;
    }

    public function setLinkedForm(?Formulaire $linkedForm): self
    {
        $this->linkedForm = $linkedForm;

        return $this;
    }
}
