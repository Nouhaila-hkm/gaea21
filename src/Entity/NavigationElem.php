<?php

namespace App\Entity;

use App\Repository\NavigationElemRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=NavigationElemRepository::class)
 */
class NavigationElem
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $navDepth;

    /**
     * @ORM\ManyToOne(targetEntity=NavigationElem::class, inversedBy="navigElemChilds")
     */
    private $navParentId;

    /**
     * @ORM\OneToMany(targetEntity=NavigationElem::class, mappedBy="navParentId")
     */
    private $navigElemChilds;

    /**
     * @ORM\Column(type="string", length=511)
     */
    private $navName;

    /**
     * @ORM\Column(type="string", length=511)
     */
    private $pagePath;

    public function __construct()
    {
        $this->navigElemChilds = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNavDepth(): ?int
    {
        return $this->navDepth;
    }

    public function setNavDepth(int $navDepth): self
    {
        $this->navDepth = $navDepth;

        return $this;
    }

    public function getNavParentId(): ?self
    {
        return $this->navParentId;
    }

    public function setNavParentId(?self $navParentId): self
    {
        $this->navParentId = $navParentId;

        return $this;
    }

    /**
     * @return Collection|self[]
     */
    public function getNavigElemChilds(): Collection
    {
        return $this->navigElemChilds;
    }

    public function addNavigElemChild(self $navigElemChild): self
    {
        if (!$this->navigElemChilds->contains($navigElemChild)) {
            $this->navigElemChilds[] = $navigElemChild;
            $navigElemChild->setNavParentId($this);
        }

        return $this;
    }

    public function removeNavigElemChild(self $navigElemChild): self
    {
        if ($this->navigElemChilds->removeElement($navigElemChild)) {
            // set the owning side to null (unless already changed)
            if ($navigElemChild->getNavParentId() === $this) {
                $navigElemChild->setNavParentId(null);
            }
        }

        return $this;
    }

    public function getNavName(): ?string
    {
        return $this->navName;
    }

    public function setNavName(string $navName): self
    {
        $this->navName = $navName;

        return $this;
    }

    public function getPagePath(): ?string
    {
        return $this->pagePath;
    }

    public function setPagePath(string $pagePath): self
    {
        $this->pagePath = $pagePath;

        return $this;
    }
}