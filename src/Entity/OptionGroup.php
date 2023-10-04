<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\OptionGroupRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(
 *  normalizationContext={"groups"={"OptionGroup:read"}},
 *  denormalizationContext={"groups"={"OptionGroup:write"}},
 *  collectionOperations={"get"},
 *  itemOperations={"get", "put","delete"}
 * )
 * @ORM\Entity(repositoryClass=OptionGroupRepository::class)
 */
class OptionGroup
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"formulaire:read","section:read","OptionGroup:read"})
     */
    private $id;

    /**
     * @ORM\ManyToMany(targetEntity=FieldListeTypeData::class)
     * @Groups({"formulaire:read","section:read","OptionGroup:read"})
     */
    private $Options;

    /**
     * @ORM\ManyToMany(targetEntity=FieldGroup::class, inversedBy="optionGroups")
     * @Groups({"formulaire:read","section:read","OptionGroup:read"})
     */
    private $FieldGroups;

    /**
     * @ORM\ManyToOne(targetEntity=Section::class, inversedBy="optionGroups")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"formulaire:read","section:read","OptionGroup:read"})
     */
    private $section;

    public function __construct()
    {
        $this->Options = new ArrayCollection();
        $this->FieldGroups = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, FieldListeTypeData>
     */
    public function getOptions(): Collection
    {
        return $this->Options;
    }

    public function addOption(FieldListeTypeData $option): self
    {
        if (!$this->Options->contains($option)) {
            $this->Options[] = $option;
        }

        return $this;
    }

    public function removeOption(FieldListeTypeData $option): self
    {
        $this->Options->removeElement($option);

        return $this;
    }

    /**
     * @return Collection<int, FieldGroup>
     */
    public function getFieldGroups(): Collection
    {
        return $this->FieldGroups;
    }

    public function addFieldGroup(FieldGroup $fieldGroup): self
    {
        if (!$this->FieldGroups->contains($fieldGroup)) {
            $this->FieldGroups[] = $fieldGroup;
        }

        return $this;
    }

    public function removeFieldGroup(FieldGroup $fieldGroup): self
    {
        $this->FieldGroups->removeElement($fieldGroup);

        return $this;
    }

    public function getSection(): ?Section
    {
        return $this->section;
    }

    public function setSection(?Section $section): self
    {
        $this->section = $section;

        return $this;
    }
}
