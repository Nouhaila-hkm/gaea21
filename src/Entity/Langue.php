<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\LangueRepository;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=LangueRepository::class)
 */
class Langue
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("Contents:read")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("Contents:read")
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Length(min=2,max=2,minMessage="L'abreviation doit etre au minimum 2 caracteres")
     */
    private $Abreviation;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Assert\File(mimeTypes={ "image/png", "image/jpeg" })
     */
    private $Icons;

    /**
     * @ORM\OneToMany(targetEntity=Article::class, mappedBy="lang")
     */
    private $articles;

    /**
     * @ORM\OneToMany(targetEntity=Tag::class, mappedBy="lang")
     */
    private $tags;

    /**
     * @ORM\OneToMany(targetEntity=WebContent::class, mappedBy="lang")
     */
    private $webContents;

    public function __construct()
    {
        $this->articles = new ArrayCollection();
        $this->tags = new ArrayCollection();
        $this->contents = new ArrayCollection();
        $this->webContents = new ArrayCollection();
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

    public function getAbreviation(): ?string
    {
        return $this->Abreviation;
    }

    public function setAbreviation(?string $Abreviation): self
    {
        $this->Abreviation = $Abreviation;

        return $this;
    }

    public function getIcons()
    {
        return $this->Icons;
    }

    public function setIcons($Icons): self
    {
        $this->Icons = $Icons;

        return $this;
    }
//
//    /**
//     * @return Collection<int, Article>
//     */
//    public function getArticles(): Collection
//    {
//        return $this->articles;
//    }
//
//    public function addArticle(Article $article): self
//    {
//        if (!$this->articles->contains($article)) {
//            $this->articles[] = $article;
//            $article->setLang($this);
//        }
//
//        return $this;
//    }
//
//    public function removeArticle(Article $article): self
//    {
//        if ($this->articles->removeElement($article)) {
//            // set the owning side to null (unless already changed)
//            if ($article->getLang() === $this) {
//                $article->setLang(null);
//            }
//        }
//
//        return $this;
//    }

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
          //  $tag->setLang($this);
        }

        return $this;
    }

//    public function removeTag(Tag $tag): self
//    {
//        if ($this->tags->removeElement($tag)) {
//            // set the owning side to null (unless already changed)
//            if ($tag->getLang() === $this) {
//                $tag->setLang(null);
//            }
//        }
//
//        return $this;
//    }

//    /**
//     * @return Collection<int, ArticleContent>
//     */
//    public function getContents(): Collection
//    {
//        return $this->contents;
//    }
//
//    public function addContent(ArticleContent $content): self
//    {
//        if (!$this->contents->contains($content)) {
//            $this->contents[] = $content;
//            $content->setLang($this);
//        }
//
//        return $this;
//    }
//
//    public function removeContent(ArticleContent $content): self
//    {
//        if ($this->contents->removeElement($content)) {
//            // set the owning side to null (unless already changed)
//            if ($content->getLang() === $this) {
//                $content->setLang(null);
//            }
//        }
//
//        return $this;
//    }
//
//    /**
//     * @return Collection<int, WebContent>
//     */
//    public function getWebContents(): Collection
//    {
//        return $this->webContents;
//    }
//
//    public function addWebContent(WebContent $webContent): self
//    {
//        if (!$this->webContents->contains($webContent)) {
//            $this->webContents[] = $webContent;
//            $webContent->setLang($this);
//        }
//
//        return $this;
//    }
//
//    public function removeWebContent(WebContent $webContent): self
//    {
//        if ($this->webContents->removeElement($webContent)) {
//            // set the owning side to null (unless already changed)
//            if ($webContent->getLang() === $this) {
//                $webContent->setLang(null);
//            }
//        }
//
//        return $this;
//    }
}
