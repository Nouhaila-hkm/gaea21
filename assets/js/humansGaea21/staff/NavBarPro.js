import React from 'react';
import { staffs } from './TestStaff.js';
import AutoComplete from './AutoComplete.js';
import { useEffect, useRef } from 'react';


export default class NavBarPro extends React.Component {

    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleClearProjectClick = this.handleClearProjectClick.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.staffs = staffs;
        this.projects = [];

        this.ref = React.createRef();


        //charge les données selon s'il s'agit d'un projet ou d'un sous-projet
        if (this.props.projectType == "project") {
            this.staffs.forEach((staff) => {
                staff.projects.forEach((project) => {
                    if (!this.projects.includes(project)) {
                        this.projects.push(project);
                    }
                })
            })
        } else {
            this.staffs.forEach((staff) => {
                staff.subProjects.forEach((subProject) => {
                    if (!this.projects.includes(subProject)) {
                        this.projects.push(subProject);
                    }
                })
            })
        }
        this.state = {
            inputValue: "",
            matchingProjects: [""],
            showSuggestions: false,
            selectedProject: "",
            selectedSubProject: "",
        }
    }

    handleSearchClick(e) {
        if (!this.state.showSuggestions) {
            this.setState({ showSuggestions: true })
            this.handleFilterTextChange(e);
        }
        else {
            this.setState({ showSuggestions: false })
        }
    }

    handleOutsideClick(e) {
        console.log(e.target)
        if (this.ref && !this.ref.current.contains(e.target)) {
            if (this.state.showSuggestions) {
                this.setState({ showSuggestions: false })
            }
        }
    }

    handleFilterTextChange(e) {
        let matching = [];
        this.projects.forEach((project) => {
            if (project.toLowerCase().includes(e.target.value.toLowerCase())) {
                matching.push(project)
            }
        })
        this.setState({
            inputValue: e.target.value,
            matchingProjects: matching,
            showSuggestions: true
        })
    }

    handleItemClick(project) {
        if (this.props.projectType == "project") {
            this.setState({
                inputValue: "",
                showSuggestions: false,
                selectedProject: project
            })
            this.props.setFiltre(2, project);
        } else {
            this.setState({
                inputValue: "",
                showSuggestions: false,
                selectedSubProject: project
            })
            this.props.setFiltre(3, project);
        }
    }

    handleClearProjectClick() {
        if (this.props.projectType == "project") {
            this.setState({
                selectedProject: ""
            })
            this.props.setFiltre(2, "");
        } else {
            this.setState({
                selectedSubProject: ""
            })
            this.props.setFiltre(3, "");
        }
    }

    render() {
        let title;
        let selected;
        //Affichage différents s'il s'agit d'un projet ou d'un sous-projets
        if (this.props.projectType == "project") {
            title = <h1>Projets</h1>
            if (this.state.selectedProject != "") {
                selected = <div className="projectFilter">{this.state.selectedProject} <a class="selectedA" onClick={this.handleClearProjectClick}>X</a></div>
            }
        } else {
            title = <h1>Sous-Projets</h1>
            if (this.state.selectedSubProject != "") {
                selected = <div className="subProjectFilter">{this.state.selectedSubProject} <a class="selectedA" onClick={this.handleClearProjectClick}>X</a></div>
            }
        }

        return <React.Fragment>
            {title}
            {selected}
            <div className="rechercheDiv">

                <input ref={this.ref} type="search" onClick={this.handleSearchClick} value={this.state.inputValue} onChange={this.handleFilterTextChange}></input>
                <img src="../../images/humansGaea21/loup.jpg"></img>
            </div>
            <AutoComplete
                handleItemClick={this.handleItemClick}
                projects={this.state.matchingProjects}
                showSuggestions={this.state.showSuggestions}
                handleOutsideClick={this.handleOutsideClick} />
        </React.Fragment>
    }
}