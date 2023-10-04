<?php

namespace App\Entity;

use App\Repository\DepartmentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=DepartmentRepository::class)
 * @ApiResource(
 * denormalizationContext={"groups"={"offer:write" , "offer:update", "offerNetwork:write" , "offerNetwork:update"}},
 * collectionOperations={"get"},
 *  itemOperations={"get", "put"}
 * )
 */

class Department
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"offer:read", "offerNetwork:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"offer:read" , "offerNetwork:read"})
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"offer:read" , "offerNetwork:read"})
     */
    private $icon;

    /**
     * @ORM\OneToMany(targetEntity=JobOffre::class, mappedBy="department")
     */
    private $jobOffres;

    /**
     * @ORM\OneToMany(targetEntity=JobOfferNetwork::class, mappedBy="department")
     */
    private $jobOfferNetworks;

    public function __construct()
    {
        $this->jobOfferNetworks = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

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
            $jobOffre->setDepartment($this);
        }

        return $this;
    }

    public function removeJobOffre(JobOffre $jobOffre): self
    {
        if ($this->jobOffres->removeElement($jobOffre)) {
            // set the owning side to null (unless already changed)
            if ($jobOffre->getDepartment() === $this) {
                $jobOffre->setDepartment(null);
            }
        }

        return $this;
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
            $jobOfferNetwork->setDepartmentID($this);
        }

        return $this;
    }

    public function removeJobOfferNetwork(JobOfferNetwork $jobOfferNetwork): self
    {
        if ($this->jobOfferNetworks->removeElement($jobOfferNetwork)) {
            // set the owning side to null (unless already changed)
            if ($jobOfferNetwork->getDepartment() === $this) {
                $jobOfferNetwork->setDepartmentID(null);
            }
        }

        return $this;
    }
}
