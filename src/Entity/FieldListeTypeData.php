<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\FieldListeTypeDataRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *  normalizationContext={"groups"={"FieldListeTypeData:read"}},
 *  denormalizationContext={"groups"={"FieldListeTypeData:write"}},
 *  collectionOperations={"get"},
 *  itemOperations={"get", "put"}
 * )
 * @ORM\Entity(repositoryClass=FieldListeTypeDataRepository::class)
 */
class FieldListeTypeData
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"formulaire:read","formulaire:write","FieldListeTypeData:read","FieldListeTypeData:write"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=25, nullable=true)
     * @Groups({"formulaire:read","formulaire:write","FieldListeTypeData:read","FieldListeTypeData:write"})
     * 
     */
    private $value;

    /**
     * @ORM\ManyToOne(targetEntity=Field::class, inversedBy="field_listdatas")
     * @Groups({"formulaire:read","formulaire:write","field:read","field:write","FieldListeTypeData:write","FieldListeTypeData:read"})
     */
    private $field;

    /**
     * @ORM\Column(type="string", length=25)
     * @Groups({"formulaire:read","formulaire:write","FieldListeTypeData:read","FieldListeTypeData:write"})
     */
    private $label;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getField(): ?Field
    {
        return $this->field;
    }

    public function setField(?Field $field): self
    {
        $this->field = $field;

        return $this;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): self
    {
        $this->label = $label;

        return $this;
    }
}