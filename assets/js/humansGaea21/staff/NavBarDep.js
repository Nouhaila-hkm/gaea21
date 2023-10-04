

import React from 'react';


export default class NavBarDep extends React.Component {

    constructor(props) {
        super(props);

        this.dep;
        this.lastSelected = "";
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.dep = document.getElementsByClassName("scrollCercle");
    }

    handleClick(e) {
        let nbElem = this.dep.length;
        for (let i = 0; i < nbElem; i++) {
            if (e.target == this.dep[i]) {
                // console.log(this.lastSelected + " " + i)
                if (this.lastSelected !== i) {
                    this.dep[i].className = "scrollCercle selected"
                    this.lastSelected = i;
                    this.props.setFiltre(1, e.target.parentNode.textContent);
                } else {
                    this.dep[i].className = "scrollCercle"
                    this.lastSelected = "";
                    this.props.setFiltre(1, "");
                }
            } else {
                this.dep[i].className = "scrollCercle"
            }
        }
    }

    render() {
        return <React.Fragment>
            <h1>Département</h1>
            <ul>
                <li><div className="scrollCercle" onClick={this.handleClick}></div>Formation</li>
                <li><div className="scrollCercle" onClick={this.handleClick}></div>Observatoire</li>
                <li><div className="scrollCercle" onClick={this.handleClick}></div>Ressources humaines</li>
                <li><div className="scrollCercle" onClick={this.handleClick}></div>Marketing</li>
                <li><div className="scrollCercle" onClick={this.handleClick}></div>Communication visuelle</li>
                <li><div className="scrollCercle" onClick={this.handleClick}></div>Administration</li>
                <li><div className="scrollCercle" onClick={this.handleClick}></div>Juridique</li>
                <li><div className="scrollCercle" onClick={this.handleClick}></div>Culture</li>
            </ul>
        </React.Fragment>
    }
}