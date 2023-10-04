import React from 'react';
import MagazineBook from './MagazineBook.js'
import ReactDOM from 'react-dom';


export default class ArchiveMagazine extends React.Component{
    constructor(props){
        super(props);

        this.state= {
            clicked: false,
            lienPdf: this.props.magazines[0].lien
        }


        this.index = null;
        this.listeMois;

        this.monthName = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
                        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
        
           
        this.handleMonthClick = this.handleMonthClick.bind(this);
    }

    componentDidMount() {
        this.listeMois = document.getElementById("listeMois").children;
    }

    componentDidUpdate(){
        ReactDOM.render(<MagazineBook lienPdf={this.state.lienPdf} idBook="1"/>,document.getElementById("livreArchive"));
    }

    handleMonthClick(e){
        console.log(this.props.magazines);  
        e.target.classList.add("clicked");
        var n = this.listeMois.length;
        for(let i =0; i < n ; i++){
            if(this.listeMois[i].textContent != e.target.textContent)
                this.listeMois[i].className = "btnMois";
            else{
                if(this.state.clicked)
                ReactDOM.unmountComponentAtNode(document.getElementById("livreArchive"));

                this.index = i;
                this.setState({lienPdf: this.props.magazines[i].lien})
            }
                
        }

        this.setState({clicked: true});
    }

    render() {

        return <React.Fragment>
            <h1>Archives</h1>
            <div id="listeMois"  className="buttonMois">
                {this.props.magazines.map((elem, index)=> (<button key={index} className="btnMois" onClick={this.handleMonthClick}>{this.monthName[elem.month-1]} {" "+elem.year}</button>))}
            </div>

            <div id="livreArchive">
            </div>
            
        </React.Fragment>
    }
}