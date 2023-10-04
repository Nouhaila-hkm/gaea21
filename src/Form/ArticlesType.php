<?php

namespace App\Form;

use App\Entity\Article;
use App\Entity\Category;
use App\Entity\WebContent;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ArticlesType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('DateCreation',DateType::class)
            ->add('Date2',DateType::class)
            ->add('Date3',DateType::class)
            ->add('contents',EntityType::class,[
                'class' => WebContent::class,
                'choice_label' => 'langue',
            ])
            ->add('categories',EntityType::class,[
                'class' => Category::class,
                'choice_label' => 'name',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Article::class,
        ]);
    }
}