<?php

namespace App\Entity;

use App\Repository\AnnounceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=AnnounceRepository::class)
 */
class Announce
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    #[Groups(["project:read"])]
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups(["project:read"])]
    private $reference;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups(["project:read"])]
    private $title;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdDate;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedDate;

    /**
     * @ORM\OneToMany(targetEntity=AnnounceSection::class, mappedBy="announce", orphanRemoval=true)
     */
    private $announceSections;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="announces")
     */
    private $user;

    /**
     * @ORM\Column(type="array", nullable=true)
     */
    private $collaborators = [];

    /**
     * @ORM\ManyToOne(targetEntity=Project::class, inversedBy="announces")
     */
    private $project;

    public function __construct()
    {
        $this->announceSections = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getCreatedDate(): ?\DateTimeInterface
    {
        return $this->createdDate;
    }

    public function setCreatedDate(\DateTimeInterface $createdDate): self
    {
        $this->createdDate = $createdDate;

        return $this;
    }

    public function getUpdatedDate(): ?\DateTimeInterface
    {
        return $this->updatedDate;
    }

    public function setUpdatedDate(?\DateTimeInterface $updatedDate): self
    {
        $this->updatedDate = $updatedDate;

        return $this;
    }

    /**
     * @return Collection<int, AnnounceSection>
     */
    public function getAnnounceSections(): Collection
    {
        return $this->announceSections;
    }

    public function addAnnounceSection(AnnounceSection $announceSection): self
    {
        if (!$this->announceSections->contains($announceSection)) {
            $this->announceSections[] = $announceSection;
            $announceSection->setAnnounce($this);
        }

        return $this;
    }

    public function removeAnnounceSection(AnnounceSection $announceSection): self
    {
        if ($this->announceSections->removeElement($announceSection)) {
            // set the owning side to null (unless already changed)
            if ($announceSection->getAnnounce() === $this) {
                $announceSection->setAnnounce(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getCollaborators(): ?array
    {
        return $this->collaborators;
    }

    public function setCollaborators(?array $collaborators): self
    {
        $this->collaborators = $collaborators;

        return $this;
    }

    public function getProject(): ?Project
    {
        return $this->project;
    }

    public function setProject(?Project $project): self
    {
        $this->project = $project;

        return $this;
    }
}
