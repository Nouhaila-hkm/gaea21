<?php

namespace App\Entity;

use App\Repository\DemandesRepository;
// use Doctrine\Common\Collections\ArrayCollection;
// use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DemandesRepository::class)]
class Demandes
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $titre;

    #[ORM\Column(type: 'string', length: 255)]
    private $domaine;

    #[ORM\Column(type: 'string', length: 255)]
    private $experience;

    #[ORM\Column(type: 'string', length: 255)]
    private $competence;

    #[ORM\Column(type: 'text')]
    private $description;



    public function getId(): ?int
    { 
        return $this->id;
    }



    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): self
    {
        $this->nom = $titre;
 
        return $this;
    }



    public function getDomaine(): ?string
    {
        return $this->domaine;
    }

    public function seDomaine(string $domaine): self
    {
        $this->nom = $domaine;
 
        return $this;
    }



    public function getExperience(): ?string
    {
        return $this->experience;
    }

    public function setExperience(string $experience): self
    {
        $this->nom = $experience;
 
        return $this;
    }


    public function getCompetence(): ?string
    {
        return $this->competence;
    }

    public function setCompetence(string $competence): self
    {
        $this->nom = $competence;
 
        return $this;
    }


    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->nom = $description;
 
        return $this;
    }


}
