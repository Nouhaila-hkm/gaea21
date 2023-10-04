import React from "react";
import YoutubeEmbed from "./YoutubeEmbed";


export default class ChangeVideo extends React.Component {
    constructor(props) {
        super(props);
        this.idVideo = 0;
        this.state = {
            dataTabs: [
                {
                    id: 0,
                    tabTitle: "Paradoxe gaea21",
                    active: true,
                    picture: "paradoxe-gaea21-grand.jpg",
                    embedId: "6J6GOY6hNas",
                    title: "Paradoxe gaea21 - Yvan Claude"
                },
                {
                    id: 1,
                    tabTitle: "How do we measure success",
                    active: false,
                    picture: "How-do-we-grand.jpg",
                    embedId: "xB_KoNOkwLk",
                    title: "How do we measure success - Yvan Claude"
                },
                {
                    id: 2,
                    tabTitle: "Le modèle d'innovation gaea21",
                    active: false,
                    picture: "modele-innovation-grand.jpg",
                    embedId: "JUVoPYxkwpg",
                    title: "Le modèle d'innovation de gaea21 - Yvan Claude"
                },
                {
                    id: 3,
                    tabTitle: "Dimensions gaea21",
                    active: false,
                    picture: "dimensions-gaea21-grand.jpg",
                    embedId: "oHlaJbcg_Uo",
                    title: "Dimensions gaea21 - Yvan Claude"
                },
                {
                    id: 4,
                    tabTitle: "Perspective switch",
                    active: false,
                    picture: "perspective-switch-grand.jpg",
                    embedId: "cRy8VyQk3Fw",
                    title: "Perspective Switch - Yvan Claude"
                },
                {
                    id: 5,
                    tabTitle: "Le talent vecteur",
                    active: false,
                    picture: "talent-vecteur-grand.jpg",
                    embedId: "0EoY_nG5CY8",
                    title: "Le talent vecteur de choix de carrière - Yvan Claude"
                }
            ]
        };
        this.navigate = this.navigate.bind(this);
    }

    navigate(id) {
        let newDataTabs = this.state.dataTabs

        newDataTabs[id].active = true;
        newDataTabs[this.idVideo].active = false;

        this.setState({ dataTabs: newDataTabs });
        this.idVideo = id;
    }

    render() {
        const NavLink = ({ id, tabTitle, picture, embedId, title, active }) => {
            return (
                <div
                    onClick={() => this.navigate(id)}
                    className={active ? "active" : "notActive"}
                >
                    {active ? <YoutubeEmbed embedId={embedId} title={title} /> : <img className="vignette" src={"images/coaching/" + picture} />}

                    {tabTitle}
                </div>
            );
        };

        return (
            <div className="coachingVideos">
                {this.state.dataTabs.map((item) => (
                    <NavLink
                        key={item.id}
                        id={item.id}
                        tabTitle={item.tabTitle}
                        picture={item.picture}
                        embedId={item.embedId}
                        title={item.title}
                        active={item.active}
                    />
                ))}
            </div>
        );
    }
}