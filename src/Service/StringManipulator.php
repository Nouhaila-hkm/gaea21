<?php
namespace App\Service;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\KernelInterface;

class StringManipulator extends AbstractExtension{



	private $kernel;



  public function __construct(KernelInterface $kernel)
  {
      $this->kernel = $kernel;
  }



	public function truncateHtml($text,$start,$charcount,$keepword=false,$separators=" \t\n\r,.;!?:()"){
		$ret="";
		$added=0;
		$doadd=true;
		$count=0;
		$inbalise=false;
		for($i=0; $i<strlen($text); $i++){
			$char=$text[$i];
			if($char=="<"){
				$inbalise=true;
				$ret.=$char;
			}
			else if($inbalise){
				if($char==">")$inbalise=false;
				$ret.=$char;
			}
			else if($doadd){
				if($count>=$start){
					$added++;
					$ret.=$char;
					if($added>=$charcount && (strpos($separators,$char)!==false||!$keepword) ){
						$doadd=false;
					}
				}
				else $count++;
			}
		}
		return $ret;
	}

	public function filterCharAfter(string $str,string $chars, string $ignored, callable $filter){
	  $ret="";
	  $len=strlen($str);
	  $tofilter=false;
	  for($i=0; $i<$len; $i++){
	    if(!str_contains($ignored,$str[$i])){
	      if($tofilter){
	        $ret.=$filter($str[$i]);
	        $tofilter=false;
	      }
	      else $ret.=$str[$i];
	      if(str_contains($chars,$str[$i])){
	        $tofilter=true;
	      }
	    }
	    else $ret.=$str[$i];
	  }
	  return $ret;
	}

	public function ucsentences(string $str){
	  return ucfirst($this->filterCharAfter($str, ".?!", " \n\r\t", "strtoupper"));
	}

	public function removeGET($removed){
		$request = Request::createFromGlobals();

		$removedSet=[];
		foreach($removed as $r)$removedSet[$r]=1;
		$final=[];
		foreach($request->query as $key => $value){
			if(!isset($removedSet[$key])){
				$finalvalues=[];
				foreach(explode(";",$value) as $v){
					if(!isset($removedSet[$key."=".$v]))$finalvalues[]=$v;
				}
				if(count($finalvalues)>0)$final[$key]=implode(";",$finalvalues);
			}
		}
		return $this->assembleGET($final);
	}

	public function assembleGET($gets){
		if(count($gets)==0){
			return "";
		}
		else{
			$first=true;
			$ret="?";
			foreach($gets as $key => $value){
				if($value!=null){
					if(!$first){
						$ret.="&";
					}
					else $first=false;
					$ret.=$key."=".$value;
				}
			}
			return $ret;
		}
		return "";
	}

	public function assembleGETFormHidden($gets){
		if(count($gets)==0){
			return "";
		}
		else{
			$ret="";
			foreach($gets as $key => $value){
				if($value!=null){
					$ret.="<input type='hidden' name='$key' value='$value'/>";
				}
			}
			return $ret;
		}
		return "";
	}

	public function filteredGET(array|bool $keeped, array $new){
		$request = Request::createFromGlobals();
		$final=[];
		foreach($request->query as $key => $value){
			if($keeped===true||in_array($key,$keeped)) $final[$key]=$value;
		}
		$final=$new+$final;
		return $final;
	}

	public function createGET(array|bool $keeped,array $new){
		return $this->assembleGET($this->filteredGET($keeped,$new));
	}

	public function createGETFormHidden(array|bool $keeped,array $new){
		return $this->assembleGETFormHidden($this->filteredGET($keeped,$new));
	}

	public function textMap(string $text,array $from,array $to){
		for($i=0; $i<count($from); $i++){
			$text=str_replace($from[$i],$to[$i],$text);
		}
		return $text;
	}

	public function niceNumber(int $number, int $precision=0){
		if($number>1000000000000000) return round($number/1000000000000000,$precision)."Bd";
		else if($number>1000000000000) return round($number/1000000000000,$precision)."B";
		else if($number>1000000000) return round($number/1000000000,$precision)."Md";
		else if($number>1000000) return round($number/1000000,$precision)."M";
		else if($number>1000) return round($number/1000,$precision)."k";
		else return $number;
	}

	function assetOrDefault(string $path, string $defaultPath):string{
		$fpath=realpath($this->kernel->getProjectDir()."/public/".$path);
		if(is_file($fpath))return "/".$path;
		else return "/".$defaultPath;
	}

	public function normalizeText(string $text){
		$text=mb_strtolower($text);
		$text=$this->textMap($text,
			["_","-"," ","&","'", "é","è","ê", "à", "y", "eu","û","ù"],
			["" ,"" ,"" ,"" ,"" , "e","e","e", "a", "i", "e" ,"u","u"]
		);
		$text=preg_replace("/(.)\\1/","\\1",$text);
		return $text;
	}

	public function getFilters()
  {
      return [
          new TwigFilter('truncatehtml', [$this, 'truncateHtml']),
					new TwigFilter('normalizeText', [$this, 'normalizeText']),
					new TwigFilter('filterCharAfter', [$this, 'filterCharAfter']),
					new TwigFilter('ucsentences', [$this, 'ucsentences']),
					new TwigFilter('niceNumber', [$this, 'niceNumber']),
      ];
  }

	public function getFunctions()
  {
      return [
					new TwigFunction('createGET', [$this, 'createGET']),
					new TwigFunction('assetOr', [$this, 'assetOrDefault']),
					new TwigFunction('createGETFormHidden', [$this, 'createGETFormHidden']),
					new TwigFunction('removeGET', [$this, 'removeGET']),
      ];
  }


}
/*$man=new StringManipulator();
echo $man->normalizeText("Sallut parrer Le egAé");*/
