import React from 'react'


export default class MinuatureMagazine extends React.Component {
    constructor(props){
        super(props);

        if(this.props.lienPdf != null){
            this.lienPdf = this.props.lienPdf;
        }else
            this.lienPdf = '../../../Model/HumansGaea/Magazine/Magazine Humans of Gaea Juin 2022.pdf';
 
        
        //La variable qui sauvegarde le pdf du magazine 
        this.magazine = false;
 
        //Le tableau qui sauvegarde les deux pages du magazine a afficher
        this.pageMagazine = [];
 
        //importer le pdf
        this.pdf = pdfjsLib.getDocument(this.lienPdf);           
    }

    initMagazine(){
        let i = 0;
        
        var canvas = document.getElementById("cf"+this.props.index);
        var context = canvas.getContext("2d");
        var scale = 1.5;
        var viewport = this.pageMagazine[i].getViewport({scale: scale});
 
        canvas.width = viewport.width;
        canvas.height = viewport.height;
 
        this.pageMagazine[i].render({
            canvasContext: context,
            viewport : viewport
        })
        i++;
 
        var canvasB = document.getElementById("cb"+this.props.index);
        var contextB = canvasB.getContext("2d");
        var viewportB = this.pageMagazine[i].getViewport({scale: scale});
        canvasB.width = viewport.width;
        canvasB.height = viewport.height;
        this.pageMagazine[i].render({
            canvasContext: contextB,
            viewport : viewportB
        })    
    }

    async componentDidMount(){

        this.magazine = await this.pdf.promise.then(function(pdf) {
            return pdf;
        });
    
    
 
        for(let i = 2; i <= 3; i++){
            var newPage = await this.magazine.getPage(i).then(function(page){
                return page;
            });
            this.pageMagazine.push(newPage);
        }
        
        if(this.magazine != false){
            this.setState({loaded: true});
        }
 
        this.initMagazine();
        
    }

    render() {
        return <div className="miniatures">

                <div className="miniatureMois">
                    <canvas id={"cf"+this.props.index} className="page1"></canvas>
                    <canvas id={"cb"+this.props.index} className="page2"></canvas>
                </div>
                
                <p>{this.props.month} {" "+this.props.year}</p>
        </div>
    }

}