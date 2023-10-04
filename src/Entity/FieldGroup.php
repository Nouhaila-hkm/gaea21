<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\FieldGroupRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(
 *  normalizationContext={"groups"={"FieldGroup:read"}},
 *  denormalizationContext={"groups"={"FieldGroup:write"}},
 *  collectionOperations={"get"},
 *  itemOperations={"get", "put","delete"}
 * )
 * @ORM\Entity(repositoryClass=FieldGroupRepository::class)
 */
class FieldGroup
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"formulaire:read","section:read","OptionGroup:read"})
     */
    private $id;

    /**
     * @ORM\ManyToMany(targetEntity=Field::class, inversedBy="fieldGroups")
     * @Groups({"formulaire:read","section:read","OptionGroup:read"})
     */
    private $fields;

    /**
     * @ORM\ManyToOne(targetEntity=section::class, inversedBy="fieldGroups")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"formulaire:read","section:read","OptionGroup:read"})
     */
    private $section;

    /**
     * @ORM\ManyToMany(targetEntity=OptionGroup::class, mappedBy="FieldGroups")
     * @Groups({"formulaire:read","section:read","OptionGroup:read"})
     */
    private $optionGroups;

    public function __construct()
    {
        $this->fields = new ArrayCollection();
        $this->optionGroups = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, Field>
     */
    public function getFields(): Collection
    {
        return $this->fields;
    }

    public function addField(Field $field): self
    {
        if (!$this->fields->contains($field)) {
            $this->fields[] = $field;
        }

        return $this;
    }

    public function removeField(Field $field): self
    {
        $this->fields->removeElement($field);

        return $this;
    }

    public function getSection(): ?section
    {
        return $this->section;
    }

    public function setSection(?section $section): self
    {
        $this->section = $section;

        return $this;
    }

    /**
     * @return Collection<int, OptionGroup>
     */
    public function getOptionGroups(): Collection
    {
        return $this->optionGroups;
    }

    public function addOptionGroup(OptionGroup $optionGroup): self
    {
        if (!$this->optionGroups->contains($optionGroup)) {
            $this->optionGroups[] = $optionGroup;
            $optionGroup->addFieldGroup($this);
        }

        return $this;
    }

    public function removeOptionGroup(OptionGroup $optionGroup): self
    {
        if ($this->optionGroups->removeElement($optionGroup)) {
            $optionGroup->removeFieldGroup($this);
        }

        return $this;
    }
}
