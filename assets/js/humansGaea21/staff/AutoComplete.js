import React, { Component, Fragment } from "react";


export default class AutoComplete extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this)

        this.ref = React.createRef();
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleOutsideClick);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleOutsideClick);
    }


    handleOutsideClick(e) {
        if (this.props.showSuggestions) {
            if (this.ref && !this.ref.current.contains(e.target)) {
                this.props.handleOutsideClick(e)
            }
        }
    }

    handleClick(e) {
        this.props.handleItemClick(e.currentTarget.innerText)
    };

    render() {
        let projectSuggestions;
        if (this.props.projects.length) {
            if (this.props.showSuggestions) {
                projectSuggestions = (
                    <ul ref={this.ref} className="projects">
                        {this.props.projects.map((project, index) => {
                            return (
                                <li value={project} onClick={this.handleClick} key={index}>
                                    {project}
                                </li>
                            );
                        })}
                    </ul>
                );
            }
        } else {
            projectSuggestions = (
                <div className="no-suggestions">
                    <em>Aucune correspondance</em>
                </div>
            );
        }

        return (
            <Fragment>
                {projectSuggestions}
            </Fragment>
        );
    }
}
