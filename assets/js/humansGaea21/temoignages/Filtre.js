import React from 'react'



export default class Filtre extends React.Component{

    constructor(props){
        super(props);
        this.lettre = [];
        this.state = {}
        let c = "a";
        let deb = c.charCodeAt();
        for(let i = deb+1; i <= deb+26; i++){
            this.lettre.push(c);
            c = String.fromCharCode(i);
        }


        this.clickHandler = this.clickHandler.bind(this);
    }

    componentDidMount(){
        this.setState({ancien: document.getElementById("filtrea")});
        document.getElementById("filtrea").style.fontWeight = "bold";
    }


    clickHandler(e) {
        e.target.style.fontWeight = "bold";
        this.state.ancien.style.fontWeight= "normal";

        this.props.setFiltre(0 ,e.target.textContent);
        this.setState({ancien: e.target});
    }


    render(){
        return <React.Fragment>
            {this.lettre.map((elem, index) => (
                <p id={"filtre"+elem} key={index} onClick={this.clickHandler} href="#">{elem}</p>
            ))}
        </React.Fragment>
    }
}