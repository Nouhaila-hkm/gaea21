import React, { useState } from 'react';
import logo from '/public/imagesgaea21/logoGaea21.png';
import Coaching from './submenu/Coaching.jsx';
import WhoAreWe from './submenu/WhoAreWe.jsx';
import Project from './submenu/Project.jsx';
import HumansOfGaea from './submenu/HumansOfGaea.jsx';
import Observatory from './submenu/Observatory.jsx';
import ProfileIcon from '/public/Image/profile.png'
import UniverseOfGaea from '/public/imagesgaea21/UniverseOfgaea21.png'
import LeftArrow from '/public/images/PagesProjets/flecheAGauche.png'

export default function NavbarComponent() {

    const nav = document.querySelector('#navbar');
    const [connected, setConnected] = useState(nav.dataset.connected);

    const [whoAreWe, setWhoAreWe] = useState(false);
    const [coaching, setCoaching] = useState(false);
    const [project, setProject] = useState(false);
    const [observatory, setObservatory] = useState(false);
    const [humans, setHumans] = useState(false);
    const [language, setLanguage] = useState(false);
    const [profile, setProfile] = useState(false);
    const [universe, setUniverse] = useState(false);

    function openWhoAreWe() {
        if (!whoAreWe) {
            setWhoAreWe(true);
            setCoaching(false);
            setProject(false);
            setObservatory(false);
            setHumans(false);
            setLanguage(false);
            setProfile(false);
            setUniverse(false);
        } else {
            setWhoAreWe(false);
        }
    }

    function openCoaching() {
        if (!coaching) {
            setWhoAreWe(false);
            setCoaching(true);
            setProject(false);
            setObservatory(false);
            setHumans(false);
            setLanguage(false);
            setProfile(false);
            setUniverse(false);
        } else {
            setCoaching(false);
        }
    }

    function openProject() {
        if (!project) {
            setWhoAreWe(false);
            setCoaching(false);
            setProject(true);
            setObservatory(false);
            setHumans(false);
            setLanguage(false);
            setProfile(false);
            setUniverse(false);
        } else {
            setProject(false);
        }
    }

    function openObservatory() {
        if (!observatory) {
            setWhoAreWe(false);
            setCoaching(false);
            setProject(false);
            setObservatory(true);
            setHumans(false);
            setLanguage(false);
            setProfile(false);
            setUniverse(false);
        } else {
            setObservatory(false);
        }
    }

    function openHumansOfGaea() {
        if (!humans) {
            setWhoAreWe(false);
            setCoaching(false);
            setProject(false);
            setObservatory(false);
            setHumans(true);
            setLanguage(false);
            setProfile(false);
            setUniverse(false);
        } else {
            setHumans(false);
        }
    }

    function openLanguage() {
        if (!language) {
            setWhoAreWe(false);
            setCoaching(false);
            setProject(false);
            setObservatory(false);
            setHumans(false);
            setLanguage(true);
            setProfile(false);
            setUniverse(false);
        } else {
            setLanguage(false);
        }
    }

    function openProfile() {
        if (!profile) {
            setWhoAreWe(false);
            setCoaching(false);
            setProject(false);
            setObservatory(false);
            setHumans(false);
            setLanguage(false);
            setProfile(true);
            setUniverse(false);
        } else {
            setProfile(false);
        }
    }

    function openUniverse() {
        if (!universe) {
            setWhoAreWe(false);
            setCoaching(false);
            setProject(false);
            setObservatory(false);
            setHumans(false);
            setLanguage(false);
            setProfile(false);
            setUniverse(true);
        } else {
            setUniverse(false);
        }
    }

    return (
        <>
            <div className="topbar">
                <ul className="ulTopbar">
                    <li className="liTopbar">
                        <a href="/" className="brand-logo" style={{ paddingTop: "10px" }}>
                            <img src={logo} alt="Gaea21 logo" width="120px"
                                className="responsive-img hoverable" />
                        </a>
                    </li>
                    <li className="liTopbar">
                        <div onClick={openWhoAreWe}> Qui sommes-nous ?
                            <img className={"liTopbar_arrow " + (whoAreWe ? "rotate" : "")} src={LeftArrow} />
                        </div>
                    </li>
                    <li className="liTopbar">
                        <div onClick={openCoaching}>Coaching Carrières
                            <img className={"liTopbar_arrow " + (coaching ? "rotate" : "")} src={LeftArrow} />
                        </div>
                    </li>
                    <li className="liTopbar">
                        <div onClick={openProject}> Projets
                            <img className={"liTopbar_arrow " + (project ? "rotate" : "")} src={LeftArrow} />
                        </div>
                    </li>
                    <li className="liTopbar">
                        <div onClick={openObservatory}>Observatoire gaea21
                            { }
                            <img className={"liTopbar_arrow " + (observatory ? "rotate" : "")} src={LeftArrow} />
                        </div>
                    </li>
                    <li className="liTopbar">
                        <div onClick={openHumansOfGaea}>Humans of gaea21
                            <img className={"liTopbar_arrow " + (humans ? "rotate" : "")} src={LeftArrow} />
                        </div>
                    </li>
                    <li className="liTopbar">
                        <div onClick={openLanguage}>FR
                            <img className={"liTopbar_arrow " + (language ? "rotate" : "")} src={LeftArrow} />
                        </div>
                    </li>
                    <li className="liTopbar img-topbar">
                        <div>
                            {connected == 'true'
                                ? <a href='/userShow'><img src={ProfileIcon} /></a>
                                : <a href='/login'><img src={ProfileIcon} /></a>
                            }

                        </div>
                    </li>

                    <li className="liTopbar img-topbar">
                        <div>
                            <img src={UniverseOfGaea} />
                        </div>
                    </li>
                </ul>
            </div>
            {whoAreWe && <WhoAreWe />}
            {coaching && <Coaching />}
            {project && <Project />}
            {observatory && <Observatory />}
            {humans && <HumansOfGaea />}
            { /*language && <Language /> */}
            {/* profile && <Profile />*/}
            { /*universe && <Universe /> */}
        </>
    );
}