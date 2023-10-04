<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\SectionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Andante\SoftDeletableBundle\SoftDeletable\SoftDeletableInterface;

/**
 * @ApiResource(
 *  normalizationContext={"groups"={"section:read"}},
 *  denormalizationContext={"groups"={"section:write"}},
 *  collectionOperations={"get"},
 *  itemOperations={"get", "put","delete"}
 * )
 * @ORM\Entity(repositoryClass=SectionRepository::class)
 */
class Section /*implements SoftDeletableInterface*/
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"formulaire:read","formulaire:write","section:write"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"formulaire:read","formulaire:write","section:write"})
     */
    private $sectionName;

    /**
     * @ORM\Column(type="string", length=1275, nullable=true)
     * @Groups({"formulaire:read","formulaire:write","section:write"})
     */
    private $sectionHeader;

    /**
     * @ORM\ManyToOne(targetEntity=Section::class, inversedBy="sectionMailReturn")
     */
    private $nextSection;

    /**
     * @ORM\OneToMany(targetEntity=Section::class, mappedBy="nextSection")
     * 
     */
    private $sectionMailReturn;

    /**
     * @ORM\OneToMany(targetEntity=SectionMapField::class, mappedBy="section", orphanRemoval=true)
     * @Groups({"formulaire:read","formulaire:write","SectionMapField:write"})
     * 
     */
    private $mappedFields;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"formulaire:read"})
     */
    private $is_active;

    /**
     * @ORM\OneToMany(targetEntity=FieldGroup::class, mappedBy="section")
     * @Groups({"formulaire:read","section:read"})
     */
    private $fieldGroups;

    /**
     * @ORM\OneToMany(targetEntity=OptionGroup::class, mappedBy="section")
     * @Groups({"formulaire:read","section:read"})
     */
    private $optionGroups;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"formulaire:read", "formulaire:answer"})
     */
    private $show_header;

    // /**
    //  *
    //  * @Groups({"formulaire:read","section:read"})
    //  */
    // private ?\DateTimeImmutable $deletedAt = null; 

    // public function __toString(): string
    // {
    //     return 'bla bla';
    // }
    public function __construct()
    {
        $this->sectionMailReturn = new ArrayCollection();
        $this->mappedFields = new ArrayCollection();
        $this->fieldGroups = new ArrayCollection();
        $this->optionGroups = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSectionName(): ?string
    {
        return $this->sectionName;
    }

    public function setSectionName(string $sectionName): self
    {
        $this->sectionName = $sectionName;

        return $this;
    }

    public function getSectionHeader(): ?string
    {
        return $this->sectionHeader;
    }

    public function setSectionHeader(?string $sectionHeader): self
    {
        $this->sectionHeader = $sectionHeader;

        return $this;
    }

    public function getNextSection(): ?self
    {
        return $this->nextSection;
    }

    public function setNextSection(?self $nextSection): self
    {
        $this->nextSection = $nextSection;

        return $this;
    }

    /**
     * @return Collection|self[]
     */
    public function getSectionMailReturn(): Collection
    {
        return $this->sectionMailReturn;
    }

    public function addSectionMailReturn(self $sectionMailReturn): self
    {
        if (!$this->sectionMailReturn->contains($sectionMailReturn)) {
            $this->sectionMailReturn[] = $sectionMailReturn;
            $sectionMailReturn->setNextSection($this);
        }

        return $this;
    }

    public function removeSectionMailReturn(self $sectionMailReturn): self
    {
        if ($this->sectionMailReturn->removeElement($sectionMailReturn)) {
            // set the owning side to null (unless already changed)
            if ($sectionMailReturn->getNextSection() === $this) {
                $sectionMailReturn->setNextSection(null);
            }
        }

        return $this;
    }

    public function setSectionMailReturn(?string $sectionMailReturn): self
    {
        $this->sectionMailReturn = $sectionMailReturn;

        return $this;
    }

    /**
     * @return Collection|SectionMapField[]
     */
    public function getMappedFields(): Collection
    {
        return $this->mappedFields;
    }

    public function addMappedField(SectionMapField $mappedField): self
    {
        if (!$this->mappedFields->contains($mappedField)) {
            $this->mappedFields[] = $mappedField;
            $mappedField->setSection($this);
        }

        return $this;
    }

    public function removeMappedField(SectionMapField $mappedField): self
    {
        if ($this->mappedFields->removeElement($mappedField)) {
            // set the owning side to null (unless already changed)
            if ($mappedField->getSection() === $this) {
                $mappedField->setSection(null);
            }
        }

        return $this;
    }
    // public function getDeletedAt() : ?\DateTimeImmutable
    // {
    //     return $this->deletedAt;
    // }

    // public function setDeletedAt(\DateTimeImmutable $deletedAt = null ) : void
    // {
    //     $this->deletedAt = $deletedAt;
    // }

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
            $fieldGroup->setSection($this);
        }

        return $this;
    }

    public function removeFieldGroup(FieldGroup $fieldGroup): self
    {
        if ($this->fieldGroups->removeElement($fieldGroup)) {
            // set the owning side to null (unless already changed)
            if ($fieldGroup->getSection() === $this) {
                $fieldGroup->setSection(null);
            }
        }

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
            $optionGroup->setSection($this);
        }

        return $this;
    }

    public function removeOptionGroup(OptionGroup $optionGroup): self
    {
        if ($this->optionGroups->removeElement($optionGroup)) {
            // set the owning side to null (unless already changed)
            if ($optionGroup->getSection() === $this) {
                $optionGroup->setSection(null);
            }
        }

        return $this;
    }

    public function isShowHeader(): ?bool
    {
        return $this->show_header;
    }

    public function setShowHeader(bool $show_header): self
    {
        $this->show_header = $show_header;

        return $this;
    }
}
