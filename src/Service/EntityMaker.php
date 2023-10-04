<?php
namespace App\Service;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\KernelInterface;
use Doctrine\ORM\EntityManagerInterface;

class EntityMaker{



	private $manager;



  public function __construct(EntityManagerInterface $manager)
  {
      $this->manager = $manager;
  }


	private $entityType;
	private $entityParameters;
	public function setEntityType($type,$parameters){
		$this->entityType=$type;
		$this->entityParameters=$parameters;
	}

	public function create(...$values){
		$rep=$this->manager->getRepository($this->entityType);

		$maxi=count($values);
		$ret=new $this->entityType();
		for($i=0; $i<$maxi; $i++){
			$funcname="set".ucfirst($this->entityParameters[$i]);
			$funcname2="add".ucfirst($this->entityParameters[$i]);
			if(method_exists($ret,$funcname)){
				$ret->$funcname($values[$i]);
			}
			else if(method_exists($ret,$funcname2)){
				foreach($values[$i] as $v){
					$ret->$funcname2($v);
				}
			}
		}
		$this->manager->persist($ret);

		return $ret;
	}

	public function flush(){
		$this->manager->flush();
	}


}
