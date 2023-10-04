import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
//import "../../../styles/profile/profile.scss";
import logo from "../../../images/profile/logo.png";
import profile_logo from "../../../images/profile/pexels-pixabay-354951.jpg";
import ProfileNavigation from "../components/ProfileNavigation";

import MyAccount from "../components/user/MyAccount";
import MyCommunity from "../components/user/MyCommunity";
import MyCommunitiesgaea21 from "../components/user/MyCommunitiesgaea21";

const UserProfile = () => {
	const [userInformations, setUserInformations] = useState({});

	const [currentSectionContent, setCurrentSectionContent] = useState(
		<MyAccount userInformations={userInformations} />
	);
	

	useEffect(() => {
		axios.get("http://localhost:8000/getUserInfos").then((response) => {
			setUserInformations(response.data);
		});
	}, []);

	const handleSectionChange = (sectionName) => {
		console.log(sectionName);

		switch (sectionName) {
			case "mon-compte":
				setCurrentSectionContent(
					<MyAccount userInformations={userInformations} />
				);
				break;
			case "ma-communauté":
				setCurrentSectionContent(
					<MyCommunity userInformations={userInformations} />
				);
				break;
			case "mes-communautés":
				setCurrentSectionContent(
					<MyCommunitiesgaea21 userInformations={userInformations} />
				);
				break;
		}
	};

	return (
		<>
			<section className="section-header">
				<h1 className="title-header">
					Bienvenue chez <img src={logo} alt="" />
				</h1>
			</section>
			<div className="container profile-content">
				<section className="profile-header">
					<div className="profile-header-content">
						<img src={profile_logo} alt="" />
						<div className="profile-header-infos">
							<p className="profile-name">
								{userInformations &&
									userInformations.firstName + " " + userInformations.lastName}
							</p>
							<p className="profile-type">Individu/ famille</p>
						</div>
					</div>
				</section>
				<section className="profile-infos">
					<p className="welcome">Bienvenue sur votre profil,</p>

					<div className="infos">
						<div className="infos-navigation">
							<ProfileNavigation
								onSectionChange={handleSectionChange}
							></ProfileNavigation>
						</div>
						<div className="infos-content">{currentSectionContent}</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default UserProfile;
