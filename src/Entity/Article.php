<?php

namespace App\Entity;

use App\Repository\ArticleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ArticleRepository::class)
 */
class Article
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $dateCreation;

    /**
     * @ORM\OneToMany(targetEntity=SocialShareCount::class, mappedBy="article", orphanRemoval=true)
     */
    private $socialShareCounts;


    /**
     * @ORM\ManyToMany(targetEntity=Tag::class, inversedBy="articles")
     */
    private $tags;

    /**
     * @ORM\Column(type="string", length=40)
     */
    private $author;

    /**
     * @ORM\Column(type="text")
     */
    private $rawText;
    /**
     * @ORM\Column(type="text")
     */
    private $image;
    
    /**
     * @return mixed
     */
    public function getImage()
    {
        return $this->image;
    }
    
    /**
     * @param mixed $image
     */
    public function setImage($image): void
    {
        $this->image = $image;
    }

    /**
     * @ORM\Column(type="text")
     */
    private $formatedText;

    /**
     * @ORM\Column(type="text")
     */
    private $title;

    /**
     * @ORM\OneToMany(targetEntity=TranslationAdapter::class, mappedBy="article")
     */
    private $translationAdapters;

    /**
     * @ORM\Column(type="boolean", options={"default" : true})
     */
    private $isFrench;

    /**
     * @ORM\Column(type="boolean", options={"default" : true})
     */
    private $isOriginal=true;

    public function __construct()
    {
        $this->tags = new ArrayCollection();
        $this->socialShareCounts = new ArrayCollection();
        $this->translationAdapters = new ArrayCollection();
        $this->isOriginal = true;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateCreation(): ?\DateTimeInterface
    {
        return $this->dateCreation;
    }

    public function setDateCreation(\DateTimeInterface $dateCreation): self
    {
        $this->dateCreation = $dateCreation;

        return $this;
    }

    /**
     * @return Collection<int, SocialShareCount>
     */
    public function getSocialShareCounts(): Collection
    {
        return $this->socialShareCounts;
    }

    public function addSocialShareCount(SocialShareCount $socialShareCount): self
    {
        if (!$this->socialShareCounts->contains($socialShareCount)) {
            $this->socialShareCounts[] = $socialShareCount;
            $socialShareCount->setArticle($this);
        }

        return $this;
    }

    public function removeSocialShareCount(SocialShareCount $socialShareCount): self
    {
        if ($this->socialShareCounts->removeElement($socialShareCount)) {
            // set the owning side to null (unless already changed)
            if ($socialShareCount->getArticle() === $this) {
                $socialShareCount->setArticle(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Tag>
     */
    public function getTags(): Collection
    {
        return $this->tags;
    }

    public function addTag(Tag $tag): self
    {
        if (!$this->tags->contains($tag)) {
            $this->tags[] = $tag;
        }

        return $this;
    }

    public function removeTag(Tag $tag): self
    {
        $this->tags->removeElement($tag);

        return $this;
    }

    public function getAuthor(): ?string
    {
        return $this->author;
    }

    public function setAuthor(string $author): self
    {
        $this->author = $author;

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

    public function getRawText(): ?string
    {
        return $this->rawText;
    }

    public function setRawText(string $rawText): self
    {
        $this->rawText = $rawText;

        return $this;
    }

    public function getFormatedText(): ?string
    {
        return $this->formatedText;
    }

    public function setFormatedText(string $formatedText): self
    {
        $this->formatedText = $formatedText;

        return $this;
    }

    public function addTranslationAdapter(TranslationAdapter $translationAdapter): self
    {
        if (!$this->translationAdapters->contains($translationAdapter)) {
            $this->translationAdapters[] = $translationAdapter;
            $translationAdapter->setArticle($this);
        }

        return $this;
    }

    public function removeTranslationAdapter(TranslationAdapter $translationAdapter): self
    {
        if ($this->translationAdapters->removeElement($translationAdapter)) {
            // set the owning side to null (unless already changed)
            if ($translationAdapter->getArticle() === $this) {
                $translationAdapter->setArticle(null);
            }
        }

        return $this;
    }
    
    /**
     * @return ArrayCollection
     */
    public function getTranslationAdapters()
    {
        return $this->translationAdapters;
    }
    
    /**
     * @param ArrayCollection $translationAdapters
     */
    public function setTranslationAdapters(ArrayCollection $translationAdapters): void
    {
        $this->translationAdapters = $translationAdapters;
    }

    public function getIsFrench(): ?bool
    {
        return $this->isFrench;
    }

    public function setIsFrench(bool $isFrench): self
    {
        $this->isFrench = $isFrench;

        return $this;
    }
    public function isOriginal(): ?bool
    {
        return $this->isOriginal;
    }

    public function setOriginal(bool $isOriginal): self
    {
        $this->isFrench = $isOriginal;

        return $this;
    }
}
