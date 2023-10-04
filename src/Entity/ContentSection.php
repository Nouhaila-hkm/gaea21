<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ContentSectionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ContentSectionRepository::class)
 * @ApiResource
 */

class ContentSection
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"offer:read","offer:write"})
     */
    private $id;

    /**
     * @ORM\Column(type="text", length=65535, nullable=true)
     * @Groups({"offer:read","offer:write"})
     */
    private $description;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"offer:read","offer:write"})
     */
    private $contentOrder;

    /**
     * @ORM\ManyToOne(targetEntity=OfferSection::class, inversedBy="contentSections")
     */
    private $offerSection;

    /**
     * @ORM\OneToMany(targetEntity=ListItem::class, mappedBy="contentSection", cascade={"persist", "remove"})
     * @Groups({"offer:read","offer:write"})
     */
    private $listItems;

    public function __construct()
    {
        $this->listItems = new ArrayCollection();
    }

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

    public function getContentOrder(): ?int
    {
        return $this->contentOrder;
    }

    public function setContentOrder(int $contentOrder): self
    {
        $this->contentOrder = $contentOrder;

        return $this;
    }

    public function getOfferSection(): ?OfferSection
    {
        return $this->offerSection;
    }

    public function setOfferSection(?OfferSection $offerSection): self
    {
        $this->offerSection = $offerSection;

        return $this;
    }

    /**
     * @return Collection<int, ListItem>
     */
    public function getListItems(): Collection
    {
        return $this->listItems;
    }

    public function addListItem(ListItem $listItem): self
    {
        if (!$this->listItems->contains($listItem)) {
            $this->listItems[] = $listItem;
            $listItem->setContentSection($this);
        }

        return $this;
    }

    public function removeListItem(ListItem $listItem): self
    {
        if ($this->listItems->removeElement($listItem)) {
            // set the owning side to null (unless already changed)
            if ($listItem->getContentSection() === $this) {
                $listItem->setContentSection(null);
            }
        }

        return $this;
    }

   
}
