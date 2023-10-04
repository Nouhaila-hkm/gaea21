<?php

namespace App\Entity;


use App\Repository\ListItemRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ListItemRepository::class)
 * @ApiResource
 */

class ListItem
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"offer:read","offer:write"})
     */
    private $id;

    /**
     * @ORM\Column(type="text", length=65535)
     * @Groups({"offer:read","offer:write"})
     */
    private $description;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"offer:read","offer:write"})
     */
    private $listItemOrder;

    /**
     * @ORM\ManyToOne(targetEntity=ContentSection::class, inversedBy="listItems")
     */
    private $contentSection;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getListItemOrder(): ?int
    {
        return $this->listItemOrder;
    }

    public function setListItemOrder(int $listItemOrder): self
    {
        $this->listItemOrder = $listItemOrder;

        return $this;
    }

    public function getContentSection(): ?ContentSection
    {
        return $this->contentSection;
    }

    public function setContentSection(?ContentSection $contentSection): self
    {
        $this->contentSection = $contentSection;

        return $this;
    }
}
