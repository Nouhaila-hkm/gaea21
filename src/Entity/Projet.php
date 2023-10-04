<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *  normalizationContext={"groups"={"projet:read"}},
 *  denormalizationContext={"groups"={"projet:write"}},
 *  collectionOperations={"get"},
 *  itemOperations={"get", "put"}
 * )
 * @ORM\Entity(repositoryClass=ProjetRepository::class)
 */
class Projet
{

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"projet:read", "formData:read"})
     */
    private ?int $id = null;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"projet:read", "formData:read"})
     */
    private $projectName;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"projet:read", "formData:read"})
     */
    private $email;

    /**
     * @ORM\OneToMany(targetEntity=FormData::class, mappedBy="linkedProjet")
     * 
     */
    private $formData;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProjectName(): ?string
    {
        return $this->projectName;
    }

    public function setProjectName(string $projectName): self
    {
        $this->projectName = $projectName;

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

    /**
     * @return Collection|FormData[]
     */
    public function getFormData(): Collection
    {
        return $this->formData;
    }

    public function addFormData(FormData $formData): self
    {
        if (!$this->formData->contains($formData)) {
            $this->formData[] = $formData;
            $formData->setLinkedProject($this);
        }

        return $this;
    }

    public function removeFormData(FormData $formData): self
    {
        if ($this->formData->removeElement($formData)) {
            // set the owning side to null (unless already changed)
            if ($formData->getlinkedProject() === $this) {
                $formData->setlinkedProject(null);
            }
        }

        return $this;
    }
}
