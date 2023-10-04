import React from "react";
import { createRoot } from "react-dom/client";
import UserProfile from "./pages/UserProfile";

const Profile = () => {
	return (
		<>
			<UserProfile></UserProfile>
		</>
	);
};

const root = document.getElementById("main");
createRoot(root).render(<Profile />);
