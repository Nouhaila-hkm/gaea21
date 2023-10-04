<?php

namespace App\Entity;


use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\FieldRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiProperty;

/**
 * @ApiResource(
 *  normalizationContext={"groups"={"field:read"}},
 *  denormalizationContext={"groups"={"field:write"}},
 *  collectionOperations={"get"},
 *  itemOperations={"get", "put"},
 * )
 * @ORM\Entity(repositoryClass=FieldRepository::class)
 */
class Field
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"formulaire:read","formulaire:write","field:read","field:write"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Type::class)
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"formulaire:read","formulaire:write","field:read","field:write"})
     */
    private $type;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"formulaire:read","formulaire:write","field:read","field:write","formConfirm:read"})
     */
    private $size;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"formulaire:read","formulaire:write","field:read","field:write"})
     */
    private $class;

    /**
     * @ORM\OneToMany(targetEntity=FieldListeTypeData::class, mappedBy="field",cascade={"persist", "remove"})
     * @Groups({"formulaire:read","field:read","field:write","FieldListeTypeData:write"})
     */
    private $field_listdatas;

    /**
     * @ORM\Column(type="string", length=90, nullable=true)
     * @Groups({"formulaire:read","formulaire:write","field:read","field:write"})
     */
    private $placeholder;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"formulaire:read","formulaire:write","field:read","field:write"})
     */
    private $value;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"formulaire:read","formulaire:write", "formulaire:answer","field:read","field:write", "formConfirm:read","mappedFormData:read", "formData:read"})
     */
    private $label;

    /**
     * @ORM\OneToMany(targetEntity=SectionMapField::class, mappedBy="field")
     * @Groups({"formulaire:read","formulaire:write","field:read","field:write","SectionMapField:write"})
     */
    private $sectionMapFields;

    /**
     * @ORM\OneToMany(targetEntity=MappedFormData::class, mappedBy="field")
     * @Groups({"formulaire:read","formulaire:write","field:read","field:write", "MappedFormData:write"})
     */
    private $mappedFormData;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"formulaire:read"})
     */
    private $is_required;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"formulaire:read"}) 
     */
    private $is_unique;

    /**
     * @ORM\Column(type="smallint", nullable=true)
     * @Groups({"formulaire:read"})
     */
    private $list_order;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"formulaire:read"})
     */
    private $is_active;

    /**
     * @ORM\ManyToMany(targetEntity=FieldGroup::class, mappedBy="fields")
     */
    private $fieldGroups;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"formulaire:read", "formulaire:answer"})
     */
    private $show_label;


    public function __construct()
    {
        $this->field_listdatas = new ArrayCollection();
        $this->sectionMapFields = new ArrayCollection();
        $this->mappedFormData = new ArrayCollection();
        $this->fieldGroups = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?Type
    {
        return $this->type;
    }


    public function setType(?Type $type): self
    {
        $this->type = $type;

        return $this;
    }
    public function setTy(?int $type): self
    {
        $this->type = $type;

        return $this;
    }
    public function getSize(): ?int
    {
        return $this->size;
    }

    public function setSize(?int $size): self
    {
        $this->size = $size;

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
     * @return Collection|FieldListeTypeData[]
     */
    public function getFieldListdatas(): Collection
    {
        return $this->field_listdatas;
    }

    public function addFieldListdata(FieldListeTypeData $fieldListdata): self
    {
        if (!$this->field_listdatas->contains($fieldListdata)) {
            $this->field_listdatas[] = $fieldListdata;
            $fieldListdata->setField($this);
            // $diplome->setUser($this);
        }

        return $this;
    }

    public function removeFieldListdata(FieldListeTypeData $fieldListdata): self
    {
        if ($this->field_listdatas->removeElement($fieldListdata)) {
            // set the owning side to null (unless already changed)
            if ($fieldListdata->getField() === $this) {
                $fieldListdata->setField(null);
            }
        }

        return $this;
    }

    public function getPlaceholder(): ?string
    {
        return $this->placeholder;
    }

    public function setPlaceholder(?string $placeholder): self
    {
        $this->placeholder = $placeholder;

        return $this;
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setValue(?string $value): self
    {
        $this->value = $value;

        return $this;
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

    /**
     * @return Collection<int, SectionMapField>
     */
    public function getSectionMapFields(): Collection
    {
        return $this->sectionMapFields;
    }

    public function addSectionMapField(SectionMapField $sectionMapField): self
    {
        if (!$this->sectionMapFields->contains($sectionMapField)) {
            $this->sectionMapFields[] = $sectionMapField;
            $sectionMapField->setField($this);
        }

        return $this;
    }

    public function removeSectionMapField(SectionMapField $sectionMapField): self
    {
        if ($this->sectionMapFields->removeElement($sectionMapField)) {
            // set the owning side to null (unless already changed)
            if ($sectionMapField->getField() === $this) {
                $sectionMapField->setField(null);
            }
        }

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
            $mappedFormData->setField($this);
        }

        return $this;
    }

    public function removeMappedFormData(MappedFormData $mappedFormData): self
    {
        if ($this->mappedFormData->removeElement($mappedFormData)) {
            // set the owning side to null (unless already changed)
            if ($mappedFormData->getField() === $this) {
                $mappedFormData->setField(null);
            }
        }

        return $this;
    }

    public function isIsRequired(): ?bool
    {
        return $this->is_required;
    }

    public function setIsRequired(bool $is_required): self
    {
        $this->is_required = $is_required;

        return $this;
    }

    public function isIsUnique(): ?bool
    {
        return $this->is_unique;
    }

    public function setIsUnique(bool $is_unique): self
    {
        $this->is_unique = $is_unique;

        return $this;
    }

    public function getListOrder(): ?int
    {
        return $this->list_order;
    }

    public function setListOrder(?int $list_order): self
    {
        $this->list_order = $list_order;

        return $this;
    }

    public function isIsActive(): ?bool
    {
        return $this->is_active;
    }

    public function setIsActive(bool $is_active): self
    {
        $this->is_active = $is_active;

        return $this;
    }

    /**
     * @return Collection<int, FieldGroup>
     */
    public function getFieldGroups(): Collection
    {
        return $this->fieldGroups;
    }

    public function addFieldGroup(FieldGroup $fieldGroup): self
    {
        if (!$this->fieldGroups->contains($fieldGroup)) {
            $this->fieldGroups[] = $fieldGroup;
            $fieldGroup->addField($this);
        }

        return $this;
    }

    public function removeFieldGroup(FieldGroup $fieldGroup): self
    {
        if ($this->fieldGroups->removeElement($fieldGroup)) {
            $fieldGroup->removeField($this);
        }

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
}
