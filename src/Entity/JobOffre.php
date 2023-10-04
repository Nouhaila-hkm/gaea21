<?php

namespace App\Entity;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Annotation\ApiFilter;
use App\Repository\JobOffreRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ORM\Entity(repositoryClass=JobOffreRepository::class)
 * @ApiResource(
 * normalizationContext={"groups"={"offer:read"}},
 * denormalizationContext={"groups"={"offer:write", "offer:update"}},
 * collectionOperations={
 *  "get",
 *  "post"
 * },
 *  itemOperations={"get","put", "patch", "delete"},
 * 
 * )
 * @ApiFilter(SearchFilter::class, properties={"department.name": "partial", "experience.experience": "exact", "schoolLevel.level": "exact", "title"="partial"})
 * @ApiFilter(OrderFilter::class, properties={"publishedAt": "desc"})
 */
class JobOffre
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"offer:read","offer:write", "offer:update"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"offer:read","offer:write", "offer:update"})
     */
    private $title;


    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"offer:read","offer:write", "offer:update"})
     */
    private $reference;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"offer:read","offer:write", "offer:update"})
     */
    private $diploma;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"offer:read","offer:write", "offer:update"})
     */
    private $isPublished;


    // /**
    //  * @ORM\ManyToOne(targetEntity=Company::class, inversedBy="jobOffres", cascade={"persist", "remove"})
    //  * @Groups({"offer:read","offer:write"})
    //  */
    // private $company;

    /**
     * @ORM\ManyToOne(targetEntity=SchoolLevel::class, inversedBy="jobOffres" )
     * @Groups({"offer:read","offer:write", "offer:update"})
     */
    private $schoolLevel;

    /**
     * @ORM\ManyToOne(targetEntity=Experience::class, inversedBy="jobOffres")
     * @Groups({"offer:read","offer:write", "offer:update"})
     */
    private $experience;


    /**
     * @ORM\ManyToOne(targetEntity=JobType::class, inversedBy="jobOffres")
     * @Groups({"offer:read","offer:write", "offer:update"})
     */
    private $jobType;

    /**
     * @ORM\Column(type="datetime_immutable")
     * @Groups({"offer:read","offer:write"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime_immutable", nullable=true)
     * @Groups({"offer:write", "offer:read"})
     */
    private $publishedAt;

    /**
     * @ORM\ManyToOne(targetEntity=Department::class, inversedBy="jobOffres")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"offer:read","offer:write","offer:update"})
     */
    private $department;

    /**
     * @ORM\Column(type="datetime_immutable", nullable=true)
     * @Groups({"offer:read", "offer:update"})
     */
    private $updatedAt;

    /**
     * @ORM\OneToMany(targetEntity=OfferSection::class, mappedBy="jobOffre", cascade={"persist", "remove"})
     * @Groups({"offer:read","offer:write", "offer:update"})
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



    public function getisPublished(): ?bool
    {
        return $this->isPublished;
    }

    public function setisPublished(bool $isPublished): self
    {
        $this->isPublished = $isPublished;

        return $this;
    }





    public function getSchoolLevel(): ?SchoolLevel
    {
        return $this->schoolLevel;
    }

    public function setSchoolLevel(?SchoolLevel $schoolLevel): self
    {
        $this->schoolLevel = $schoolLevel;

        return $this;
    }

    public function getExperience(): ?Experience
    {
        return $this->experience;
    }

    public function setExperience(?Experience $experience): self
    {
        $this->experience = $experience;

        return $this;
    }





    public function getJobType(): ?JobType
    {
        return $this->jobType;
    }

    public function setJobType(?JobType $jobType): self
    {
        $this->jobType = $jobType;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getPublishedAt(): ?\DateTimeImmutable
    {
        return $this->publishedAt;
    }

    public function setPublishedAt(\DateTimeImmutable $publishedAt): self
    {
        $this->publishedAt = $publishedAt;

        return $this;
    }

    public function getDepartment(): ?Department
    {
        return $this->department;
    }

    public function setDepartment(?Department $department): self
    {
        $this->department = $department;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

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
            $offerSection->setJobOffre($this);
        }

        return $this;
    }

    public function removeOfferSection(OfferSection $offerSection): self
    {
        if ($this->offerSection->removeElement($offerSection)) {
            // set the owning side to null (unless already changed)
            if ($offerSection->getJobOffre() === $this) {
                $offerSection->setJobOffre(null);
            }
        }

        return $this;
    }

    // public function getEnterprise(): ?string
    // {
    //     return $this->enterprise;
    // }

    // public function setEnterprise(?string $enterprise): self
    // {
    //     $this->enterprise = $enterprise;

    //     return $this;
    // }

    // public function getLogo(): ?string
    // {
    //     return $this->logo;
    // }

    // public function setLogo(?string $logo): self
    // {
    //     $this->logo = $logo;

    //     return $this;
    // }

    public function getReference(): ?string
    {
        return $this->reference;
    }

    public function setReference(string $reference): self
    {
        $this->reference = $reference;

        return $this;
    }

    public function getDiploma(): ?string
    {
        return $this->diploma;
    }

    public function setDiploma(?string $diploma): self
    {
        $this->diploma = $diploma;

        return $this;
    }
}
