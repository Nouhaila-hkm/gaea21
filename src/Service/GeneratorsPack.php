<?php
namespace App\Service;

class GeneratorsPack{



	public $LOWER;
	public $SPACE;
	public $UPPER;
	public $LETTER;
	public $DIGIT;
	public $PONCTUATION;
	public $ALPHANUMERIC;

	public $ADJECTIF;
	public $VERBE;
	public $DETERMINANT;
	public $CCT;
	public $CCL;
	public $NOUN;
	public $PROPOSITION_SEP;

	public $SURNAME;
	public $NAME;
	public $PERSON;
	public $PSEUDO;

	public $ACTION_SENTENCE;
	public $AFFIRMATION_SENTENCE;
	public $SMALL_SENTENCE;
	public $SMALL_TEXT;

	public $HTML_TITLE;
	public $HTML_SMALL_SENTENCE;
	public $HTML_AFFIRMATION;
	public $HTML_PARAGRAPH;
	public $MIDDLE_HTML_TEXT;

	public $DATE;
	public $HASH;
	public $ADDRESS;
	public $EMAIL;
	public $ITEM_NAME;
	public $ITEM_CATEGORY;
	public $PHONE_NUMBER;



	public function __construct(){
		// Letters
		$this->LOWER=new WordGenerator(["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]);
		$this->UPPER=new WordGenerator(["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]);
		$this->DIGIT=new WordGenerator(["0","1","2","3","4","5","6","7","8","9"]);
		$this->PONCTUATION=new WordGenerator(["!","?",".","!!","..."]);
		$this->SPACE=new WordGenerator([" "]);
		$this->LETTER=new WordGenerator($this->LOWER,$this->UPPER);
		$this->ALPHANUMERIC=new WordGenerator($this->LETTER,$this->DIGIT);

		// Words
		$this->SURNAME=new WordGenerator([
			"Jean","Tom","Paul","Fred","Samuel","Jacques","Gabriel",
			"Andrea","Anais","Anna","Alexandra", "Bertrand","Bonnie",
			"Chaina", "Debbie","Danny","Dan",
			"Elen","Etan","Fredreric","Filibert",
			"Hans","Hilbert","Illina","Inma",
			"Jannes","Kolbert","Kan","Lona","Mathieu","Max","Maxence",
			"Nathan","Ryan","Thomas",
		]);
		$this->NAME=new ConcatGenerator(
			new WordsGenerator(["","","","","","","De ","Le "],0,1),
			new WordGenerator(["Du","De","Re","Gro","Mar","Fala","Ni","Mi"]),
			new WordGenerator(["mont","pont","nold","ning","teau","fel","gue"]),
		);
		$this->NOUN=new WordGenerator([
			"arbre","animal","attache",  "bête","beau","bagnole",
			"chat","chien","chalet",  "dame","débris","digue",
			"ennemi","épée","évolution",  "ferme","fatigue","figue","feu",
			"gars","gant","gros","gris",  "homme","hibou","haricot",
			"idiot","ici","initiation",  "jardin","jeu","jean",
			"kilo","kangourou","karate",  "long","litige","lame",
			"monstre","maître","montre","mite",  "nain","nid","nom","noir",
			"obligation","os",  "papa","pain","pizza","panda",
			"quart","quiche",  "roi","riz","rangement","rater",
			"salade","saut",  "tante","tente","toit","table","tambour","tombe",
			"vision","vitre","vengeance",  "wagon", "xylophone", "zèbre"
		]);
		$this->ADJECTIF=new WordGenerator([
			"attachant",  "bête","beau","bleu",
			"chaud","chinois",  "dangeureux","digne","digital",
			"énorme","élastique","étonnant",  "fermé","fatigue","figé","flamboyant",
			"grand","gris","gros",  "haut",
			"idiot","identique","initiatié",  "juste","joueur","jaune",
			"karateman",  "long","litigieux","légal",
			"monstrueux","miteux",  "nain","nommé","nom","noir",
			"obligé","osseux","orange",  "papa","perdu",
			"roi","rouge","rangé","raté",
			"sale","sauté",  "tombé","tigré",
			"vieux","voyant","vengeur",  "zébré"
		]);
		$this->VERBE=new WordGenerator([
			"attaquer","attirer","assouplir", "boire","bouger", "casser","classer",
			"détruire","débuter", "élever","établir","échanger", "faire","fumer","figer",
			"garder","grandir","gravir", "hair", "imaginer", "jouer", "louer","limer","lire",
			"manger","monter","mourir", "narguer","nouer","neiger", "pouvoir","pousser","paner",
			"rouler","rater","saler","salir","signer","taper","tisser","voir","zébrer",
		]);
		$this->PROPOSITION_SEP=new WordGenerator(["! ",". ","? ",", "," : ","; "," donc "," sauf si "," alors "," et "]);
		$this->DETERMINANT=new SelectGenerator(["des","que des","les","tous les","tous sauf les","plus de","moins de","plusieurs","un ou deux","cent","une","un",["les plus ",$this->ADJECTIF," des"]]);
		$this->CCT=new WordGenerator(["le matin","le soir","à midi","tous les jours","la semaine","jamais","chaque jour"]);
		$this->CCL=new SelectGenerator(["au travail","chez lui","dans la rue","dans la forêt","partout",["a coté de ",$this->DETERMINANT," ",$this->NOUN]]);

		# Names
		$this->PERSON=new ConcatGenerator([ $this->SURNAME, " ", $this->NAME, ]);
		$this->PSEUDO=[
			new ProbabilityGenerator($this->NOUN, 0.5),
			new ProbabilityGenerator($this->SURNAME, 0.5),
			new WordsGenerator(["","",".","_"], 0, 1),
			new RepeatGenerator($this->ADJECTIF, 1, 2),
			new RepeatGenerator($this->DIGIT, 0, 5),
			new WordsGenerator(["*","&","#","_"],0,1),
		];

		# Sentence and Text
		$this->ACTION_SENTENCE=new MapGenerator([
			new MapGenerator($this->VERBE, [$this,"conjugatePresent1Pers"])," ",
			$this->DETERMINANT," ",
			new ProbabilityGenerator([$this->ADJECTIF," "], 0.5),
			$this->NOUN,
			new ProbabilityGenerator([" ",$this->ADJECTIF], 0.5),
			new ProbabilityGenerator([" ",$this->CCT], 0.5),
			new ProbabilityGenerator([" ",$this->CCL], 0.5),
			$this->PONCTUATION,
		],"ucfirst");
		$this->AFFIRMATION_SENTENCE=new MapGenerator([
			$this->NOUN,
			" ",
			new RepeatGenerator([$this->ADJECTIF," "],0,2),
			new MapGenerator($this->VERBE, [$this,"conjugatePresent1Pers"])," ",
			$this->DETERMINANT," ",
			new ProbabilityGenerator([$this->ADJECTIF," "], 0.5),
			$this->NOUN,
			new ProbabilityGenerator([" ",$this->ADJECTIF], 0.5),
			new ProbabilityGenerator([" ",$this->CCT], 0.5),
			new ProbabilityGenerator([" ",$this->CCL], 0.5),
			$this->PROPOSITION_SEP,
		],"ucfirst");

		$this->SMALL_SENTENCE=[
			new SelectGenerator(["C'est ","Il se peut que ce soit ","Pour vu que ce soit ","A mon avis, c'est ","Ils sont "],1,1),
			new SelectGenerator(["vraie","faux","rouge","grand","probable","étonnant","sur","unique","la fin"],1,1),
			new SelectGenerator([", une fois"," définitivement"," rarement"," la nuit"," en été"," la journée"," souvent",", réellement"],1,1),
			$this->PROPOSITION_SEP,
		];

		$this->SMALL_TEXT=[
			new RepeatGenerator($this->ACTION_SENTENCE,0,2),
			new RepeatGenerator($this->SMALL_SENTENCE,0,2),
			new RepeatGenerator($this->AFFIRMATION_SENTENCE,1,2),
			new RepeatGenerator($this->SMALL_SENTENCE,0,2),
			new RepeatGenerator($this->ACTION_SENTENCE,0,2),
			new RepeatGenerator($this->AFFIRMATION_SENTENCE,0,2),
			new RepeatGenerator($this->ACTION_SENTENCE,0,2),
			new RepeatGenerator($this->SMALL_SENTENCE,0,1)
		];

		$this->HTML_TITLE=[ "<h2>\n", $this->AFFIRMATION_SENTENCE, "</h2>\n", ];
		$this->HTML_SMALL_SENTENCE=[ "<strong>\n", $this->SMALL_SENTENCE, "</strong>\n", ];
		$this->HTML_AFFIRMATION=[ "<em>\n", $this->AFFIRMATION_SENTENCE, "</em>\n", ];

		$this->HTML_PARAGRAPH=[
			"<p>\n",
			new RepeatGenerator($this->SMALL_TEXT,0,1),
			new RepeatGenerator($this->HTML_SMALL_SENTENCE,0,1),
			new RepeatGenerator($this->HTML_AFFIRMATION,0,1),
			$this->SMALL_TEXT,
			new RepeatGenerator($this->HTML_SMALL_SENTENCE,0,1),
			new RepeatGenerator($this->HTML_AFFIRMATION,0,1),
			new RepeatGenerator($this->SMALL_TEXT,0,1),
			"</p>\n",
		];

		$this->MIDDLE_HTML_TEXT=[
			new RepeatGenerator($this->HTML_TITLE,0,1),
			$this->HTML_PARAGRAPH,
			new RepeatGenerator($this->HTML_TITLE,0,1),
			new RepeatGenerator($this->HTML_PARAGRAPH,0,1),
			new RepeatGenerator($this->HTML_TITLE,0,1),
			new RepeatGenerator($this->HTML_PARAGRAPH,0,1),
		];


		# Misc
		$this->DATE=[
			new RepeatGenerator($this->DIGIT, 4),
			"-",
			new WordsGenerator(["01","02","03","04","05","06","07","08","09","10","11","12"]),
			"-",
			new WordsGenerator(["0","1","2"]),
			$this->DIGIT,
		];
		$this->HASH=new RepeatGenerator($this->ALPHANUMERIC,256);

		$this->ADDRESS=[
			new RepeatGenerator($this->DIGIT,1,3),
			new WordGenerator([" Rue"," Avenue"," Chemin de"," Passage de"," Route de"," Place de"," Place"," Impasse"," Allée de"," Sentier de"," Passage"]),
			new WordGenerator([" de "," du "," des "," de la "," du Grand "," de Saint-"," "]),
			new WordGenerator(["La","To","Ru","Mol","Ter","Fra","Mono","Duc","Cas"]),
			new WordsGenerator(["la","to","com","hu","ap","li","fr","ol","ele","ano","arra"],2,5),
		];

		$this->EMAIL=[
			new WordsGenerator(["la","to","red","hu","a_p","lu.li","fro","est","fran","jer","paul","alex","kad","nik"],2,5),
			new ProbabilityGenerator(new RepeatGenerator($this->DIGIT,1,3),20),
			"@",
			new WordsGenerator(["la","to","red","hu","a_p","lu.li","fro"],1,3),
			".",
			new WordGenerator(["la","to","com","hu","ap","li","fr"]),
			new ProbabilityGenerator(new WordGenerator(["la","to","com","hu","ap","li","fr"]),20),
			new ProbabilityGenerator(new WordGenerator(["la","to","com","hu","ap","li","fr"]),5),
		];

		$this->ITEM_NAME=[
			new WordsGenerator(["Petit ","Grand ","Sale ","Vieux ","Nouveau ","Etrange "],0,1),
			new WordsGenerator(["La","To","Ru","Mol","Ter","Fra","Lo","Terra","Dico","Super"],1,1),
			new WordsGenerator(["la","to","com","hu","ap","li","fr","mono","ento","arro","elle"],1,4),
		];

		$this->ITEM_CATEGORY=[
			new WordsGenerator(["Grand ","Petit ","Sale ","Nouveau ","Rare ","Electro-","Néo","Jouet ","Image de ","Robot-","Machine-"],0,1),
			new WordGenerator(["Objet","Animal","Outil","Vetement","Vehicule","Batiment","Nourriture","Ordinateur","Couleur","Robot","Machine"]),
		];

		$this->PHONE_NUMBER=[
			new WordGenerator(["0"]),
			new WordGenerator(["1","2","3","4","5","6","7","8","9"]),
			new WordsGenerator(["0","1","2","3","4","5","6","7","8","9"],8)
		];


	}

	public function conjugatePresent1Pers($verbe){
		if(str_ends_with($verbe,"er"))return substr($verbe, 0, -1);
		else if(str_ends_with($verbe,"enir"))return substr($verbe, 0, -4)."eint";
		else if(str_ends_with($verbe,"ttre"))return substr($verbe, 0, -4)."t";
		else if(str_ends_with($verbe,"illir"))return substr($verbe, 0, -2)."e";
		else if(str_ends_with($verbe,"tre"))return substr($verbe, 0, -3)."t";
		else if(str_ends_with($verbe,"dre"))return substr($verbe, 0, -3)."d";
		else if(str_ends_with($verbe,"r"))return substr($verbe, 0, -1)."t";
		else if(str_ends_with($verbe,"re"))return substr($verbe, 0, -2)."t";
		else return $verbe;
	}

	public function frenchToItalian($texte){
		$texte=strtolower($this->clearAccent($texte));
		return str_replace(
		    ["e"  ,"ou","en","on","ss","r " ,"y","gu","s " ,"t " ,"d " ,"au","tt","eu","ch","x","oi","un","je","il","du","est","suis"],
		    ["a"  ,"o" ,"an","o" ,"s" ,"re ","i","g" ,"so ","ti ","de ","o" ,"t" ,"u" ,"c" ,"s","oa","uno","io","li","de","sono","sono"],
		    $texte
		);
	}

	public function frenchToEnglish($texte){
		$texte=strtolower($this->clearAccent($texte));
		return str_replace(
		    ["e "  ,"ou","ent","on","e " ,"r" ,"r "   ,"rs "  ,"y","gu","s ","t ","d ","au" ,"eu","il","est","oi","un","a " ,"je","c'" ,"eux ","suis"," de "," en ","je "],
		    ["ing ","oo","ing","o" ,"ed ","rd","red " ,"ring ","i","g" ," " ," " ," " ,"owl","u" ,"he","is" ,"oa","in","to ","i" ,"it ","ing ","sono"," of "," in ","I " ],
		    $texte
		);
	}

	public function clearAccent($str){
  	return strtr(utf8_decode($str), utf8_decode('àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ'), 'aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY');
	}

}
