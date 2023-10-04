import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import cross from '../../..//images/cross.svg';

export default function ModalStaff(props) {
    return (
        <>
            {createPortal(
                <div id="modal" className="overlay">
                    <div className="modalStaff">
                        <div className='cross-container' onClick={props.onCloseClick}><img src={cross} className="close" /></div>
                        <img className="modalStaffPic" src={props.picture} alt="Photo de profil" />
                        <div className='modalTitle'>
                            <h4>{props.lastName} {props.firstName}</h4>
                            <div className='modalDepartment'>
                                <h6>{props.department}</h6>
                            </div>
                        </div>
                        <p className='modalLocalisation'>Localisé(e) à {props.town}</p>
                        <div className='modalSection'>Ma citation : <div className='modalText'>"{props.quote}"</div></div>
                        <div className='modalSection'>Ma formation : <div className='modalText'>{props.studies}</div></div>
                        <div className='modalSection'>Mon poste : <div className='modalText'>{props.job}</div></div>
                        <div className='modalSection'>Ma vision de gaea21 : <div className='modalText'>{props.gaeaVision}</div></div>
                        <div className='modalSection' id='sectionProjects'>Mes projets et sous projets :</div>
                        <div className='modalSection'>
                            <div className='modalText'>
                                <div className='modalTags'>
                                    <div className='modalProjects'>
                                        {props.projects.map((project, index) =>
                                            <Project key={index} project={project} />
                                        )}
                                    </div>
                                    <div className='modalSubprojects'>
                                        {props.subProjects.map((subProject, index) =>
                                            <Project key={index} project={subProject} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )
            }
        </>
    );
}

class Project extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="project">
            {this.props.project}
        </div>

    }
}