const paragraphes = [
  "<p><span class='process'>Green Coaching&nbsp;:</span> programme d'accompagnement sur mesure permettant aux familles ou aux individus désirant changer leurs comportements et habitudes pour d'autres plus durables.</p>",
  "<p><span class='process'>Répertoire Verts&nbsp;:</span> outil de référencement et l'évaluation de tous les produits et/ou services &#171;verts&#187; proposé dans un rayon de 130 km autour d'un point de référence (ici Genève).</p>",
  "<p><span class='process'>Eco geste et empreinte chromatique&nbsp;:</span> le projet &#171;empreinte chromatique&#187; de gaea21 a pour but d'identifier le comportement et de mesurer l'impact écologique d'un individu ou d'une famille à travers un outil pratique. Ces informations sont traduites à l'aide d'une gamme de six couleurs allant du vert clair (très bien) au noir (très mauvais).</p>",
  "<p><span class='process'>Grow your own&nbsp;:</span> le programme Grow Your Own (GYO) vise à sensibiliser les individus à un mode de vie plus respectueux de l'environnement. GYO cherche également à favoriser et encourager l'économie local ainsi qu'à développer l'agriculture urbaine. Il offre toutes sorte de conseils pratiques pour aider les individus à cultiver leurs propres herbes aromatiques, fruits ou légume chez soi.</p>",
  "<p><span class='process'>Sharing economy&nbsp;:</span> ce programme vise le partage d'objets, d'idées, et de ressources dans une communauté locale via plusieurs plateformes onlines. Ces dèrnieres sont: la plateforme eco-mobility pour le partage de la voiture et le covoiturage, plateforme co-owning pour le partage d'objets, plateforme crowdfunding pour trouver des financements aux projets, plateforme solidarité pour l'entraide et plateforme humanité pour la rencontre et l'intégration.</p>",
  "<p><span class='process'>Green Event Series&nbsp;:</span> série d'évènements fun, sportif et culturels lancés par gaea21 en aout 2012 visant à sensibiliser le public au développement durable à travers de nombreuse activités&nbsp;: green drink, journées campagne ouverte, ou encore des balades&#59;et ceci ne représente qu'un echantillon des activités proposées.</p>",
  "<p><span class='process'>Conseil Vert&nbsp;:</span> Complémentaire au programme de Green Coaching, le projet Conseil Vert permet d'acheter un certains nombre d'heures de séance pour être conseillé et accompagné lors d'un changement de comportement orienté vers un mode de vie plus durable. Il s'agit d'un programme plus flexible et limité dans le temps afin d'obtenir des informations et astuces concrète sans pour autant suivre un programme de coaching au complet.</p>",
  "<p><span class='process'>Green Coaching&nbsp;:</span> programme de sensibilisation tel que le 0 waste program, Sustainaible home, Sustainable health et alimentation responsable.</p>",
];

// SELECTIONNE TOUS LES BOUTONS DES SOUS PROGRAMMES
let sousProgrammes = document.querySelectorAll(".sous_programmes_btn");
// console.log(sousProgrammes);

// CODE SVG DE LA CROIX DE FERMETURE DE LA POPUP
const cross_icon =
  '<svg class="cross-icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M810.65984 170.65984q18.3296 0 30.49472 12.16512t12.16512 30.49472q0 18.00192-12.32896 30.33088l-268.67712 268.32896 268.67712 268.32896q12.32896 12.32896 12.32896 30.33088 0 18.3296-12.16512 30.49472t-30.49472 12.16512q-18.00192 0-30.33088-12.32896l-268.32896-268.67712-268.32896 268.67712q-12.32896 12.32896-30.33088 12.32896-18.3296 0-30.49472-12.16512t-12.16512-30.49472q0-18.00192 12.32896-30.33088l268.67712-268.32896-268.67712-268.32896q-12.32896-12.32896-12.32896-30.33088 0-18.3296 12.16512-30.49472t30.49472-12.16512q18.00192 0 30.33088 12.32896l268.32896 268.67712 268.32896-268.67712q12.32896-12.32896 30.33088-12.32896z"/></svg>';

// INITIALISATION DE L'IDENTIFIANT
let id = 0;

// ATTRIBUTION D'UNE CLASSE UNIQUE À CHAQUE BOUTON
sousProgrammes.forEach((sousProgramme) => {
  sousProgramme.classList.add(`${id}`);
  id += 1;
});

// console.log(sousProgrammes);

// AJOUT DE L'ÉVÉNEMENT SUR CHAQUE BOUTONS
sousProgrammes.forEach((sousProgramme) => {
  sousProgramme.addEventListener("click", (e) => {
    console.log(e);

    // RÉCUPÉRATION DE LA CLASSE UNIQUE DANS UNE VARIABLE
    const selectedSousProg = e.target.className.slice(-1);
    // ON DONNE CES DEUX STYLES À LA <DIV> POUR AFFICHER LA POPUP
    document.querySelector(".popup_sous-prog").style.opacity = "1";
    document.querySelector(".popup_sous-prog").style.visibility = "visible";
    // ON ÉCRIT À L'INTÉRIEUR DE LA <DIV> AVEC LE CONTENUE DU TABLEAU CORRESPOND À L'ID DU BOUTON SELECTIONNÉ
    document.querySelector(".popup_sous-prog__content").innerHTML =
      paragraphes[selectedSousProg] + cross_icon;
      	
document.documentElement.style.overflow = 'hidden';
  });
});

// DETECTE UN EVENEMENT SUR LA FENETRE POUR RETIRER LA POPUP
document.querySelector(".popup_sous-prog").addEventListener("click", (e) => {
  // ON RETIRE L'ATTRIBUT STYLE DE LA <DIV>
  document.querySelector(".popup_sous-prog").removeAttribute("style");
  // RÉINITIALISATION DU CONTENU DE LA POPUP CONTENANT LE TEXTE
  document.querySelector(".popup_sous-prog__content").innerHTML = "";
  document.documentElement.removeAttribute("style")
});

