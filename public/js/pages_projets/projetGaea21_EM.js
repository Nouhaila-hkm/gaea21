let prestations = [
    "<p><span class='process'>Green coaching&nbsp;:&nbsp;</span>audit vert, cycle de vie et chaîne de valeur, éco-conception et détermination de l’origine des matériaux – usage - recyclage, réutilisation, calcul d’empreinte écologique, analyse d’impact santé de l’environnement de travail, certification - communication responsable, étude d’impacts et mise en place d’indicateurs.</p>",
    "<p><span class='process'>Act your mind&nbsp;:&nbsp;</span>coaching individuel de changement de comportement dans le choix des outils de communication, la gestion soutenable de leur utilisation et de leur fin de vie + gaea21’s sustainable life program.</p>",
    "<p><span class='process'>Mind your project&nbsp;:&nbsp;</span>analyse de votre projet sous l’angle de l’impact de ses moyens de communication d’un point de vue économique social et environnemental + intégration de méthodes et d’outils de gestion de la durabilité à toutes ses étapes.</p>",
    "<p><span class='process'>Mind your environment&nbsp;:&nbsp;</span>veille technologique et concurrentielle + veille juridique et environnementale.</p>",
    "<p><span class='process'>Mind your resources&nbsp;:&nbsp;</span>limitez l’impact économique, social et environnemental des produits que vous utilisez. Gestion durable et optimale de vos ressources humaines + management durable.</p>",
    "<p><span class='process'>Mind your design&nbsp;:&nbsp;</span>limitez l’impact écologique de vos créations. Choix d’encres, de papier, de matériaux soutenables et gestion durable de l’énergie de vos outils de création.</p>",
    "<p><span class='process'>Mind your electronics&nbsp;:&nbsp;</span>intégrez l’analyse du cycle de vie de vos outils de communication et à partir de la connaissance des impacts à chaque étape (extraction - production - packaging - transport - utilisation - recyclage - réutilisation) afin de faire des choix d’achats et de consommation responsables.</p>",
    "<p><span class='process'>Mind your business&nbsp;:&nbsp;</span>minimisez l’impact de votre activité. Optimisez l’utilisation de vos ressources économiques, humaines et environnementales. Intégrez notre réseau vert. Mettez en place des indicateurs et une certification reconnue.</p>",
    "<p><span class='process'>Mind your image&nbsp;:&nbsp;</span>valorisez vos actions et vos projets. Intégrez des réseaux verts, soyez référencé, trouvez de nouveaux clients, développez votre marché et augmentez votre chiffre d’affaires tout en étant éco-responsable. Démarquez-vous de vos concurrents !</p>",
    "<p><span class='process'>Mind your partners&nbsp;:&nbsp;</span>maîtrisez toute la filière de votre activité. Assurez-vous que vos partenaires sont également des entreprises vertes. Bénéficiez des avantages du travail en réseaux.</p>",
]

// SELECTIONNE TOUS LES BOUTONS DES SOUS PROGRAMMES
let  btn_prestations = document.querySelectorAll(".btn-prestation");
console.log( btn_prestations);

// CODE SVG DE LA CROIX DE FERMETURE DE LA POPUP
const cross_icon =
  '<svg class="cross-icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M810.65984 170.65984q18.3296 0 30.49472 12.16512t12.16512 30.49472q0 18.00192-12.32896 30.33088l-268.67712 268.32896 268.67712 268.32896q12.32896 12.32896 12.32896 30.33088 0 18.3296-12.16512 30.49472t-30.49472 12.16512q-18.00192 0-30.33088-12.32896l-268.32896-268.67712-268.32896 268.67712q-12.32896 12.32896-30.33088 12.32896-18.3296 0-30.49472-12.16512t-12.16512-30.49472q0-18.00192 12.32896-30.33088l268.67712-268.32896-268.67712-268.32896q-12.32896-12.32896-12.32896-30.33088 0-18.3296 12.16512-30.49472t30.49472-12.16512q18.00192 0 30.33088 12.32896l268.32896 268.67712 268.32896-268.67712q12.32896-12.32896 30.33088-12.32896z"/></svg>';

// INITIALISATION DE L'IDENTIFIANT
let id_prestation = 0;

// ATTRIBUTION D'UNE CLASSE UNIQUE À CHAQUE BOUTON
btn_prestations.forEach((btn_prestation) => {
    btn_prestation.classList.add(`${id_prestation}`);
    id_prestation += 1;
});

console.log(btn_prestations);

// // AJOUT DE L'ÉVÉNEMENT SUR CHAQUE BOUTONS
 btn_prestations.forEach((btn_prestation) => {
    btn_prestation.addEventListener("click", (e) => {
    console.log(e);
    // RÉCUPÉRATION DE LA CLASSE UNIQUE DANS UNE VARIABLE
    const selectedPrestation = e.target.className.slice(-1);
    // ON DONNE CES DEUX STYLES À LA <DIV> POUR AFFICHER LA POPUP
    document.querySelector(".popup").style.opacity = "1";
    document.querySelector(".popup").style.visibility = "visible";
    // ON ÉCRIT À L'INTÉRIEUR DE LA <DIV> AVEC LE CONTENUE DU TABLEAU CORRESPOND À L'ID DU BOUTON SELECTIONNÉ
    document.querySelector(".popup__content").innerHTML =
    prestations[selectedPrestation] + cross_icon;
      	
document.documentElement.style.overflow = 'hidden';
  });
});

// DETECTE UN EVENEMENT SUR LA FENETRE POUR RETIRER LA POPUP
document.querySelector(".popup").addEventListener("click", (e) => {
  // ON RETIRE L'ATTRIBUT STYLE DE LA <DIV>
  document.querySelector(".popup").removeAttribute("style");
  // RÉINITIALISATION DU CONTENU DE LA POPUP CONTENANT LE TEXTE
  document.querySelector(".popup__content").innerHTML = "";
  document.documentElement.removeAttribute("style")
});




/***************************************************************************/


let packages = [
    "<p><span class='process'>Package administratif&nbsp;:&nbsp;</span>secrétariat et administration + ressources humaines + comptabilité.</p>",
    "<p><span class='process'>Package administratif plus&nbsp;:&nbsp;</span>secrétariat et administration + ressources humaines + comptabilité + services juridiques.</p>",
    "<p><span class='process'>Package communication light&nbsp;:&nbsp;</span>site + dépliant + cartes de visite.</p>",
    "<p><span class='process'>Package communication plus&nbsp;:&nbsp;</span>site CMS + brochure + papeterie + médias sociaux.</p>",
    "<p><span class='process'>Package lancement (association)&nbsp;:&nbsp;</span>Logo + site + page Facebook + dépliant + cartes de visite + stratégie / plan marketing (8h).</p>",
    "<p><span class='process'>Package stabilité (association)&nbsp;:&nbsp;</span>logo + site CMS + page Facebook, linkedin, twitter + brochure + papeterie + stratégie / plan marketing (16h ).</p>",
    "<p><span class='process'>Package maturité (association)&nbsp;:&nbsp;</span>Devis.</p>",
    "<p><span class='process'>Package lancement (start-up)&nbsp;:&nbsp;</span>logo + site + page Facebook + dépliant + cartes de visite + stratégie / plan marketing (10h).</p>",
    "<p><span class='process'>Package stabilité (start-up)&nbsp;:&nbsp;</span>logo + site CMS + page linkedin, twitter + brochure + papeterie + stratégie / plan mkt. (20h).</p>",
    "<p><span class='process'>Package maturité (start-up)&nbsp;:&nbsp;</span>devis.</p>",
]

// SELECTIONNE TOUS LES BOUTONS DES SOUS PROGRAMMES
let  btn_packages = document.querySelectorAll(".package");
console.log(btn_packages);

// INITIALISATION DE L'IDENTIFIANT
 let id_package = 0;

// ATTRIBUTION D'UNE CLASSE UNIQUE À CHAQUE BOUTON
btn_packages.forEach((btn_package) => {
    btn_package.classList.add(`${id_package}`);
    id_package += 1;
});

console.log(btn_packages);

// // AJOUT DE L'ÉVÉNEMENT SUR CHAQUE BOUTONS
btn_packages.forEach((btn_package) => {
    btn_package.addEventListener("click", (e) => {
    console.log(e.target.className);
    // RÉCUPÉRATION DE LA CLASSE UNIQUE DANS UNE VARIABLE
    const selectedPackage = e.target.className.slice(-1);
    // ON DONNE CES DEUX STYLES À LA <DIV> POUR AFFICHER LA POPUP
    document.querySelector(".popup").style.opacity = "1";
    document.querySelector(".popup").style.visibility = "visible";
    // ON ÉCRIT À L'INTÉRIEUR DE LA <DIV> AVEC LE CONTENUE DU TABLEAU CORRESPOND À L'ID DU BOUTON SELECTIONNÉ
    document.querySelector(".popup__content").innerHTML =
    packages[selectedPackage] + cross_icon;
      	
document.documentElement.style.overflow = 'hidden';
  });
});

// DETECTE UN EVENEMENT SUR LA FENETRE POUR RETIRER LA POPUP
document.querySelector(".popup").addEventListener("click", (e) => {
  // ON RETIRE L'ATTRIBUT STYLE DE LA <DIV>
  document.querySelector(".popup").removeAttribute("style");
  // RÉINITIALISATION DU CONTENU DE LA POPUP CONTENANT LE TEXTE
  document.querySelector(".popup__content").innerHTML = "";
  document.documentElement.removeAttribute("style")
});