<?php

namespace App\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

$uniqueCounter=0;
function unique($name): string{
  global $uniqueCounter;
  $uniqueCounter++;
  return $name.$uniqueCounter;
}
function lunique($name): string{
  global $uniqueCounter;
  return $name.$uniqueCounter;
}

/**
 * @method array|null|int findByFilters(array $filters)
 */
abstract class BetterServiceEntityRepository extends ServiceEntityRepository
{



  private $name;
  private $perpage;



  public function __construct(ManagerRegistry $registry, string $class, string $name)
  {
      parent::__construct($registry, $class);
      $this->name=$name;
  }



  public function setPerPage($perpage){
    $this->perpage=$perpage;
  }

  public function getAccessibleFilters(){
    return [];
  }

  public function filterToAssociativeUnion($filters){
    $ret=[];
    foreach($filters as $value){
      if(is_array($value)){
        $key=$value[0];
        unset($value[0]);
        if(!isset($ret[$key]))$ret[$key]=array_values($value);
        else $ret[$key]=array_merge($value,$ret[$key]);
      }
      else if(!isset($ret[$value]))$ret[$value]=[];
    }
    return $ret;
  }

  public function filterToAssociative($filters){
    $ret=[];
    foreach($filters as $value){
      if(is_array($value)){
        $key=$value[0];
        unset($value[0]);
        if(!isset($ret[$key]))$ret[$key]=[];
        $ret[$key][]=array_values($value);
      }
      else if(!isset($ret[$value]))$ret[$value]=[];
    }
    return $ret;
  }

  public function associativeToFilter($filters){
    $ret=[];
    foreach($filters as $key => $values){
      foreach($values as $value){
        $ret[]=array_merge([$key],$value);
      }
    }
    return $ret;
  }

  public function getFiltersOfQuery(iterable $queries):array{
    $acc=$this->getAccessibleFilters();
    $ret=[];
    foreach($queries as $key => $value){
      if(isset($acc[$key])){
        $ret[]=array_merge([$acc[$key]],explode(";",$value));
      }
    }
    return $ret;
  }

  public function queryBuilder()
  {
      return $this->createQueryBuilder($this->name);
  }

  public function filterCount($query)
  {
      return $query
        ->select("count(".$this->name.")");
  }

  public function filterField($query,$field,$value)
  {
      return $query
        ->andWhere($this->name.".".$field."=:".$field)
        ->setParameter(":".$field,$value);
  }

  public function filterLimit($query,$first,$count){
    return $query
      ->setFirstResult($first)
      ->setMaxResults($count);
  }

  public function filterUnique($query,$first,$count){
    return $query
      ->setUnique($first);
  }

  public function filterPage($query,$pagenum)
  {
    return $this->filterLimit($query, $this->perpage*$pagenum, $this->perpage);
  }

  public function filterFirst($query){
    return $this->filterLimit($query,0,1);
  }

  public function filterId($query,$id){
    return $this->filterField($query,"id",$id);
  }

  public function filterQuery($query,array $filters){
    foreach($filters as $filter){
      //NAME
      $func=is_array($filter) ? $filter[0] : $filter;
      $func="filter".ucfirst($func);
      //ARGS
      $args=null;
      if(is_array($filter)){
        $args=$filter;
        $args[0]=$query;
      }
      else{
        $args=[$query];
      }
      //USE
      $query=call_user_func_array([$this,$func],$args);
    }
    return $query;
  }

  public function queryByFilter(array $filters=[]){
    return $this->filterQuery($this->queryBuilder(),$filters);
  }

  public function findByFilter(array $filters=[]): ?array{
    return $this
      ->queryByFilter($filters)
      ->getQuery()
      ->getResult();
  }

  public function countByFilter(array $filters=[]): int{
    $filters[]="count";
    return $this->findByFilter($filters)[0][1];
  }

  public function countQuery($query){
    $filters[]="count";
    return $this->filterQuery($query, $filters)->getQuery()->getResult()[0][1];
  }

  public function countPageByFilter(array $filters=[]): int{
    $count=$this->countByFilter($filters);
    return $count/$this->perpage + ($count/$this->perpage==0 ? 0 : 1);
  }

}
