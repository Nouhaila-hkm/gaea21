<?php
    
    namespace App\Repository;
    
    use App\Entity\Article;
    use Doctrine\ORM\Query;
    use Doctrine\Persistence\ManagerRegistry;
    
    /**
     * @method Article|null find($id, $lockMode = null, $lockVersion = null)
     * @method Article|null findOneBy(array $criteria, array $orderBy = null)
     * @method Article[]    findAll()
     * @method Article[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
     */
    class ArticleRepository extends BetterServiceEntityRepository
    {
        
        
        public function __construct(ManagerRegistry $registry)
        {
            parent::__construct($registry, Article::class, "article");
        }
        
        
        public function getAccessibleFilters()
        {
            return [
                "tag" => "tagName",
                "search" => "text",
                "category" => "categoryId",
                "page" => "page"
            ];
        }
        
        public function filterComplete($query)
        {
            return $query
                ->innerJoin("article.tags", "tag")
                ->innerJoin("tag.categories", "category")
                ->distinct();
        }
        
        public function filterFrench($query)
        {
            return $query
                ->andWhere("article.isFrench=true");
        }
        
        public function filterNewestFirst($query)
        {
            return $query
                ->orderBy('article.dateCreation', 'DESC');
        }
        
        public function filterText($query, $text)
        {
            $varn = unique("text");
            return $query
                ->andWhere("article.title LIKE :$varn")
                ->setParameter($varn, "%$text%");
        }
        
        public function filterTag($query, $tag)
        {
            $varn = unique("tag");
            return $query
                ->andWhere("tag=:$varn")
                ->setParameter($varn, $tag);
        }
        
        public function filterCategoryId($query, $categid)
        {
            $varn = unique("categid");
            return $query
                ->andWhere("category.id=:$varn")
                ->setParameter($varn, $categid);
        }
        
        public function filterTagName($query, ...$names)
        {
            $varn = unique("names");
            return $query
                ->andWhere("tag.normalized in (:$varn)")
                ->setParameter($varn, $names);
        }
        
        public function findByLang($lang, $first = 0, $count = 50)
        {
            return $this->findByFilter([
                "joinall",
                ["lang", $lang],
                ["limit", $first, $count]
            ]);
        }
        
        public function countByLang($lang): int
        {
            return $this->findByFilter([
                "joinall",
                ["lang", $lang],
                ["count"]
            ])[0][1];
        }
        public function deleteArticle($id){
            return $this->createQueryBuilder('article')
                ->andWhere('article.id=:id')
                ->setParameter('id',$id)
                ->getQuery()
                ->execute();
            
        }
        public function getArticleByLangue($lang)
        {
           // return $this->createQueryBuilder('article');
           switch ($lang) {
                case  "FR":
                    return $this->createQueryBuilder('article')
                        ->andWhere('article.isFrench=1')
                        ->getQuery()
                        ->getResult();
                    break;
                case "EN" :
                    return $this->createQueryBuilder('article')
                        ->andWhere('article.isFrench=0')
                        // ->innerJoin('article.id','artid','JOIN::WITH','translater_adapter.id')
                        //->innerJoin('translationAdapters','ta')
                        ->getQuery()
                        ->getResult();
                    break;
                case "IT" :
                    return $this->createQueryBuilder('article')
                        ->andWhere('article.isFrench=3')
                        ->getQuery()
                        ->getResult();
                    break;
                case "ES" :
                    return $this->createQueryBuilder('article')
                        ->andWhere('article.isFrench=4')
                        ->getQuery()
                        ->getResult();
                    break;
            }
        }
        public function getArticleByLangueId($idLangue){
            return $this->createQueryBuilder('article')
                ->innerJoin('article.translationAdapters','adapter')
                ->innerJoin('adapter.webContent','webcontent')
                ->andWhere('webcontent.lang=:langId')
                ->setParameter("langId",$idLangue)
                ->getQuery()
                ->getResult();
        }
        public function getArticleByAbreviation($abbr){
            return $this->createQueryBuilder('article')
                ->innerJoin('article.translationAdapters','adapter')
                ->innerJoin('adapter.webContent','webcontent')
                ->innerJoin('webcontent.lang','lang')
                ->andWhere('lang.Abreviation=:abbr')
                ->setParameter("abbr",$abbr)
                ->getQuery()
                ->getResult();
        }
        public function findA($langue) : Query
        {
            return $this->createQueryBuilder('article')
                ->innerJoin('article.langue_article','langue')
                // ->where('langue.name=:langue')
                ->andWhere('langue.abreviation=:langue')
                ->setParameter('langue',$langue)
                ->getQuery();
        
        }
        public function findAllArticles():Query{
            return $this->createQueryBuilder('article')
                //->innerJoin('article.langue_article','langue')
                //->andWhere('langue.abreviation=fr')
                ->getQuery();
               // ->getResult();
        }
        public function remove(Article $entity, bool $flush = false): void
        {
            $this->getEntityManager()->remove($entity);
        
            if ($flush) {
                $this->getEntityManager()->flush();
            }
        }
        public function getAll()
        {
            return $this->createQueryBuilder('article')
                ->getQuery()
                ->getResult();
        }
        
        public function findByLangIsFr()
        {
            return $this->createQueryBuilder('article')
                ->andWhere('article.isFrench=1')
                ->getQuery()
                ->getResult();
        }
        
        public function findByTransAdapterId($id)
        {
            
            return $this->createQueryBuilder('article')
                ->andWhere('article.id=:id')
                ->setParameter('id', $id)
                ->getQuery()
                ->getResult();
        }
        
    }
