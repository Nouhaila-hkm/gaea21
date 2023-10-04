<?php

namespace App\Entity;


use App\Repository\JobOfferNetworkRepository;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=JobOfferNetworkRepository::class)
 * @ApiResource(
 * normalizationContext={"groups"={"offerNetwork:read"}},
 * denormalizationContext={"groups"={"offerNetwork:write", "offerNetwork:update"}},
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

class JobOfferNetwork
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"offerNetwork:read","offerNetwork:write", "offerNetwork:update"})     * 
     */
    private $id;

    

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"offerNetwork:read","offerNetwork:write", "offerNetwork:update"})
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"offerNetwork:read","offerNetwork:write", "offerNetwork:update"})
     */
    private $reference;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"offerNetwork:read","offerNetwork:write", "offerNetwork:update"})
     */
    private $diploma;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"offerNetwork:read","offerNetwork:write", "offerNetwork:update"})
     */
    private $isPublished;

    /**
     * @ORM\ManyToOne(targetEntity=SchoolLevel::class, inversedBy="jobOfferNetworks")
     * @Groups({"offerNetwork:read","offerNetwork:write", "offerNetwork:update"})
     */
    private $schoolLevel;

    /**
     * @ORM\ManyToOne(targetEntity=Experience::class, inversedBy="jobOfferNetworks")
     * @Groups({"offerNetwork:read","offerNetwork:write", "offerNetwork:update"})
     */
    private $experience;

    /**
     * @ORM\ManyToOne(targetEntity=JobType::class, inversedBy="jobOfferNetworks")
     * @Groups({"offerNetwork:read","offerNetwork:write", "offerNetwork:update"})
     */
    private $jobType;

    /**
     * @ORM\Column(type="datetime_immutable")
     * @Groups({"offerNetwork:read","offerNetwork:write"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime_immutable", nullable=true)
     * @Groups({"offerNetwork:read","offerNetwork:write"})
     */
    private $publishedAt;

    /**
     * @ORM\ManyToOne(targetEntity=Department::class, inversedBy="jobOfferNetworks")
     * @Groups({"offerNetwork:read","offerNetwork:write", "offerNetwork:update"})
     */
    private $department;

    /**
     * @ORM\Column(type="datetime_immutable", nullable=true)
     * @Groups({"offerNetwork:read","offerNetwork:write"})
     */
    private $updatedAt;

    

    /**
     * @ORM\OneToMany(targetEntity=OfferSection::class, mappedBy="jobOfferNetwork")
     */
    private $offerSections;

    public function __construct()
    {
        $this->offerSections = new ArrayCollection();
    }
    private $offerSection;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSchoolLevelId(): ?SchoolLevel
    {
        return $this->schoolLevel;
    }

    public function setSchoolLevelId(?SchoolLevel $schoolLevel): self
    {
        $this->schoolLevel = $schoolLevel;

        return $this;
    }

    public function getExperienceId(): ?Experience
    {
        return $this->experience;
    }

    public function setExperienceId(?Experience $experience): self
    {
        $this->experience = $experience;

        return $this;
    }

    public function getJobTypeId(): ?JobType
    {
        return $this->jobType;
    }

    public function setJobTypeId(?JobType $jobType): self
    {
        $this->jobType = $jobType;

        return $this;
    }

    public function getDepartmentId(): ?Department
    {
        return $this->department;
    }

    public function setDepartmentId(?Department $department): self
    {
        $this->department = $department;

        return $this;
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

    public function isIsPublished(): ?bool
    {
        return $this->isPublished;
    }

    public function setIsPublished(?bool $isPublished): self
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

    public function setPublishedAt(?\DateTimeImmutable $publishedAt): self
    {
        $this->publishedAt = $publishedAt;

        return $this;
    }

    public function getDepartment(): ?Department
    {
        return $this->department;
        return $this->publishedAt;
    }

   

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * @return Collection<int, OfferSection>
     */
    public function getOfferSections(): Collection
    {
        return $this->offerSections;
    }

    public function addOfferSection(OfferSection $offerSection): self
    {
        if (!$this->offerSections->contains($offerSection)) {
            $this->offerSections[] = $offerSection;
            $offerSection->setJobOfferNetwork($this);
        }

        return $this;
        return $this->updatedAt;
    }

    public function removeOfferSection(OfferSection $offerSection): self
    {
        if ($this->offerSections->removeElement($offerSection)) {
            // set the owning side to null (unless already changed)
            if ($offerSection->getJobOfferNetwork() === $this) {
                $offerSection->setJobOfferNetwork(null);
            }
        }
       

        return $this;
    }
}
