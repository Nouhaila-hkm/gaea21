import React from 'react'

export default class Indicator extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.onglets = []
        console.log(this.props.nbOnglet)
        for (let i = 0; i < this.props.nbOnglet; i++) {
            console.log(i)
            this.onglets.push(document.getElementById(this.props.id + i))
        }
        console.log(this.onglets);
        //this.onglets[this.props.index].style.backgroundColor = "#98984C";
    }

    componentDidUpdate() {
        this.onglets.forEach((element, index) => {
            if (index == this.props.index)
                element.style.backgroundColor = "#98984C";
            else
                element.style.backgroundColor = "#ffffff"
        })
    }

    render() {
        return <div className="indicator">
            <div id={this.props.id + "0"} className="scrollCercle"></div>
            <div id={this.props.id + "1"} className="scrollCercle"></div>
            <div id={this.props.id + "2"} className="scrollCercle"></div>
        </div>
    }
}

Indicator.defaultProps = {
    id: 0
}

