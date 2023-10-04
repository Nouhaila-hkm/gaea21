<?php

namespace App\Entity;

use App\Repository\TranslationAdapterRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TranslationAdapterRepository::class)
 */
class TranslationAdapter
{
    private static $typeToColumn=[
      Article::class => "article",
      Tag::class => "tag",
    ];

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Article::class, inversedBy="translationAdapters")
     */
    private $article;

    /**
     * @ORM\ManyToOne(targetEntity=Tag::class, inversedBy="translationAdapters")
     */
    private $tag;

    /**
     * @ORM\OneToOne(targetEntity=WebContent::class, mappedBy="translatedVersion", cascade={"persist", "remove"})
     */
    private $webContent;



    public function getId(): ?int
    {
        return $this->id;
    }

    public static function getColumn($type){
      return self::$typeToColumn[$type];
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

    public function getTag(): ?Tag
    {
        return $this->tag;
    }

    public function setTag(?Tag $tag): self
    {
        $this->tag = $tag;

        return $this;
    }

    public function set(string $type, $value): self
    {
        $col=self::getColumn($type);
        $this->$col = $value;
        return $this;
    }

    public function get(string $type): self
    {
        $col=self::getColumn($type);
        return $this->$col;
    }

    public function getWebContent(): ?WebContent
    {
        return $this->webContent;
    }
}
