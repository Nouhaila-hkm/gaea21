<?php
namespace App\Service;

class RandomGenerator{



	public function __construct(){

	}



	public function genFloat(){
		return rand()/getrandmax();
	}

	public function genInt(int $min, int $max){
		return rand($min,$max);
	}

	public function getBool(){
		return $this->genTab([true,false]);
	}

	public function genTab(array $tab, int $counter=1){
		$keys=array_rand($tab,$counter);
		$values=[];
		if(is_array($keys)){
			foreach($keys as $k)$values[]=$tab[$k];
			return $values;
		}
		else return $tab[$keys];
	}

	/*public function genText(array $tab, int $min, int $max){
		$ret="";
		$length=$this->genInt($min,$max);
		for($i=0; $i<$length; $i++)$ret.=$this->genTab($tab);
		return $ret;
	}*/

	public function genFilePath(string $dirpath){
		return $dirpath."/".$this->genFileName($dirpath);
	}

	public function genDate(\DateTimeInterface $from, \DateTimeInterface $to): \DateTimeInterface{
		$date=new \DateTime();
		$date->setTimestamp($from->getTimestamp()+($to->getTimestamp()-$from->getTimestamp())*$this->genFloat());
		return $date;
	}

	public function genFileName(string $dirpath){
		$dir=opendir($dirpath);
		if($dir===false)return false;

		$files=[];
		while($name=readdir($dir))if($name!="." and $name!="..")$files[]=$name;

		return $this->genTab($files);
	}

	/*public function genText2(array $configs){
		$ret="";
		foreach($configs as $config){
			if(is_string($config[0][0])){
				$ret.=$this->genText($config[0],$config[1],$config[2]);
			}
			else{
				$length=$this->genInt($config[1],$config[2]);
				for($i=0; $i<$length; $i++) $ret.=$this->genText2($config[0]);
			}
		}
		return $ret;
	}*/

	public function generate($gen, $params=[]){
		if($gen instanceof Generator)return $gen->generate($this,$params);
		else if(is_string($gen))return $gen;
		else if(is_array($gen)){
			$ret="";
			foreach($gen as $g)$ret.=$this->generate($g, $params);
			return $ret;
		}
	}

}

abstract class Generator{

	public abstract function generate($generator, $params);

	public function callGenerator($gen, $generator, $params){
		return $generator->generate($gen,$params);
	}
}

class WordGenerator extends Generator{

	private $words;

	public function __construct(...$wordsGroups){
		$this->words=[];
		foreach($wordsGroups as $words){
			if($words instanceof WordGenerator)$this->words=array_merge($this->words,$words->words);
			else $this->words=array_merge($this->words,$words);
		}
	}

	public function generate($generator, $params){
		return $generator->genTab($this->words);
	}
}

class WordsGenerator extends Generator{

	private $words;
	private $minCount;
	private $maxCount;

	public function __construct($words,$minCount=1,$maxCount=-1){
		if($maxCount==-1)$maxCount=$minCount;
		$this->words=$words;
		$this->minCount=$minCount;
		$this->maxCount=$maxCount;
	}

	public function generate($generator, $params){
		$ret="";
		$length=$generator->genInt($this->minCount,$this->maxCount);
		for($i=0; $i<$length; $i++)$ret.=$generator->genTab($this->words);
		return $ret;
	}
}

class RepeatGenerator extends Generator{

	private $gen;
	private $minCount;
	private $maxCount;

	public function __construct($gen,$minCount=1,$maxCount=-1){
		if($maxCount==-1)$maxCount=$minCount;
		$this->gen=$gen;
		$this->minCount=$minCount;
		$this->maxCount=$maxCount;
	}

	public function generate($generator, $params){
		$ret="";
		$length=$generator->genInt($this->minCount,$this->maxCount);
		for($i=0; $i<$length; $i++)$ret.=$this->callGenerator($this->gen, $generator, $params);
		return $ret;
	}
}

class ProbabilityGenerator extends Generator{

	private $gen;
	private $probability;

	public function __construct($gen,$probability){
		$this->gen=$gen;
		$this->probability=$probability;
	}

	public function generate($generator, $params){
		if($generator->genInt(0,99)<$this->probability)return $this->callGenerator($this->gen, $generator, $params);
		else return "";
	}
}

class MapGenerator extends Generator{

	private $gen;
	private $action;

	public function __construct($gen,$action){
		$this->gen=$gen;
		$this->action=$action;
	}

	public function generate($generator, $params){
		return ($this->action)($this->callGenerator($this->gen, $generator, $params));
	}
}

class ConcatGenerator extends Generator{

	private $gens;

	public function __construct($gens){
		$this->gens=$gens;
	}

	public function generate($generator, $params){
		$ret="";
		foreach($this->gens as $gen)$ret.=$this->callGenerator($gen, $generator, $params);
		return $ret;
	}
}

class SelectGenerator extends Generator{

	private $gens;

	public function __construct($gens){
		$this->gens=$gens;
	}

	public function generate($generator, $params){
		return $this->callGenerator($generator->genTab($this->gens), $generator, $params);
	}
}
