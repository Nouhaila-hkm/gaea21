import React, { useEffect, useState } from "react";

const MyAccount = (props) => {
	const userInformations = props.userInformations;
	console.log(props);

	return (
		<>
			<section className="personal-infos">
				<h2>Mes informations personnelles</h2>

				<div className="card personal">
					<div className="personal-details">
						<div className="labels">
							<p>Adresse mail: </p>
							<p>Téléphone:</p>
							<p>Ville:</p>
						</div>
						<div>
							<p className="mail">
								{userInformations !== null && userInformations.email}
							</p>
							<p className="phone">
								{userInformations !== null && userInformations.phone}
							</p>
							<p className="location">
								{userInformations !== null && userInformations.city}
							</p>
						</div>
					</div>
					<div className="modify">
						<a href="">Modifier les informations</a>
					</div>
				</div>
			</section>

			<h2>CV</h2>
			<h2>LM</h2>
		</>
	);
};
export default MyAccount;
