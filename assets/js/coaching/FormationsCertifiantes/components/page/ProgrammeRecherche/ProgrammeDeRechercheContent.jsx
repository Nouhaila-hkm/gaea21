import React from "react";
import ListItem from "../../ListItem";

import arrow from "../../../../../../images/coaching/formationsCertifiantes/Groupe 2248.svg";
import imgContent1 from "../../../../../../images/coaching/formationsCertifiantes/pexels-tranmautritam-92331.png";
import imgContent2 from "../../../../../../images/coaching/formationsCertifiantes/pexels-karolina-grabowska-7692635@2x.png";
import imgContent3 from "../../../../../../images/coaching/formationsCertifiantes/pexels-katerina-holmes-5905481.png";
import imgContent4 from "../../../../../../images/coaching/formationsCertifiantes/pexels-jopwell-2422293.png";

import partner from "../../../../../../images/coaching/formationsCertifiantes/noun-partner-3082015.svg";
import donation from "../../../../../../images/coaching/formationsCertifiantes/noun-donation-5141912.svg";
import video from "../../../../../../images/coaching/formationsCertifiantes/Groupe 2663.svg";
import rapport from "../../../../../../images/coaching/formationsCertifiantes/Groupe 2662.png";
import obtenir from "../../../../../../images/coaching/formationsCertifiantes/noun-people-768961.svg";

const cardContent = {
	row1: [
		// RechercheFormation :
		{
			cardContent: (
				<div className="card-content">
					<div className="content-text">
						<h2>
							Projet recherche formations existantes en développement durable
						</h2>
						<p>
							Il s’agit de faire un état des lieux des avancements dans le
							projet formation et d’effectuer une analyse des différents modèles
							existants.
						</p>
					</div>
					<img src={imgContent1} alt="" className="img-content" />
				</div>
			),

			hiddenContent: (
				<div className="drop-content">
					<div className="content-text">
						<p>
							Il s’agit de faire un état des lieux des avancements dans le
							projet formation et d’effectuer une analyse des différents modèles
							existants aujourd’hui afin de proposer, dans les différents
							projets de gaea21, des modèles pédagogiques toujours{" "}
							<strong>originaux</strong> et
							<strong> adaptés aux besoins des apprenants</strong> selon leur
							contexte et les différentes régions qu'ils habitent.
						</p>
					</div>
				</div>
			),
		},
		// CreationCentreDeFormation:
		{
			cardContent: (
				<div className="card-content">
					<div className="content-text">
						<h2>Projet création centre de formation gaea21</h2>
						<p>
							Le projet du Département Formation a pour but de{" "}
							<strong>sensibiliser</strong> la population aux valeurs de gaea21.
						</p>
					</div>
					<img src={imgContent2} alt="" className="img-content" />
				</div>
			),

			hiddenContent: (
				<div className="drop-content">
					<div className="content-text">
						<p>
							Le projet du Département Formation a pour but de{" "}
							<strong>sensibiliser</strong> la population aux valeurs de gaea21.
							Cette mission s’opère à deux niveaux: d’une part dans
							l'intégration{" "}
							<strong>des collaborateurs stagiaires et bénévoles</strong> au
							sein de gaea21 par le biais de formations internes, et d’autre
							part, dans la sensibilisation de{" "}
							<strong>la population générale</strong>. Les formations internes
							étant déjà développées en partie au sein de gaea21, ce sont les
							membres de gaea21 qui donneront et qui créeront ces formations
							selon les besoins externes.
						</p>
					</div>
					<div className="content-mt">
						<p>
							La raison d’existence de gaea21 est fondée sur{" "}
							<strong>le besoin d’informer et de former en externe</strong>. Le
							projet développe<strong> des programmes</strong> à destination de
							différents publics afin de <strong>sensibiliser</strong> le plus
							grand nombre aux enjeux du développement durable par le biais de{" "}
							<strong>formations innovantes</strong>. En somme, le centre de
							formations externes a été mis en place afin de{" "}
							<strong>
								sensibiliser une majorité de personnes sur leurs comportements
							</strong>{" "}
							et <strong>leur manière de consommer</strong> et{" "}
							<strong>de les rendre consomm’acteurs</strong>.
						</p>
					</div>

					<div className="video">
						<img src={video} alt="" />
					</div>

					<div className="buttons">
						<button className="form-btn">
							<p>Obtenir</p>
							<img src={partner} alt="" />
						</button>
						<button className="form-btn">
							<p>Partenariat</p>
							<img src={partner} alt="" />
						</button>
						<button className="form-btn">
							<p>Soutenir</p>
							<img src={donation} alt="" />
						</button>
						<button className="form-btn">
							<p>Obtenir</p>
							<img src={obtenir} alt="" />
						</button>
					</div>
				</div>
			),
		},
		// Modèle Pédagogique:
		{
			cardContent: (
				<div className="card-content">
					<div className="content-text">
						<h2>Projet de recherche de modèles pédagogiques</h2>
						<p>
							Ce projet de recherche à pour but de pouvoir{" "}
							<strong>analyser</strong> toutes les méthodes pédagogiques
							innovantes pour pouvoir proposer des solutions d’application dans
							les projets externes
						</p>
					</div>
					<img src={imgContent3} alt="" className="img-content" />
				</div>
			),

			hiddenContent: (
				<div className="drop-content">
					<div className="content-text">
						<p>
							Ce projet de recherche à pour but de pouvoir{" "}
							<strong>analyser</strong> toutes les méthodes pédagogiques
							innovantes pour pouvoir proposer des solutions d’application dans
							les projets externes telles que le projet Cameroun. Un projet
							intéressant qui permettrait de proposer des modèles d’éducation
							innovants et adaptés, d’augmenter le niveau d’éducation des
							étudiants dont la plupart est abyssale du fait qu’ils ne soient
							pas stimulés par la logique, l’intérêt et le talent des étudiants
							mais plutôt par l’accumulation de richesse. Le but est de
							favoriser l’épanouissement et stimuler le besoin d’accomplissement
							personnel des apprenants.
						</p>
					</div>

					<div className="buttons">
						<button className="form-btn">
							<p>Obtenir</p>
							<img src={partner} alt="" />
						</button>
						<button className="form-btn">
							<p>Partenariat</p>
							<img src={partner} alt="" />
						</button>
						<button className="form-btn">
							<p>Soutenir</p>
							<img src={donation} alt="" />
						</button>
						<button className="form-btn">
							<p>Obtenir</p>
							<img src={obtenir} alt="" />
						</button>
					</div>
				</div>
			),
		},
	],
	row2: [
		// Bien être et accompagnement:
		{
			cardContent: (
				<div className="card-content">
					<div className="content-text">
						<h2>Programme Bien-être et Accompagnement</h2>

						<p>
							gaea21 cherche constamment à développer de nouvelles méthodes et
							recherches sur le <strong>bien-être des collaborateurs</strong>{" "}
							(interne/externe) et leur suivi en fonction du contexte actuel.
						</p>
					</div>
					<img src={imgContent4} alt="" className="img-content" />
				</div>
			),
			hiddenContent: (
				<div className="drop-content">
					<div className="content-text">
						<p>
							gaea21 cherche constamment à développer de nouvelles méthodes et
							recherches sur le <strong>bien-être des collaborateurs</strong>{" "}
							(interne/externe) et leur suivi en fonction du contexte actuel. Le
							but est de pouvoir développer{" "}
							<strong>values management et le coaching télétravail </strong>
							dans un premier temps en interne, puis en externe.
						</p>
					</div>
					<div className="content-drop-list">
						<ul>
							<ListItem>
								<div>
									<img src={arrow} alt="arrow" />
									<span>Values Management</span>
								</div>

								<div>
									<p className="content-drop-text first-drop-text">
										Le projet Values Management vise à{" "}
										<strong>réduire la dissonance de valeurs</strong> existante
										entre les valeurs annoncées par les nouveaux collaborateurs
										et l'organisation et de faire concorder les valeurs entre la
										structure et les collaborateurs. Il s’articule autour de la
										question du bonheur dans l’entreprise.
									</p>
								</div>
							</ListItem>
							<ListItem>
								<div>
									<img src={arrow} alt="arrow" />
									<span>Coaching Télétravail</span>
								</div>
								<div>
									<p className="content-drop-text first-drop-text">
										Le projet Coaching Télétravail veille à mettre en marche des
										mesures d’accompagnement pour{" "}
										<strong>le bien-être des salariés </strong>
										travaillant hors de l’organisation (domicile et autres) et
										le
										<strong> maintien de la productivité</strong> optimale des
										entreprises.
									</p>
								</div>
							</ListItem>
						</ul>
					</div>

					<div className="video">
						<img src={video} alt="" />
						<img src={rapport} alt="" />
					</div>

					<div className="buttons">
						<button className="form-btn">
							<p>Obtenir</p>
							<img src={partner} alt="" />
						</button>
						<button className="form-btn">
							<p>Partenariat</p>
							<img src={partner} alt="" />
						</button>
						<button className="form-btn">
							<p>Soutenir</p>
							<img src={donation} alt="" />
						</button>
						<button className="form-btn">
							<p>Obtenir</p>
							<img src={obtenir} alt="" />
						</button>
					</div>
				</div>
			),
		},
	],
};

export default cardContent;
