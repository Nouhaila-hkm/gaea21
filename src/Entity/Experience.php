<?php

namespace App\Entity;

use App\Repository\ExperienceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ExperienceRepository::class)
 * @ApiResource(
 * collectionOperations={"get"},
 *  itemOperations={"get", "put"}
 * )
 */
class Experience
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"offer:read","offerNetwork:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"offer:read", "offerNetwork:read"})
     */
    private $experience;

    /**
     * @ORM\OneToMany(targetEntity=JobOffre::class, mappedBy="experience")
     */
    private $jobOffres;

    /**
     * @ORM\OneToMany(targetEntity=JobOfferNetwork::class, mappedBy="experience")
     */
    private $jobOfferNetworks;

    public function __construct()
    {
        $this->jobOffres = new ArrayCollection();
        $this->jobOfferNetworks = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getExperience(): ?string
    {
        return $this->experience;
    }

    public function setExperience(string $experience): self
    {
        $this->experience = $experience;

        return $this;
    }

    /**
     * @return Collection<int, JobOffre>
     */
    public function getJobOffres(): Collection
    {
        return $this->jobOffres;
    }

    public function addJobOffre(JobOffre $jobOffre): self
    {
        if (!$this->jobOffres->contains($jobOffre)) {
            $this->jobOffres[] = $jobOffre;
            $jobOffre->setExperience($this);
        }

        return $this;
    }

    public function removeJobOffre(JobOffre $jobOffre): self
    {
        if ($this->jobOffres->removeElement($jobOffre)) {
            // set the owning side to null (unless already changed)
            if ($jobOffre->getExperience() === $this) {
                $jobOffre->setExperience(null);
            }
        }

        return $this;
    }

    public function __toString(): string
    {
        return $this->experience;
    }

    /**
     * @return Collection<int, JobOfferNetwork>
     */
    public function getJobOfferNetworks(): Collection
    {
        return $this->jobOfferNetworks;
    }

    public function addJobOfferNetwork(JobOfferNetwork $jobOfferNetwork): self
    {
        if (!$this->jobOfferNetworks->contains($jobOfferNetwork)) {
            $this->jobOfferNetworks[] = $jobOfferNetwork;
            $jobOfferNetwork->setExperience($this);
        }

        return $this;
    }

    public function removeJobOfferNetwork(JobOfferNetwork $jobOfferNetwork): self
    {
        if ($this->jobOfferNetworks->removeElement($jobOfferNetwork)) {
            // set the owning side to null (unless already changed)
            if ($jobOfferNetwork->getExperience() === $this) {
                $jobOfferNetwork->setExperience(null);
            }
        }

        return $this;
    }

}
