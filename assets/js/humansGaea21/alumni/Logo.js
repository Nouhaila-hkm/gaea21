import React from "react";

export default class Logo extends React.Component{

    constructor(props){
        super(props);
        this.logos = [
            {
                normal: "../../images/humansGaea21/Alumni/1.png",
                hover: "../../images/humansGaea21/Alumni/1_hover.png"
            },
            {
                normal: "../../images/humansGaea21/Alumni/2.png",
                hover: "../../images/humansGaea21/Alumni/2_hover.png"
            },
            {
                normal: "../../images/humansGaea21/Alumni/3.png",
                hover: "../../images/humansGaea21/Alumni/3_hover.png"
            },
            {
                normal: "../../images/humansGaea21/Alumni/4.png",
                hover: "../../images/humansGaea21/Alumni/4_hover.png"
            },
            {
                normal: "../../images/humansGaea21/Alumni/5.png",
                hover: "../../images/humansGaea21/Alumni/5_hover.png"
            }
        ]

        this.handleEnter = this.handleEnter.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
    }
    
    handleLeave(e){
        let elem = null
        if(e.target.childNodes.length == 0)
             elem = e.target;
        else
             elem = e.target.childNodes[0];
        
        if(elem != null){
            elem.src = this.logos[parseInt(elem.className)].normal;
            elem.parentNode.style.backgroundColor = "#F6F6F6";
        }
    }
    handleEnter(e){
        
        let elem = null
        if(e.target.childNodes.length == 0)
             elem = e.target;
        else
             elem = e.target.childNodes[0];
        
        if(elem != null){
            elem.src = this.logos[parseInt(elem.className)].hover;
            elem.parentNode.style.backgroundColor = "#98984C";
        }
        
    }

    render(){
        return <React.Fragment>

            {this.logos.map( (elem, indice) =>  <div key={indice} className={indice+" logo" } onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave}><img className={indice} src={elem.normal}/> </div>)}

            
        </React.Fragment>
    }
}