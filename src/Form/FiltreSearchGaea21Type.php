<?php

namespace App\Form;

use App\Entity\FiltreSearch;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class FiltreSearchGaea21Type extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('nom', TextType::class, [
                'label' => false,
                'attr' => [
                    'placeholder' => 'Mot clé',
                    'class' => 'form-control'
                ]

            ])
            ->add('domaine', TextType::class, [
                'label' => false,
                'attr' => [
                    'placeholder' => 'Domaine d\'activité'
                ]
            ])
            ->add('experience', TextType::class, [
                'label' => false,
                'attr' => [
                    'placeholder' => 'Expérience'
                ]
            ])
            ->add('niveau', TextType::class, [
                'label' => false,
                'attr' => [
                    'placeholder' => 'Niveau d\' étude'
                ]
            ])
            // ->add('submit', SubmitType::class, [
            //     'label' => 'Rechercher',
            // ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => FiltreSearch::class,
            'method' => 'get',
            'csrf_protection' => false,
        ]);
    }
}
