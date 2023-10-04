<?php

namespace App\Entity;

use App\Repository\SocialShareCountRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=SocialShareCountRepository::class)
 */
class SocialShareCount
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Article::class, inversedBy="socialShareCounts")
     * @ORM\JoinColumn(nullable=false)
     */
    private $article;

    /**
     * @ORM\ManyToOne(targetEntity=SocialTool::class, inversedBy="shareCounts")
     * @ORM\JoinColumn(nullable=false)
     */
    private $tool;

    /**
     * @ORM\Column(type="integer")
     */
    private $count;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getArticle(): ?Article
    {
        return $this->article;
    }

    public function setArticle(?Article $article): self
    {
        $this->article = $article;

        return $this;
    }

    public function getTool(): ?SocialTool
    {
        return $this->tool;
    }

    public function setTool(?SocialTool $tool): self
    {
        $this->tool = $tool;

        return $this;
    }

    public function getCount(): ?int
    {
        return $this->count;
    }

    public function setCount(int $count): self
    {
        $this->count = $count;

        return $this;
    }

    public function upCount(int $offset=1): self
    {
        $this->count += $offset;

        return $this;
    }
}
