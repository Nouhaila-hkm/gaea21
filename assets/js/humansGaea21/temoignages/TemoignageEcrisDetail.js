import React from 'react'



export default class TemoignageEcrisDetail extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        return <div className="temDetail">

            <div className="imgTemEcrit">
                <img src="../../../images/humansGaea21/Capture d’écran 2022-05-18 à 18.59@2x.png"/>
            </div>
            <div className="Ligne">
                
                <h1>{this.props.titre}</h1>
                <p>Je m'appelle Miezan mon autre prénom est Estelle :) . J'ai 26 ans et j'habite à Genève. Pourquoi as-tu intégré gaea21 ? J'ai intégré l'association car je me suis dit que c'est doublement bénéfique d’acquérir une expérience dans le marketing digital et d’en apprendre davantage sur le développement durable. Quel poste as-tu occupé ? J'ai été coordinatrice de projet en cosmétique durable et dans plusieurs sous-projets en Community Management. Combien de temps es-tu resté ? Je suis restée 6 mois
                </p>
            </div>
            <p className="paragTem">Dans quel(s) projet(s) ? Dans le département Eco-Conso : cosmétique durable, événementiel et dans le département Marketing : dans le sous-projet : Alumni, Membership, Butterfly effect, Humans of gaea, Réseaux sociaux. Quand as-tu commencé ? J'ai commencé le 5 juillet 2021 Qu'est-ce que tu as fait chez gaea21 ? Pour la partie Cosmétique durable, j'ai travaillé sur le contenu de la page consommation, destinée à la plateforme SLP, et sur l'organisation de deux événements en collaboration avec le projet Green Event. Concernant la partie Community management, j'ai travaillé essentiellement sur la création de contenu pour la communication interne et externe tels que la rédaction du contenu de la brochure membership; les pages du site internet pour Alumni et sur la gestion du posting plan et la création de contenu destiné aux réseaux sociaux. Qu'as-tu préféré faire ? J'ai apprécié tout particulièrement la partie réseaux sociaux. Comment as-tu vécu le fait d'être en télétravail ? Bien. Comment était l'ambiance ? L’ambiance était plutôt sympa, particulièrement avec le groupe réseaux sociaux. Qu'est-ce que t'as apporté cette expérience du point de vue professionnel ? La gestion de projet, à décupler ma créativité. Quelles sont les compétences que tu n'avais pas avant gaea21 et que tu as pu acquérir durant ton stage ? La gestion de projet et le management avec la formation de coordination. Es-tu en cours d'emploi en ce moment ? Si oui, dans quel poste ? Oui, dans la restauration. Es-tu en cours d'étude en ce moment ? Si oui, dans quel domaine ? Non. Comment vois-tu la suite pour toi dans tes projets pro ? Intégrer un nouveau poste D’ici la fin de l’année, plusieurs projets verront le jour, notamment Alumni, qu’en penses-tu ? Top, C'est un projet qui aidera les personnes à créer un réseau et à pouvoir être suivi individuellement parlant par des professionnels. As-tu une meilleure perspective d'avenir grâce à cette expérience ? Cette expérience m’a permis de voir davantage mes capacités , et mon désir d'apprendre ce que je ne connais pas. Comment vois-tu la suite pour toi dans tes projets perso ? Très bien, mais pour l'instant c'est top secret :) Qu'est-ce qu'on peut te souhaiter ? De profiter de la vie et de mes proches en cette période difficile. Ta devise ? Sois le changement que tu veux voir dans le monde L'endroit dans le monde où tu aimerais vivre ? USA Ta pièce préférée dans la maison ? Ma cuisine.</p>
        </div>
    }
}