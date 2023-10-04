<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\OfferSectionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=OfferSectionRepository::class)
 * @ApiResource(
 * formats= {"json"})
 */

class OfferSection
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"offer:read","offer:write", "offerNetwork:read", "offerNetwork:write"})
     */
    private $id;

      /**
     * @ORM\ManyToOne(targetEntity=OfferSectionTitle::class, inversedBy="offerSection", cascade={"persist"})
     * @Groups({"offer:read","offer:write","offerNetwork:read", "offerNetwork:write"})
     */
    private $offerSectionTitle;

 

 


    /**
     * @ORM\Column(type="integer")
     * @Groups({"offer:read","offer:write", "offerNetwork:read", "offerNetwork:write"})
     */
    private $sectionOrder;

    /**
     * @ORM\OneToMany(targetEntity=ContentSection::class, mappedBy="offerSection", cascade={"persist", "remove"})
     * @Groups({"offer:read","offer:write", "offerNetwork:read", "offerNetwork:write"})
     */
    private $contentSections;

    /**
     * @ORM\ManyToOne(targetEntity=JobOffre::class, inversedBy="offerSection")
     */
    private $jobOffre;

    /**
     * @ORM\ManyToOne(targetEntity=jobOfferNetwork::class, inversedBy="offerSections")
     */
    private $jobOfferNetwork;



 

    public function __construct()
    {
        $this->contentSections = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSectionOrder(): ?int
    {
        return $this->sectionOrder;
    }

    public function setSectionOrder(int $sectionOrder): self
    {
        $this->sectionOrder = $sectionOrder;

        return $this;
    }

    /**
     * @return Collection<int, ContentSection>
     */
    public function getContentSections(): Collection
    {
        return $this->contentSections;
    }

    public function addContentSection(ContentSection $contentSection): self
    {
        if (!$this->contentSections->contains($contentSection)) {
            $this->contentSections[] = $contentSection;
            $contentSection->setOfferSection($this);
        }

        return $this;
    }

    public function removeContentSection(ContentSection $contentSection): self
    {
        if ($this->contentSections->removeElement($contentSection)) {
            // set the owning side to null (unless already changed)
            if ($contentSection->getOfferSection() === $this) {
                $contentSection->setOfferSection(null);
            }
        }

        return $this;
    }

    public function getJobOffre(): ?JobOffre
    {
        return $this->jobOffre;
    }

    public function setJobOffre(?JobOffre $jobOffre): self
    {
        $this->jobOffre = $jobOffre;

        return $this;
    }

  
    

    public function getOfferSectionTitle(): ?OfferSectionTitle
    {
        return $this->offerSectionTitle;
    }

    public function setOfferSectionTitle(?OfferSectionTitle $offerSectionTitle): self
    {
        $this->offerSectionTitle = $offerSectionTitle;

        return $this;
    }

    public function getJobOfferNetwork(): ?jobOfferNetwork
    {
        return $this->jobOfferNetwork;
    }

    public function setJobOfferNetwork(?jobOfferNetwork $jobOfferNetwork): self
    {
        $this->jobOfferNetwork = $jobOfferNetwork;

        return $this;
    }

    
}
