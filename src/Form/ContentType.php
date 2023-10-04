<?php

namespace App\Form;

use App\Entity\Langue;
use App\Entity\Article;
use App\Entity\WebContent;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class ContentType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('rawText',TextareaType::class)
            ->add('formatedText',TextareaType::class)
            ->add('articleRelated',EntityType::class,
            [
                'class' => Article::class,
                'choice_label' => 'id',
            ])
            ->add('langueContent',EntityType::class,
            [
                'class' => Langue::class,
                'choice_label' => 'name',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => WebContent::class,
        ]);
    }
}