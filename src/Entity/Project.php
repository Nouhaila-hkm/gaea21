<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use App\Entity\Formulaire;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProjectRepository;
use ApiPlatform\Metadata\GetCollection;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ProjectRepository::class)
 */
#[ApiResource(
    shortName: 'Project',
    operations: [
        new Get(
            normalizationContext: [
                'groups' => ["project:read"],
            ],
        ),
        new GetCollection(),
        new Post(),
        new Put(),
        new Patch(),
    ],
    formats: [
        'json',
        'html',
    ],
    normalizationContext: [
        'groups' => ["project:read","project:write"],
    ],
    denormalizationContext: [
        'groups' => ["project:write","project:read"],
    ],
)]
class Project
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    #[ApiProperty(["identifier"=>true])]
    #[Groups(["project:read"])]
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups(["project:read", 'project:write'])]
    private $projectName;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups(["project:read", 'project:write'])]
    private $projectUrl;

    /**
     * @ORM\ManyToMany(targetEntity=Formulaire::class, inversedBy="projects", fetch="EXTRA_LAZY")
     */
    #[Groups(["project:read", "project:write"])]
    #[ApiSubresource]
    private $form = null ;

    /**
     * @ORM\OneToMany(targetEntity=Announce::class, mappedBy="project")
     */
    #[Groups(["project:read", "project:write"])]
    private $announces;

    public function __construct()
    {
        $this->form = new ArrayCollection();
        $this->announces = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProjectName(): ?string
    {
        return $this->projectName;
    }

    public function setProjectName(string $projectName): self
    {
        $this->projectName = $projectName;

        return $this;
    }

    public function getProjectUrl(): ?string
    {
        return $this->projectUrl;
    }

    public function setProjectUrl(string $projectUrl): self
    {
        $this->projectUrl = $projectUrl;

        return $this;
    }

    /**
     * @return Collection<int, Formulaire>
     */
    public function getForm(): Collection
    {
        return $this->form;
    }

    public function addForm(Formulaire $form): self
    {
        if (!$this->form->contains($form)) {
            $this->form[] = $form;
        }

        return $this;
    }

    public function removeForm(Formulaire $form): self
    {
        $this->form->removeElement($form);

        return $this;
    }

    /**
     * @return Collection<int, Announce>
     */
    public function getAnnounces(): Collection
    {
        return $this->announces;
    }

    public function addAnnounce(Announce $announce): self
    {
        if (!$this->announces->contains($announce)) {
            $this->announces[] = $announce;
            $announce->setProject($this);
        }

        return $this;
    }

    public function removeAnnounce(Announce $announce): self
    {
        if ($this->announces->removeElement($announce)) {
            // set the owning side to null (unless already changed)
            if ($announce->getProject() === $this) {
                $announce->setProject(null);
            }
        }

        return $this;
    }
}
