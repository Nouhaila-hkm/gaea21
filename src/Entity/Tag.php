<?php

namespace App\Entity;

use App\Repository\TagRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TagRepository::class)
 */
class Tag
{
  /**
   * @ORM\Id
   * @ORM\GeneratedValue
   * @ORM\Column(type="integer")
   */
  private $id;

  /**
   * @ORM\Column(type="string", length=40)
   */
  private $text;

  /**
   * @ORM\Column(type="string", length=40)
   */
  private $normalized;

  /**
   * @ORM\ManyToMany(targetEntity=Article::class, mappedBy="tags")
   */
  private $articles;

  /**
   * @ORM\ManyToMany(targetEntity=TagCategory::class, mappedBy="tags")
   */
  private $categories;

  /**
   * @ORM\OneToMany(targetEntity=TranslationAdapter::class, mappedBy="tag")
   */
  private $translationAdapters;

  /**
   * @ORM\Column(type="boolean", options={"default" : true})
   */
  private $french=true;



  public function __construct()
  {
      $this->articles = new ArrayCollection();
      $this->category = new ArrayCollection();
      $this->translationAdapters = new ArrayCollection();
  }



  public function getId(): ?int
  {
      return $this->id;
  }

  public function getNormalized(): ?string
  {
      return $this->normalized;
  }

  public function setRawText(string $text): self
  {
      $this->text = $text;

      return $this;
  }

  public function getRawText(): ?string
  {
      return $this->text;
  }

  public function setNormalized(string $text): self
  {
      $this->normalized = $text;

      return $this;
  }

  /**
   * @return Collection<int, Article>
   */
  public function getArticles(): Collection
  {
      return $this->articles;
  }

  public function addArticle(Article $article): self
  {
      if (!$this->articles->contains($article)) {
          $this->articles[] = $article;
          $article->addTag($this);
      }

      return $this;
  }

  public function removeArticle(Article $article): self
  {
      if ($this->articles->removeElement($article)) {
          $article->removeTag($this);
      }

      return $this;
  }

  /**
   * @return Collection<int, TagCategory>
   */
  public function getCategories(): Collection
  {
      return $this->category;
  }

  public function addCategory(TagCategory $category): self
  {
      if (!$this->category->contains($category)) {
          $this->category[] = $category;
          $category->addTag($this);
      }

      return $this;
  }

  public function removeCategory(TagCategory $category): self
  {
      if ($this->category->removeElement($category)) {
          $category->removeTag($this);
      }

      return $this;
  }

  /**
   * @return Collection<int, TranslationAdapter>
   */
  public function getTranslationAdapters(): Collection
  {
      return $this->translationAdapters;
  }

  public function addTranslationAdapter(TranslationAdapter $translationAdapter): self
  {
      if (!$this->translationAdapters->contains($translationAdapter)) {
          $this->translationAdapters[] = $translationAdapter;
          $translationAdapter->setTags($this);
      }

      return $this;
  }

  public function removeTranslationAdapter(TranslationAdapter $translationAdapter): self
  {
      if ($this->translationAdapters->removeElement($translationAdapter)) {
          // set the owning side to null (unless already changed)
          if ($translationAdapter->getTags() === $this) {
              $translationAdapter->setTags(null);
          }
      }

      return $this;
  }

  public function isFrench(): ?bool
  {
      return $this->french;
  }

  public function setFrench(bool $french): self
  {
      $this->french = $french;

      return $this;
  }
}
