import React from "react";
import ListItem from "../ListItem";
import divider from "../../../../../images/coaching/formationsCertifiantes/Rectangle 3198.png";
import arrow from "../../../../../images/coaching/formationsCertifiantes/Groupe 2248.svg";
import imgContent1 from "../../../../../images/coaching/formationsCertifiantes/pexels-diva-plavalaguna-6150527.png";

const ProjetFormationCentreFormation = () => {
	return (
		<>
			<section className="section-header">
				<div>
					<h2 className="fw-bold">
						Projet création centre de formation gaea21
					</h2>
					<p>
						L’objectif à long terme du département est de devenir un centre de
						formation continue, de sensibiliser la population, membre ou non de
						gaea21, aux enjeux du développement durable par le biais de
						formations innovantes.
					</p>
				</div>
				<div className="divider-bloc">
					<img src={divider} alt="" />
				</div>
			</section>

			<section className="section-content">
				<div className="content-flex">
					<div className="content-text">
						<h3>
							Programme de formations externes de gaea21 / formations
							certifiantes
						</h3>
						<p>
							Une des dimensions de gaea21 est de pouvoir mettre en place un
							Programme de formations externes de gaea21 / LEARN / Formations
							certifiantes en ligne et présentiel sur les domaines suivants:
						</p>
					</div>
					<div className="img">
						<img src={imgContent1} alt="" className="img-content" />
					</div>
				</div>

				<div className="content-drop-list">
					<ul>
						<ListItem>
							<div>
								<img src={arrow} alt="arrow" />
								<span>Sustainability Workshops</span>
							</div>

							<div>
								<p className="content-drop-text first-drop-text">
									Dans le cadre de sa stratégie d’action éducative dans le
									domaine de l’éco-consommation dédié aux acteurs de
									l’éducation, le projet{" "}
									<strong>Sustainability Workshop</strong> met sur pied des{" "}
									<strong>
										ateliers/workshop de sensibilisation au développement
										durable
									</strong>
									, au sein d’établissements scolaires, destinés aux jeunes de 4
									à 18 ans. Ces workshops se présentent sous une forme{" "}
									<strong>ludique</strong> et mettent l’accent sur une approche
									systémique de la consommation. En fait, l’objectif vise la
									prise de conscience de sa propre consommation et à modifier
									notre vision et/ou manières de consommer afin de tendre vers
									un comportement <strong>sain et durable</strong>.
								</p>
							</div>
						</ListItem>
						<ListItem>
							<div>
								<img src={arrow} alt="arrow" />
								<span>Formations certifiantes</span>
							</div>
							<div>
								<p className="content-drop-text first-drop-text">
									Le département Formations de gaea21 est responsable des
									certificats liés à toutes les formations données au sein de
									l’association. Les formations certifiantes données sont de
									plusieurs natures : <strong>les formations techniques</strong>{" "}
									(IT, design, ACV, etc.),{" "}
									<strong> les formations appliquées</strong> (recherche les
									formations continueset, management durable, etc.) et
									<strong>les formations continues</strong> (suivi/lecture
									d’articles, formations introductives au développement durable,
									formations liées aux publications, ainsi que les formations
									outils - Gantt, etc.).
								</p>
							</div>
						</ListItem>
						<ListItem>
							<div>
								<img src={arrow} alt="arrow" />
								<span>Sustainability</span>
							</div>
							<div>
								<p className="content-drop-text first-drop-text">
									Cette formation comprend entre autres{" "}
									<strong>
										l'économie verte, l’économie circulaire et l’analyse du
										cycle de vie
									</strong>{" "}
									qui sont données lors des séances d’équipe. Chez gaea21, on ne
									donne pas de cours ex-cathédrale, ni ceux où l’on apprend par
									cœur les nouvelles notions mais des cours basés sur{" "}
									<strong>la pédagogie active</strong>, les collaborateurs
									apprennent de nouvelles notions en même temps qu’ils
									développent, participent et les appliquent dans un nouveau
									projet attribué souvent créé dans le but que le collaborateur
									développe des compétences-clés complètes liées à son métier de
									base.
								</p>
							</div>
						</ListItem>
						<ListItem>
							<div>
								<img src={arrow} alt="arrow" />
								<span>Project management</span>
							</div>
							<div>
								<p className="content-drop-text first-drop-text">
									Elle comprend une formation en gestion de projets déjà mise en
									place en interne.
								</p>
							</div>
						</ListItem>
						<ListItem>
							<div>
								<img src={arrow} alt="arrow" />
								<span>Sustainable management</span>
							</div>
							<div>
								<p className="content-drop-text first-drop-text">
									Cette formation est destinée aux gérants des entreprises et
									organisations souhaitant que leur entreprise ou organisation
									devienne plus responsable au niveau économique, social et
									environnemental en proposant des outils de management
									performants pour accompagner ces entreprises et organisations
									dans leur changement tels que la mise en place d’un Gantt pour
									planifier les projets sur le long terme, le Dashboard project
									pour évaluer les performances de l’organisme, et les KPIs pour
									l’aide à la décision.
								</p>
							</div>
						</ListItem>
						<ListItem>
							<div>
								<img src={arrow} alt="arrow" />
								<span>
									Business design / Method learning & conceptualisation
								</span>
							</div>
							<div>
								<p className="content-drop-text first-drop-text">
									Par une approche systémique, l’équipe de gaea21 se charge de
									faire des études de marché sur le business model, application
									des données et la recherche appliquée.
								</p>
							</div>
						</ListItem>
						<ListItem>
							<div>
								<img src={arrow} alt="arrow" />
								<span>Coaching télétravail</span>
							</div>
							<div>
								<p className="content-drop-text first-drop-text">
									Le projet Coaching Télétravail veille à mettre en marche des
									mesures d’accompagnement pour le{" "}
									<strong>bien-être des salariés </strong>
									travaillant hors de l’organisation (domicile et autres) et le
									<strong> maintien de la productivité</strong> optimale des
									entreprises.
								</p>
							</div>
						</ListItem>
					</ul>
				</div>
			</section>
		</>
	);
};

export default ProjetFormationCentreFormation;
