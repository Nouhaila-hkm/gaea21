import React from "react";
import ListItem from "./ListItem";
import arrow from "../../../../images/coaching/formationsCertifiantes/Groupe 2248.svg";
import imgContent1 from "../../../../images/coaching/formationsCertifiantes/pexels-gustavo-fring-4920514.png";
import imgContent2 from "../../../../images/coaching/formationsCertifiantes/pexels-thirdman-5256693.png";
import imgContent3 from "../../../../images/coaching/formationsCertifiantes/pexels-kindel-media-6773397.png";
import imgContent4 from "../../../../images/coaching/formationsCertifiantes/pexels-fauxels-3184325.png";
import imgContent5 from "../../../../images/coaching/formationsCertifiantes/pexels-gary-barnes-6231981.png";
import imgContent6 from "../../../../images/coaching/formationsCertifiantes/pexels-karolina-grabowska-6632580.png";
import partner from "../../../../images/coaching/formationsCertifiantes/noun-partner-3082015.svg";
import donation from "../../../../images/coaching/formationsCertifiantes/noun-donation-5141912.svg";
import video from "../../../../images/coaching/formationsCertifiantes/Groupe 2663.svg";
import rapport from "../../../../images/coaching/formationsCertifiantes/Groupe 2662.png";

const cardContent = {
	row1: [
		// formationRH :
		{
			cardContent: (
				<div className="card-content">
					<div className="content-text">
						<h2>Formation RH</h2>
						<p>Les formations RH sont directement instaurées par les RH.</p>
					</div>
					<img src={imgContent1} alt="" className="img-content" />
				</div>
			),

			hiddenContent: (
				<div className="drop-content">
					<div className="content-text">
						<p>
							Les formations RH sont directement{" "}
							<strong> instaurées par les RH</strong>. <br />
							Il en existe plusieurs:
						</p>
						<ul className="content-list">
							<li>la formation coaching RH</li>
							<li>la formation RH</li>
							<li>la formation DRH</li>
							<li>la formation complémentaire RH</li>
						</ul>
						<br />
						<p>
							Les RH sont les seuls à concevoir les formations RH dans le pôle
							RH.
							<br />
							Il est important d’être RH pour gérer le processus de formation. A
							terme, il sera géré par le département formation.
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
							<img src={donation} alt="" />
						</button>
					</div>
				</div>
			),
		},
		// formationStaff:
		{
			cardContent: (
				<div className="card-content">
					<div className="content-text">
						<h2>Formation staff</h2>
						<p>
							Les formations Staff sont des formations introductives et de mise
							à niveau sur le développement durable,
							<br /> portant également sur les méthodes et outils de gaea21.
						</p>
					</div>
					<img src={imgContent2} alt="" className="img-content" />
				</div>
			),

			hiddenContent: (
				<div className="drop-content">
					<div className="content-text">
						<p>
							Les formations Staff sont des formations introductives et de mise
							à niveau sur le développement durable, portant également sur les
							méthodes et outils de gaea21.
							<br />
							<br />
							Ces formations ont été créées dans le but que les collaborateurs
							soient mis en place rapidement car chacun arrive avec des niveaux
							différents, dès leur entrée chez gaea21.
						</p>
					</div>
					<div className="content-drop-list">
						<ul>
							<ListItem>
								<div>
									<img src={arrow} alt="arrow" />
									<span>OnBoard</span>
								</div>

								<div>
									<ul className="content-list">
										<div>
											<li>
												<span>Présentation gaea21</span>
											</li>
											<li>
												<span>Déroulement et informations</span>
											</li>
											<li>
												<span>Premiers pas et actions</span>
											</li>
										</div>
										<div>
											<li>
												<span>Gestion du temps et des outils</span>
											</li>
											<li>
												<span>Communication</span>
											</li>
											<li>
												<span>Outils suite Google</span>
											</li>
										</div>
									</ul>
								</div>
							</ListItem>
							<ListItem>
								<div>
									<img src={arrow} alt="arrow" />
									<span>Staff 1</span>
								</div>
								<div>
									<ul className="content-list">
										<div>
											<li>
												<span>
													Introduction au développement durable (Agenda21)
												</span>
											</li>
											<li>
												<span>La consommation responsable</span>
											</li>
											<li>
												<span>Les actualités sur le développement durable</span>
											</li>
										</div>
										<div>
											<li>
												<span>
													Les projets au sein de gaea21 (structure, phase,
													exemple)
												</span>
											</li>
											<li>
												<span>La vie chez gaea21</span>
											</li>
											<li>
												<span>Le télétravail et ses astuces</span>
											</li>
										</div>
									</ul>
								</div>
							</ListItem>
							<ListItem>
								<div>
									<img src={arrow} alt="arrow" />
									<span>Staff 2</span>
								</div>

								<div>
									<ul className="content-list">
										<div>
											<li>
												<span>Les séances et communication</span>
											</li>
											<li>
												<span>Outils de suivi de projets</span>
											</li>
										</div>
										<div>
											<li>
												<span>Les recherches et mises en place</span>
											</li>
											<li>
												<span>Evaluation finale</span>
											</li>
										</div>
									</ul>
								</div>
							</ListItem>
						</ul>
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
							<img src={donation} alt="" />
						</button>
					</div>
				</div>
			),
		},
		// formationCoordinateurs:
		{
			cardContent: (
				<div className="card-content">
					<div className="content-text">
						<h2>Formation coordinateurs / management</h2>
						<p>
							Le modèle de gaea21 est basé sur la gestion de projets: chez
							gaea21, les gestionnaires de projet sont appelés “les
							coordinateurs de projets”.
						</p>
					</div>
					<img src={imgContent3} alt="" className="img-content" />
				</div>
			),

			hiddenContent: (
				<div className="drop-content">
					<div className="content-text">
						<p>
							Le modèle de gaea21 est basé sur la gestion de projets: chez
							gaea21, les gestionnaires de projet sont appelés “les
							coordinateurs de projets”.
							<br />
							<br />
							Il y a plusieurs niveaux de coordination. Le coordinateur de
							niveau 0 est le président. Il est au plus haut niveau de
							coordination car il gère tous les programmes de gaea21. En fait,
							un coordinateur est amené à gérer soit 1 programme, soit 1 projet
							ou 1 sous-projet.
						</p>
					</div>

					<div className="content-drop-list">
						<ul>
							<ListItem>
								<div>
									<img src={arrow} alt="arrow" />
									<span>Gestion de portefeuille de projet/coordinateur</span>
								</div>

								<div>
									<p className="content-drop-text first-drop-text">
										Le système est fait de sorte à ce que les coordinateurs
										soient capable de gérer une équipe, un projet via un
										programme d'accompagnement individuel :
									</p>
									<ul className="content-list">
										<div>
											<li>
												<span>accueil des nouveaux coordinateur</span>
											</li>
											<li>
												<span>la formation appliquée en gestion de projet</span>
											</li>
											<li>
												<span>le coaching</span>
											</li>
										</div>
										<div>
											<li>
												<span>Le suivi de projet</span>
											</li>
											<li>
												<span>la gestion du bureau virtuel</span>
											</li>
											<li>
												<span>l'évaluation</span>
											</li>
										</div>
									</ul>
								</div>
							</ListItem>
							<ListItem>
								<div>
									<img src={arrow} alt="arrow" />
									<span>Formations spécifiques</span>
								</div>
								<div>
									<p className="content-drop-text first-drop-text">
										Les coordinateurs suivent des formations qui sont au nombre
										de trois groupes :
									</p>
									<ul className="content-list simple-list">
										<li>
											<span>
												des formations appliquées en gestion de projets, à
												savoir, en management durable (la gestion du temps et de
												tâches) et en management de compétence
											</span>
										</li>
										<li>
											<span>
												les formations en ligne Loom et Google Classroom
											</span>
										</li>
										<li>
											<span>
												la création, la recherche et la formation sur les outils
												de gestion / suivi de projet
											</span>
										</li>
									</ul>
									<p className="content-drop-text">
										Les coordinateurs suivent ces formations de coordination
										pour apprendre à gérer leur équipe et leur projet
									</p>
								</div>
							</ListItem>
						</ul>
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
							<img src={donation} alt="" />
						</button>
					</div>
				</div>
			),
		},
	],
	row2: [
		// formationThematique:
		{
			cardContent: (
				<div className="card-content">
					<div className="content-text">
						<h2>Formations thématiques à la demande</h2>
						<p>
							Les formations thématiques à la demande sont destinées à acquérir
							des compétences techniques des métiers spécifiques.
						</p>
					</div>
					<img src={imgContent4} alt="" className="img-content" />
				</div>
			),
			hiddenContent: (
				<div className="drop-content">
					<div className="content-text">
						<p>
							Les formations thématiques à la demande sont destinées à
							<strong>
								{" "}
								acquérir des compétences techniques des métiers spécifiques
							</strong>
							<br />
							<br />
							Toute personne faisant de la recherche chez gaea21 doit faire
							<strong> une formation Analyse de Cycle de Vie / Open LCA</strong>
							. Les compétences clés sont liées à la recherche. La demande est
							donnée aux coordinateurs de base
						</p>
					</div>
					<div className="content-mt">
						<p>
							Parmi les techniques des métiers suivants, voici les
							<strong> formations intégrées à ces formations:</strong>
							<br />
							<br />
						</p>
						<ul className="content-list">
							<li>
								dans architecture/conception vidéo, on les forme sur un outil
								Blender
							</li>
							<li>dans Design, on les forme sur UI-UX</li>
							<li>
								dans RH marketing, on les forme sur un programme Growth hacking
							</li>
						</ul>

						<p className="content-conclusion">
							<br />
							Les formations thématiques à la demande ne sont pas encore mises
							en place par manque d’effectif. Mais elles sont intégrées aux
							projets visant également à développer des compétences liées au
							Développement Durable en recherche interne (projets de recherche
							gaea21).
						</p>
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
							<img src={donation} alt="" />
						</button>
					</div>
				</div>
			),
		},
		// formationCoaching:
		{
			cardContent: (
				<div className="card-content">
					<div className="content-text">
						<h2>Formation coaching</h2>
						<p>
							On forme aussi aux <strong>métiers / jobs verts</strong>. Voici
							les diverses formations proposées:
						</p>
					</div>
					<img src={imgContent5} alt="" className="img-content" />
				</div>
			),

			hiddenContent: (
				<div className="drop-content">
					<div className="content-text">
						<p>
							On forme aussi aux <strong>métiers / jobs verts</strong>. Voici
							les diverses formations proposées:
						</p>
						<ul className="content-list">
							<li>
								auditeurs verts / Répertoire vert et Green coaching pour
								entreprises
							</li>
							<li>
								formation en communication / prise de parole en public / Théâtre
								/ PNL destiné aux entrepreneurs
							</li>
							<li>
								ambassadeurs verts / green coaching pour individus-familles
							</li>
						</ul>
					</div>
				</div>
			),
		},
		// formationPublication:
		{
			cardContent: (
				<div className="card-content">
					<div className="content-text">
						<h2>Publication / formation scientifique</h2>
						<p>Le modèle de gaea21 est basé sur de la recherche appliquée:</p>
					</div>
					<img src={imgContent6} alt="" className="img-content" />
				</div>
			),

			hiddenContent: (
				<div className="drop-content">
					<div className="content-text">
						<p>Le modèle de gaea21 est basé sur de la recherche appliquée:</p>
						<ul className="content-list">
							<li>
								<span>
									il y a une partie introductive en développement durable
								</span>
							</li>
							<li>
								<span>
									des formations sur Wikipédia dans le but de savoir comment
									faire une publication
								</span>
							</li>
							<li>
								<span>une formation en recherche scientifique</span>
							</li>
							<li>
								<span>une formation en veille documentaire</span>
							</li>
						</ul>
						<p>
							<br />
							Ce sont des compétences que l’on voudrait donner à toute personne
							travaillant chez gaea21 et qui en ressort parce qu’on fait de la
							recherche appliquée.
						</p>
					</div>
				</div>
			),
		},
	],
};

export default cardContent;
