<?php

namespace App\Entity;

use App\Repository\WebContentRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=WebContentRepository::class)
 */
class WebContent
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity=TranslationAdapter::class, inversedBy="webContent", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $frenchVersion;

    /**
     * @ORM\OneToOne(targetEntity=TranslationAdapter::class, inversedBy="webContent", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $translatedVersion;

    /**
     * @ORM\ManyToOne(targetEntity=Langue::class, inversedBy="webContents")
     * @ORM\JoinColumn(nullable=false)
     */
    private $lang;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFrenchVersion(): ?TranslationAdapter
    {
        return $this->frenchVersion;
    }

    public function setFrenchVersion(TranslationAdapter $frenchVersion): self
    {
        $this->frenchVersion = $frenchVersion;

        return $this;
    }

    public function getTranslatedVersion(): ?TranslationAdapter
    {
        return $this->translatedVersion;
    }

    public function setTranslatedVersion(TranslationAdapter $translatedVersion): self
    {
        $this->translatedVersion = $translatedVersion;

        return $this;
    }

    public function getLang(): ?Langue
    {
        return $this->lang;
    }

    public function setLang(?Langue $lang): self
    {
        $this->lang = $lang;

        return $this;
    }
}
