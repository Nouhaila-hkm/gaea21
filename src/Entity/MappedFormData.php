<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\MappedFormDataRepository;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *  normalizationContext={"groups"={"mappedFormData:read"}},
 *  denormalizationContext={"groups"={"mappedFormData:write"}},
 *  collectionOperations={"get"},
 *  itemOperations={"get", "put"}
 * )
 * @ORM\Entity(repositoryClass=MappedFormDataRepository::class)
 */
class MappedFormData
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"formulaire:write", "mappedFormData:read", "mappedFormData:write"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=FormData::class, inversedBy="mappedFormData")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"formulaire:write", "FormData:read", "FormData:write"})
     */
    private $data;

    /**
     * @ORM\Column(type="string", length=2500)
     * @Groups({"formulaire:write", "formulaire:answer", "mappedFormData:read", "mappedFormData:write", "formConfirm:read", "formData:read"})
     */
    private $answer;

    /**
     * @ORM\ManyToOne(targetEntity=Formulaire::class, inversedBy="mappedFormData")
     * @Groups({"formulaire:write", "mappedFormData:read", "mappedFormData:write"})
     */
    private $form;

    /**
     * @ORM\ManyToOne(targetEntity=Field::class, inversedBy="mappedFormData")
     * @Groups({"formulaire:write","formulaire:answer","mappedFormData:read","field:write", "formConfirm:read", "formData:read"})
     */
    private $field;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getData(): ?FormData
    {
        return $this->data;
    }

    public function setData(?FormData $data): self
    {
        $this->data = $data;

        return $this;
    }

    public function getAnswer(): ?string
    {
        return $this->answer;
    }

    public function setAnswer(string $answer): self
    {
        $this->answer = $answer;

        return $this;
    }

    public function getForm(): ?Formulaire
    {
        return $this->form;
    }

    public function setForm(?Formulaire $form): self
    {
        $this->form = $form;

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
}
