<?php

namespace App\Entity;

use App\Repository\OfferSectionTitleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=OfferSectionTitleRepository::class)
 * @ApiResource()
 */
class OfferSectionTitle
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"offer:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"offer:read"})
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255)
     *  @Groups({"offer:read"})
     */
    private $icon;

    /**
     * @ORM\OneToMany(targetEntity=OfferSection::class, mappedBy="offerSectionTitle")
     */
    private $offerSection;

    public function __construct()
    {
        $this->offerSection = new ArrayCollection();
    }



   

 

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getIcon(): ?string
    {
        return $this->icon;
    }

    public function setIcon(string $icon): self
    {
        $this->icon = $icon;

        return $this;
    }

    /**
     * @return Collection<int, OfferSection>
     */
    public function getOfferSection(): Collection
    {
        return $this->offerSection;
    }

    public function addOfferSection(OfferSection $offerSection): self
    {
        if (!$this->offerSection->contains($offerSection)) {
            $this->offerSection[] = $offerSection;
            $offerSection->setOfferSectionTitle($this);
        }

        return $this;
    }

    public function removeOfferSection(OfferSection $offerSection): self
    {
        if ($this->offerSection->removeElement($offerSection)) {
            // set the owning side to null (unless already changed)
            if ($offerSection->getOfferSectionTitle() === $this) {
                $offerSection->setOfferSectionTitle(null);
            }
        }

        return $this;
    }

   
}
