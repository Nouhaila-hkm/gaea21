import { func } from 'prop-types';
import React from 'react';
import Indicator from './component/Indicator.js'


export default class GaeaLife extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id :0,
            src : "../../images/humansGaea21/MSS-20160930-10-MSS-S-D-30-09-2016.png",
            nom : "",
            show : false
        }

        this.modalClose = this.modalClose.bind(this);
        this.carouClick = this.carouClick.bind(this);

        this.handleClick = this.handleClick.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);

        ///Variable pour le carousel 
        this.instances;
        this.instance;
        this.elems;
        this.elemsMod;
        this.instanceModal;

        this.draged = this.draged.bind(this);
    }

    draged(){

        this.instance.images.forEach((elem, index) => {
            if(elem.className == "carousel-item active")
                this.setState({id : index})
        });
        
    }

    componentDidMount() {
        this.elems = document.querySelectorAll('.carousel');
        this.instances = M.Carousel.init(this.elems);
        this.instance = M.Carousel.getInstance(this.elems[0]);
        
    }

    handleNext(){
        this.instance.next();
        this.setState((state)=>({id : (state.id + 1)%4}))
    }

    handlePrev(){
        this.instance.prev();
        this.setState((state)=>({id : (state.id -1)%4}))
    }

    handleClick(e){
        
        this.setState({
            src: e,
            show: true
        });
    }

    carouClick(e){
        e.preventDefault();
    }

    modalClose(){
        
        this.setState({show: false});

    }
    render(){
        return <React.Fragment>
            <h1 className="titleGaeaLife">gaea21's life</h1>
            
                <div className="carouselLife">
                    
                    <div className="carousel carousel-slider" data-bs-ride="carousel" onMouseOverCapture={this.draged}>
                        {(this.state.show) ? <ModalLife src={this.state.src} modalClose={this.modalClose}/> : false}
                        <ListSlide opacity={this.state.opacity} onClick={this.handleClick}/>
                    </div>
                </div>
                
                
            <div className="scrollImage">
                <img className="scrollRow" src="../../images/humansGaea21/Tracé 1111@2x.png" onClick={this.handlePrev}/>
                <Indicator id="scrolLife" index={this.state.id}/>
                <img className="scrollRow" src="../../images/humansGaea21/Tracé 1110@2x.png" onClick={this.handleNext}/>
            </div>            
        </React.Fragment>
    }
}

class ListSlide extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            opacity: this.props.opacity
        }
    }
    render(){
        return <React.Fragment>
            <Slide1 opacity={this.state.opacity} onClick={this.props.onClick}/>
            <Slide2  opacity={this.state.opacity} onClick={this.props.onClick}/>
            <Slide3 opacity={this.state.opacity} onClick={this.props.onClick}/>
            <Slide4 opacity={this.state.opacity} onClick={this.props.onClick}/>
        </React.Fragment>
    }
}


class Slide1 extends React.Component{

    constructor(props){
        super(props);
    }

    render(){

        return <div className="carousel-item" href="#one">
            <div style={{opacity:this.props.opacity}} className="imagesGaeaLife">
                <Evenement src="../../images/humansGaea21/MSS-20160930-10-MSS-S-D-30-09-2016.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/Groupe de masques 46.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/Volleyball-20160624-07.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/MSS-20160930-10-MSS-S-D-30-09-2016.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/Groupe de masques 46.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/Volleyball-20160624-07.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/Groupe de masques 46.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/img1.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/MSS-20160930-16-MSS-S-D-30-09-2016.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/img1.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/MSS-20160930-16-MSS-S-D-30-09-2016.png" onClick={this.props.onClick}/>

            </div>
        </div>
    }
}

class Slide2 extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
    return <div className="carousel-item" href="#two">
                <div style={{opacity:this.props.opacity}} className="imagesGaeaLife">

                <Evenement src="../../images/humansGaea21/Groupe de masques 46.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/Volleyball-20160624-07.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/MSS-20160930-10-MSS-S-D-30-09-2016.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/Groupe de masques 46.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/Volleyball-20160624-07.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/img1.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/Groupe de masques 46.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/MSS-20160930-16-MSS-S-D-30-09-2016.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/img1.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/MSS-20160930-16-MSS-S-D-30-09-2016.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/MSS-20160930-10-MSS-S-D-30-09-2016.png" onClick={this.props.onClick}/>
                </div>
                   
            </div>
}
}

class Slide3 extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return <div  className="carousel-item" href="#three">
                <div className="imagesGaeaLife">

                <Evenement src="../../images/humansGaea21/Groupe de masques 46.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/Volleyball-20160624-07.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/img1.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/MSS-20160930-10-MSS-S-D-30-09-2016.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/Groupe de masques 46.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/Volleyball-20160624-07.png" onClick={this.props.onClick}/>
               
                <Evenement src="../../images/humansGaea21/MSS-20160930-16-MSS-S-D-30-09-2016.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/Groupe de masques 46.png" />
                <Evenement src="../../images/humansGaea21/MSS-20160930-16-MSS-S-D-30-09-2016.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/img1.png" />
                </div>
                   
            </div>
}
}

class Slide4 extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
    return <div className="carousel-item" href="#for">
                <div className="imagesGaeaLife">

                <Evenement src="../../images/humansGaea21/MSS-20160930-16-MSS-S-D-30-09-2016.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/MSS-20160930-16-MSS-S-D-30-09-2016.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/img1.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/Groupe de masques 46.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/Volleyball-20160624-07.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/img1.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/MSS-20160930-10-MSS-S-D-30-09-2016.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/Groupe de masques 46.png" onClick={this.props.onClick}/>
                <Evenement src="../../images/humansGaea21/Volleyball-20160624-07.png" onClick={this.props.onClick}/>
                
                </div>   
            </div>
}
}

class Evenement extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(e){
        this.props.onClick(e.target.src);
    }

    render(){
        return <img className="lifeImage" src={this.props.src} onClick={this.handleClick}/>
    }
}



class ModalLife extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log(document.getElementsByClassName("imgModal")[0].width);
    }

    render(){
        return <div className="grandModal">
            <div className="modalLife">
                <a className="closeModal"><a href="#"  onMouseUp={this.props.modalClose}>&times;</a></a>
                <img className="imgModal" src={this.props.src}/>
                <p className='titreModal'>Nom de l'événement</p>
            </div>
        </div>
    }
}