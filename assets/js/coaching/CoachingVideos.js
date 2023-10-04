import React from "react";
import { createRoot } from "react-dom/client";
import ChangeVideo from "./ChangeVideo";

export default class CoachingVideos extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <ChangeVideo />
    };
}

const root = createRoot(document.getElementById('coachingVideos'));
root.render(
    <CoachingVideos />
);