<?php

namespace App\Form;

use App\Entity\Article;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ButtonType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormTypeInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ArticleType extends AbstractType implements FormTypeInterface
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('author',TextType::class,[
                'label'=>'Nom de l\'auteur',
                'attr'=>[
                    'placeholder'=>'Nom de l\'auteur',
                ]
            ])
            ->add('title',TextType::class,[
                'label'=>'Title',
                'attr'=>[
                    'placeholder'=>'Saisir le titre',
                     'class' => 'form-control'
                ],
               
            ])
           
           // ->add('rawText')
           ->add('dateCreation', DateType::class, [
               'widget' => 'choice',
               'input'  => 'datetime_immutable'
               
           ])
          
            ->add('isFrench',ChoiceType::class, [
                'label'=>'langue',
                'choices'  => [
//                    'French' => '1',
//                    'English' => '0',
//                    'Italiano' => '0',
                    'French' => true,
                    'English' => false,
                    'Italiano' => false,
                ]])
            ->add('image',TextType::class,[
                'label'=>'Image de l\'article',
                'attr'=>[
                   // 'class'=>'form-control'
                    'placeholder'=>'Url image article',
                ]
    
            ])
            ->add('formatedText',TextareaType::class,[
                'label'=>'Article formatedText',
                'attr'=>[
                    'height'=>'150px',
                    'placeholder'=>'Votre article',
                    'class'=>'form-floating area',
                    
                ]
            ])
            ->add('rawText',TextareaType::class,[
                'label'=>'Article rawText',
                'attr'=>[
                    'placeholder'=>'Votre article',
                    'class'=>'form-floating area',
                ]
            ])
            ->add('Ajouter',SubmitType::class,[
               'row_attr' =>[
                   //'class'=>'btn btn-outline-control'
               ],
               'label' => 'Ajouter article'
               ]
               
           )
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Article::class,
        ]);
    }
}
