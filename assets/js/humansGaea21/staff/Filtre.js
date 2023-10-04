import React from 'react'



export default class Filtre extends React.Component {

    constructor(props) {
        super(props);
        this.lettre = [];
        this.state = {}
        this.lastLetter = "";
        let c = "a";
        let deb = c.charCodeAt();
        for (let i = deb + 1; i <= deb + 26; i++) {
            this.lettre.push(c);
            c = String.fromCharCode(i);
        }

        this.clickHandler = this.clickHandler.bind(this);
    }

    componentDidMount() {
        this.setState({ ancien: document.getElementById("filtrea") });
    }


    clickHandler(e) {
        let actualLetter = e.target.getAttribute("value");

        if (actualLetter == this.lastLetter) {
            e.target.style.fontWeight = "normal";
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "black";
            this.lastLetter = "";
            this.props.setFiltre(0, "");
        } else {
            e.target.style.fontWeight = "bold";
            e.target.style.backgroundColor = "#98984C";
            e.target.style.color = "white";
            if (this.lastLetter != "") {
                // console.log(this.lastLetter + " " + actualLetter)
                this.state.ancien.style.fontWeight = "normal";
                this.state.ancien.style.backgroundColor = "transparent";
                this.state.ancien.style.color = "black";
            }
            this.lastLetter = actualLetter;
            this.props.setFiltre(0, actualLetter);
        }

        this.setState({ ancien: e.target });
    }


    render() {
        return <React.Fragment>
            {this.lettre.map((elem, index) => (
                <p id={"filtre" + elem} key={index} value={elem} onClick={this.clickHandler} href="#">{elem}</p>
            ))}
        </React.Fragment>
    }
}