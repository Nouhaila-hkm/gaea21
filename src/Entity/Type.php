<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\TypeRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *  normalizationContext={"groups"={"Type:read"}},
 *  denormalizationContext={"groups"={"Type:write"}},
 *  collectionOperations={"get"},
 *  itemOperations={"get", "put"}
 * )
 * @ORM\Entity(repositoryClass=TypeRepository::class)
 */
class Type
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"formulaire:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * typeOf Data
     * @Groups({"formulaire:read"})
     */
    private $typeName;

    /**
     * @ORM\Column(type="string", nullable=true)
     * @Groups({"formulaire:read"})
     */
    private $rule;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     * @Groups({"formulaire:read"})
     */
    private $chosen_field;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTypeName(): ?string
    {
        return $this->typeName;
    }

    public function setTypeName(string $typeName): self
    {
        $this->typeName = $typeName;

        return $this;
    }

    public function getRule(): ?string
    {
        return $this->rule;
    }

    public function setRule(?string $rule): self
    {
        $this->rule = $rule;

        return $this;
    }

    public function getChosenField(): ?string
    {
        return $this->chosen_field;
    }

    public function setChosenField(?string $chosen_field): self
    {
        $this->chosen_field = $chosen_field;

        return $this;
    }
}
