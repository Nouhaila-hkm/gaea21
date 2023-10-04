import React from 'react';
import { staffs } from './TestStaff.js';
import ModalStaff from '../component/ModalStaff.js';
import cross from '../../..//images/cross.svg'

export default class GaeaStaffs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            paginate: 6,
        }

        this.staffs = staffs;

        // for (let i = 0; i < 100; i++) {
        //     this.staffs.push(staffs[i]);
        // }

        this.instances;
        this.instance;
        this.elems;
        this.affiche;

        // this.handleClick = this.handleClick.bind(this);
        this.loadMore = this.loadMore.bind(this);
    }

    filtreHandle() {
        let filteredStaff = [];
        let lettre = this.props.filtre.lettre;
        let dep = this.props.filtre.dep;
        let project = this.props.filtre.project
        let subProject = this.props.filtre.subProject

        this.staffs.forEach(function (elem) {
            //éliminer les espaces 
            dep = dep.trim();
            elem.department = elem.department.trim();

            //filtre prenom && departement && soit project n'est pas séléctionné soit le staff appartient au projet

            if ((lettre == "" || elem.lastName[0].toLowerCase() == lettre) &&
                (dep == "" || dep.includes(elem.department)) &&
                (project == "" || elem.projects.includes(project)) &&
                (subProject == "" || elem.subProjects.includes(subProject)))
                // console.log(lettre + " " + elem.lastName[0].toLowerCase())
                filteredStaff.push(elem)
        })
        console.log(filteredStaff)
        this.affiche = filteredStaff;
    }

    // Click pour afficher la modale
    // handleClick(e) {
    //     this.setState((state) => ({ show: true }));
    // }

    loadMore(e) {
        this.setState({ paginate: this.state.paginate + 6 });
    }

    render() {
        this.filtreHandle();
        let button;
        if (this.state.paginate < this.affiche.length) {
            button = <button className="btn btnShowMore" onClick={this.loadMore}>Voir plus</button>
        }

        return <div className="containerCards">
            <StaffList paginate={this.state.paginate} staffs={this.affiche} click={this.handleClick} />
            {button}
        </div>
    }
}


class StaffList extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        let staffs = []
        console.log(this.props.paginate)

        for (let i = 0; i < this.props.staffs.length; i++) {
            staffs.push(this.props.staffs[i])
        }

        return <div href={this.props.href}>
            <div className="staffGaea">
                {staffs
                    .slice(0, this.props.paginate)
                    .map((elem, index) =>
                        <Staff
                            key={index}
                            lastName={elem.lastName}
                            firstName={elem.firstName}
                            town={elem.town}
                            department={elem.department}
                            projects={elem.projects}
                            subProjects={elem.subProjects}
                            click={elem.click}
                            quote={elem.quote}
                            studies={elem.studies}
                            job={elem.job}
                            gaeaVision={elem.gaeaVision}
                            picture={elem.picture}
                        />
                    )}
            </div>
        </div>
    }
}


class Staff extends React.Component {
    constructor(props) {
        super(props);
        this.handleStaffClick = this.handleStaffClick.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.state = {
            showModal: false
        }


    }

    // setShowModal(isShow) {
    //     this.setState({ showModal: isShow });
    // }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleOutsideClick);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleOutsideClick);
    }

    handleOutsideClick(e) {
        if (e.target.id == "modal") {
            this.setState({ showModal: false })
        }
    }

    handleStaffClick() {
        //let root = ReactDOM.createRoot(document.getElementById("popup-root"));
        this.setState({ showModal: true })
        //document.documentElement.style.overflow = 'hidden';
    }

    handleCloseClick() {
        this.setState({ showModal: false })
    }

    render() {
        let modal
        if (this.state.showModal) {
            modal =
                <ModalStaff
                    picture={this.props.picture}
                    lastName={this.props.lastName}
                    firstName={this.props.firstName}
                    department={this.props.department}
                    town={this.props.town}
                    quote={this.props.quote}
                    studies={this.props.studies}
                    job={this.props.job}
                    gaeaVision={this.props.gaeaVision}
                    projects={this.props.projects}
                    subProjects={this.props.subProjects}
                    onCloseClick={this.handleCloseClick}
                >
                    <div className='cross-container'><img src={cross} className="close" /></div>
                </ModalStaff>
        }
        return <div id='staffCard' className="staff" >
            {modal}
            <div onClick={this.handleStaffClick} className="staffCard">
                <div>
                    <img className='profilePicture' src={this.props.picture} />
                </div>
                <div className='staffInfo'>
                    <h5>{this.props.lastName} {this.props.firstName}</h5>
                    <p className='localisation'>Localisé(e) à {this.props.town}</p>
                    <h6>{this.props.department}</h6>
                    <div id="popup-root"></div>
                    <div className='profileTags'>
                        <div className='profileProjects'>
                            {this.props.projects.map((project, index) =>
                                <Project key={index} project={project} />
                            )}
                        </div>
                        <div className='profileSubprojects'>
                            {this.props.subProjects.map((subProject, index) =>
                                <Project key={index} project={subProject} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    }
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
