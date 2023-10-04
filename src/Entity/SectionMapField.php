<?php

namespace App\Entity;

use App\Repository\SectionMapFieldRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *  normalizationContext={"groups"={"SectionMapField:read"}},
 *  denormalizationContext={"groups"={"SectionMapField:write"}},
 *  collectionOperations={"get"},
 * itemOperations={"get", "put"}
 * )
 * @ORM\Entity(repositoryClass=SectionMapFieldRepository::class)
 */
class SectionMapField
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"formulaire:read","formulaire:write","SectionMapField:read","SectionMapField:write"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Section::class, inversedBy="mappedFields")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"formulaire:read","formulaire:write","Section:write"})
     */
    private $section;

    /**
     * @ORM\ManyToOne(targetEntity=Field::class, inversedBy="sectionMapFields")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"formulaire:read","formulaire:write","SectionMapField:read","Field:write"})
     */
    private $field;



    public function getId(): ?int
    {
        return $this->id;
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
