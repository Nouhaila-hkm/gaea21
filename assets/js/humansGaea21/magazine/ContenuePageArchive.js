import React from 'react'
import MagazineBook from './MagazineBook';
import ReactDOM from 'react-dom';

export default class ContenuePageArchive extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            showMonth: false,
            monthSelected: 3,
            showYear: true,
            yearSelected: 0
        }

        this.monthName = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

        this.handleMonthClick = this.handleMonthClick.bind(this);
        this.handleYearClick = this.handleYearClick.bind(this);
        this.monthSelect = this.monthSelect.bind(this);
        this.yearSelect = this.yearSelect.bind(this);

    }

    componentDidMount() {
        this.listeMois = document.getElementById("listeMonth");
        this.listeAnnee = document.getElementById("listeAnnee");
        this.row = document.getElementsByClassName("row");

        this.listeMois.style.display = "none";
        this.row[0].style.transform = "rotate(-90deg)";

        this.listeAnnee.style.display = "none";
        this.row[1].style.transform = "rotate(-90deg)";

        this.listeMois.children[this.state.monthSelected].classList.add("valide");
        this.listeAnnee.children[this.state.yearSelected].classList.add("valide");
    }

    handleMonthClick(){
        if(this.state.showMonth == true){
            this.listeMois.style.display = "none";
            this.setState({showMonth: false});
            this.row[0].style.transform = "rotate(-90deg)";
           
        }else{
            this.listeMois.style.display = "flex";
            this.setState({showMonth: true});
            this.row[0].style.transform = "rotate(90deg)";
        }

    }

    handleYearClick(){
        if(this.state.showYear == true){
            this.listeAnnee.style.display = "none";
            this.setState({showYear: false});
            this.row[1].style.transform = "rotate(-90deg)";
           
        }else{
            this.listeAnnee.style.display = "flex";
            this.setState({showYear: true});
            this.row[1].style.transform = "rotate(90deg)";
        }
    }

    monthSelect(e){
        var index = e.target.attributes[1].value;
        
        this.listeMois.children[this.state.monthSelected].classList.remove("valide");
        this.listeMois.children[index].classList.add("valide");

        document.getElementById("monthValue").textContent = this.listeMois.children[index].textContent;

        this.setState({monthSelected: index});

        this.handleMonthClick();
    }

    yearSelect(e){
        var index = e.target.attributes[1].value;
        
        this.listeAnnee.children[this.state.yearSelected].classList.remove("valide");
        this.listeAnnee.children[index].classList.add("valide");

        document.getElementById("yearValue").textContent = this.listeAnnee.children[index].textContent;

        this.setState({yearSelected: index});

        this.handleYearClick();
    }

    afficheMagazine(){
        var existe = false;
        var i = 0;
        while(existe == false && i < this.props.magazines.length){
            //console.log(this.props.magazines[i].year, " et ", this.state.yearSelected);
            if(this.props.magazines[i].month == this.state.monthSelected && this.props.magazines[i].year == this.listeAnnee.children[this.state.yearSelected].textContent){
                existe = true;
                console.log("Hello");
            }
            i++
        }

        if(existe == true){
            console.log("Hello");
            ReactDOM.unmountComponentAtNode(document.getElementById("magazinebook"));
            ReactDOM.render(<MagazineBook lienPdf={this.props.magazines[i-1].lien}/>, document.getElementById("magazinebook"));
        }
    }
    render() {
        this.afficheMagazine();
        return <React.Fragment>
            <h1>Les archives du magazine</h1>
            
            <div className="contenueArchive">
                <div className="menuArchive">
                    <div className="month">
                        <p>Mois : </p>
                        <div id="month-select" className="select">
                            <p className="selected" onClick={this.handleMonthClick}><p id="monthValue">Avril</p> &nbsp;  &nbsp;<img className="row" src="../../images/humansGaea21/Tracé 1105@2x.png"></img></p>
                            <div id="listeMonth">
                                {this.monthName.map((elem, index) => (<p className="mois" key={index} value={index} onClick={this.monthSelect}>{elem}</p>))}    
                            </div>
                        </div>
                    </div>

                    <div className="year">
                        <p >Année :</p>
                        <div id="year-select" className="select">
                            <p className="selected" onClick={this.handleYearClick}><p id='yearValue'>2022</p> &nbsp;  &nbsp;<img className="row" src="../../images/humansGaea21/Tracé 1105@2x.png"></img></p>
                            <div id="listeAnnee">
                                <p className="annee" value="0" onClick={this.yearSelect}>2022</p>
                                <p className="annee" value="1" onClick={this.yearSelect}>2021</p>
                                <p className="annee" value="2" onClick={this.yearSelect}>2020</p>
                            </div>
                        </div>
                    </div>
                
                </div>
                <div id="magazinebook" className="magazinebook">
                    <MagazineBook  idBook="0"/>
                </div>
            </div>
        </React.Fragment>
    }
}