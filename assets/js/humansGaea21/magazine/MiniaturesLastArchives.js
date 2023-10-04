import React from 'react'
import MiniatureMagazine from './MinuatureMagazine.js'

export default class MiniaturesLastArchives extends React.Component{
    constructor(props){
        super(props);
        
        this.magazines = [];
        let max = 3;
        if(this.props.magazines.length < 3)
            max = this.props.magazines.length;
        //Récupèrer les 3 dernier magazine
        for(let i = 0; i < max; i++){
            this.magazines.push(this.props.magazines[i]);
        }

        this.monthName = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
                        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    }

    render(){
        return <React.Fragment>
            {this.magazines.map((elem, index) => (<MiniatureMagazine key={index} index={index} lienPdf={elem.lien} month={this.monthName[elem.month]} year={elem.year}/>))}
        </React.Fragment>
    }
}