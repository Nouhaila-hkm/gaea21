import React from 'react'


export default class MagazineHumans extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        return <React.Fragment>
            <h1>Le magazine du mois !</h1>
            <Magazine/>
        </React.Fragment>
    }
}

class Magazine extends React.Component{

     constructor(props){
        super(props);

        
        this.state = {
            //Savoir si le pdf du magazine est chargé ou nn 
            loaded : false
        }

        if(this.props.lienPdf != null)
            this.lienPdf = this.props.lienPdf;
        else
            this.lienPdf = '../../../Model/HumansGaea/Magazine/Magazine Humans of Gaea Juin 2022.pdf';

        //La variable qui sert à savoir la position actuel dans le livre 
        this.currentLocation = 1;
        //Le nombre de page du livre 
        this.nbPage = 3; 
        
        //La variable qui sauvegarde le pdf sur magazine 
        this.magazine = false;

        //Le tableau qui sauvegarde les pages du magazine
        this.pageMagazine = [];

        ///Les deux button suivant et arrière 
        this.prevButtonClick = this.prevButtonClick.bind(this);
        this.nextButtonClick = this.nextButtonClick.bind(this);
        //La function qui permet d'aller en arriére de façon que le designe soit agréable 
        this.prevFunction  = this.prevFunction.bind(this);


        //importer le pdf
        this.pdf = pdfjsLib.getDocument(this.lienPdf);
    }

    initMagazine(){
        let i = 0;
        let index = 0;

        while(i < this.pageMagazine.length){    
            var canvas = document.getElementById("cf"+index);
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

            if(i < this.pageMagazine.length){
                var canvasB = document.getElementById("cb"+index);
                var contextB = canvasB.getContext("2d");
                var viewportB = this.pageMagazine[i].getViewport({scale: scale});
                canvasB.width = viewport.width;
                canvasB.height = viewport.height;
                this.pageMagazine[i].render({
                    canvasContext: contextB,
                    viewport : viewportB
                }) 
                i++;
                index++;
            }else{
                var canvasB = document.getElementById("cb"+index);
                var contextB = canvasB.getContext("2d");
                var viewportB = this.pageMagazine[i-1].getViewport({scale: scale});
                canvasB.width = viewport.width;
                canvasB.height = viewport.height;
                this.pageMagazine[i-1].render({
                    canvasContext: contextB,
                    viewport : viewportB
                }) 
                i++;
                index++;
            }
        }
    }

    async componentDidMount(){

        this.book = document.getElementById("book");
        
        this.prevButton = document.getElementById("prevRow");
        this.nextButton = document.getElementById("nextRow");
        
    
        this.magazine = await this.pdf.promise.then(function(pdf) {
            return pdf;
        });
        

        if(this.magazine._pdfInfo.numPages % 2 == 0)
            this.nbPage = this.magazine._pdfInfo.numPages/2;
        else
            this.nbPage = Math.trunc(this.magazine._pdfInfo.numPages/2) +1 ;

        
        this.maxLocation = this.nbPage + 1;

        for(let i = 1; i <= this.magazine._pdfInfo.numPages; i++){
            var newPage = await this.magazine.getPage(i).then(function(page){
                return page;
            });
            this.pageMagazine.push(newPage);
        }
        
        if(this.magazine != false){
            this.setState({loaded: true});
        }

        
        this.paper = this.book.children; 
        
        this.initMagazine();
        
    }

    openBook(){
        this.book.style.transform = "translateX(50%)";
        this.prevButton.style.transform = "translateX(-1500%)";
        this.nextButton.style.transform = "translateX(1500%)";
    }

    closeBook(isEnd){
        if(isEnd){
            this.book.style.transform = "translateX(100%)";
        }else{
            this.book.style.transform = "translateX(0%)";
        }
        
        this.prevButton.style.transform = "translateX(0px)";
        this.nextButton.style.transform = "translateX(0px)";
    }
    
    async prevButtonClick(){

        if(this.currentLocation > 1 && this.prevButton.disabled != true){
            this.prevButton.disabled = true;
            if(this.currentLocation == 2){
                this.closeBook(false);
            } 
            else if(this.currentLocation == this.maxLocation)
                this.openBook();

            
            this.paper[this.currentLocation -2].classList.remove("flipped");
            this.indexPrev = this.currentLocation;

            this.currentLocation--;
            setTimeout(this.prevFunction, 1000);
        }
    }

    prevFunction(){
        this.paper[this.indexPrev -2].style.zIndex = this.maxLocation+1-this.indexPrev;
        this.prevButton.disabled = false;
    }

    nextButtonClick(){
        
        if(this.currentLocation < this.maxLocation){
            
            if(this.currentLocation == 1)
                this.openBook();
            else if(this.currentLocation == this.nbPage)
                this.closeBook(true);

            
            this.paper[this.currentLocation -1].style.zIndex = this.maxLocation;
            this.paper[this.currentLocation -1].classList.add("flipped");
            
            //this.paper[this.currentLocation -1].children[0].style.zIndex = 0;
            
            
            this.currentLocation++;
        }    
    }

    render(){
        if(this.state.loaded == false){
            return <section className="MagazineSection">
                <img id='prevRow' src="../../../images/humansGaea21/Tracé 1111@2x.png" onClick={this.prevButtonClick}></img>

                <div id="book" className="book">                    
                </div>

                <img id='nextRow' src="../../../images/humansGaea21/Tracé 1110@2x.png" onClick={this.nextButtonClick}></img>

            </section>
        }else{
            console.log("hello");
            let pages = [];
            for(let i = 0; i < this.nbPage; i++)
                pages.push(<Page key={i+1} nb={i} contenuFont={"Font "+i} contenuBack={"Back "+i} index={this.nbPage-i}/>);

            //Attendre que le magazine ce charge 
            setTimeout(function(){
                document.getElementById("book").style.zIndex = "1";
            },6000);
            return <section className="MagazineSection">
        
                <img id='prevRow' src="../../../images/humansGaea21/Tracé 1111@2x.png" onClick={this.prevButtonClick}></img>

                <div id="book" className="book" style={{zIndex: "-1"}}>
                    {pages}  
                </div>

                <img id='nextRow' src="../../../images/humansGaea21/Tracé 1110@2x.png" onClick={this.nextButtonClick}></img>

            </section>
        }
    }
}

class Page extends React.Component {
    constructor(props){
        super(props);
    }

    render() {        
        return <div id={"p"+this.props.nb} className="paper" style={{zIndex: this.props.index}}>
        <div className="front" >
            <div id={"f"+this.props.nb} className="front-content">
                <canvas id={"cf"+this.props.nb} >{this.props.contenuFont} </canvas>
            </div>
        </div>

        <div className="back">
            <div id={"b"+this.props.nb} className="back-content">
                <canvas id={"cb"+this.props.nb} >{this.props.contenuBack}</canvas>
            </div>
        </div>

    </div>
    }
}