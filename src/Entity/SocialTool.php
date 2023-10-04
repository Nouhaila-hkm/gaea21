<?php

namespace App\Entity;

use App\Repository\SocialToolRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=SocialToolRepository::class)
 */
class SocialTool
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
    private $color;

    /**
     * @ORM\Column(type="string", length=30)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=200)
     */
    private $sharelink;

    /**
     * @ORM\Column(type="string", length=200)
     */
    private $homepath;

    /**
     * @ORM\OneToMany(targetEntity=SocialShareCount::class, mappedBy="tool", orphanRemoval=true)
     */
    private $shareCounts;

    public function __construct()
    {
        $this->shareCounts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getColor(): ?int
    {
        return $this->color;
    }

    public function getColorCode(): ?string
    {
        return sprintf("#%06x",$this->color);
    }

    public function getForegroundColor(): ?string
    {
        $luminosity=$this->color%256+$this->color%(256*256)/256+$this->color/256/256;
        return $luminosity<500 ? 0xffffff: 0x000000;
    }

    public function createShareLink($url,$name){
      $ret=$this->getSharelink();
      $ret=str_replace("%URL%",$url,$ret);
      $ret=str_replace("%NAME%",$name,$ret);
      return $ret;
    }

    public function getForegroundColorCode(): ?string
    {
        return sprintf("#%06x",$this->getForegroundColor());
    }

    public function setColor(int $color): self
    {
        $this->color = $color;

        return $this;
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

    public function getSharelink(): ?string
    {
        return $this->sharelink;
    }

    public function setSharelink(string $sharelink): self
    {
        $this->sharelink = $sharelink;

        return $this;
    }

    public function getHomepath(): ?string
    {
        return $this->homepath;
    }

    public function setHomepath(string $homepath): self
    {
        $this->homepath = $homepath;

        return $this;
    }

    /**
     * @return Collection<int, SocialShareCount>
     */
    public function getShareCounts(): Collection
    {
        return $this->shareCounts;
    }

    public function addShareCount(SocialShareCount $shareCount): self
    {
        if (!$this->shareCounts->contains($shareCount)) {
            $this->shareCounts[] = $shareCount;
            $shareCount->setTool($this);
        }

        return $this;
    }

    public function removeShareCount(SocialShareCount $shareCount): self
    {
        if ($this->shareCounts->removeElement($shareCount)) {
            // set the owning side to null (unless already changed)
            if ($shareCount->getTool() === $this) {
                $shareCount->setTool(null);
            }
        }

        return $this;
    }
}
