import React from 'react';
import Indicator from './../component/Indicator';
import { temoignagesVideo } from './TestTem.js';

export default class GaeaVideos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            show: false
        }

        this.temoignagesVideo = temoignagesVideo;

        for (let i = 0; i < 100; i++) {
            this.temoignagesVideo.push(temoignagesVideo[i]);
        }
        //this.temoignagesVideo.push(temoignagesVideo);
        //this.temoignagesVideo.push(temoignagesVideo);

        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.instances;
        this.instance;
        this.elems;

        this.draged = this.draged.bind(this);

        this.handleClick = this.handleClick.bind(this);
        this.otherClick = this.otherClick.bind(this);


        ///Afficher la liste des videos normal 
        document.getElementById("temoignage").addEventListener("mousedown", this.otherClick)
    }

    otherClick() {
        this.setState((state) => ({ show: false }));
    }

    filtreHandel() {
        let newTem = [];
        let c = this.props.filtre.lettre;
        let dep = this.props.filtre.dep;

        this.temoignagesVideo.forEach(function (elem) {
            //eleminer les espace 
            dep = dep.trim();
            elem.department = elem.department.trim();

            if (elem.titre[0].toLowerCase() == c && dep.includes(elem.department))
                newTem.push(elem)
        })
        this.affiche = newTem;
    }

    draged() {

        this.instance.images.forEach((elem, index) => {
            if (elem.className == "carousel-item active")
                this.setState({ id: index })
        });

    }

    componentDidMount() {
        this.elems = document.querySelectorAll('.carousel');
        this.instances = M.Carousel.init(this.elems);
        this.instance = M.Carousel.getInstance(this.elems[0]);
    }

    handleNext() {
        this.instance.next();
        this.setState((state) => ({ id: (state.id + 1) % 4 }));
    }

    handlePrev() {
        this.instance.prev();
        this.setState((state) => ({ id: (state.id - 1) % 4 }))
    }

    handleClick(e) {
        this.setState((state) => ({ show: true }));
    }

    render() {
        this.filtreHandel();
        return <React.Fragment>
            <div id="carouselGaeaVideo" className="carousel carousel-slider" data-bs-ride="carousel" onMouseOverCapture={this.draged}>
                {(this.state.show) ? <VideoLancer /> : false}
                <ListSlide temoignage={this.affiche} click={this.handleClick} />
            </div>
            <div className="scrollImage">
                <img className="scrollRow" src="../../images/humansGaea21/Tracé 1111@2x.png" onClick={this.handlePrev} />
                <Indicator id="scrolVideo" index={this.state.id} />
                <img className="scrollRow" src="../../images/humansGaea21/Tracé 1110@2x.png" onClick={this.handleNext} />
            </div>
        </React.Fragment>
    }
}

class ListSlide extends React.Component {
    constructor(props) {
        super(props);
        this.nb = this.props.temoignage.length / 4;
        this.tem1 = [];
        this.tem2 = [];
        this.tem3 = [];
        this.tem4 = [];
    }

    affecterTem() {
        this.tem1 = [];
        this.tem2 = [];
        this.tem3 = [];
        this.tem4 = [];
        for (let i = 0; i < this.props.temoignage.length; i++) {
            if (i <= this.nb)
                this.tem1.push(this.props.temoignage[i]);
            else if (i <= this.nb * 2)
                this.tem2.push(this.props.temoignage[i]);
            else if (i <= this.nb * 3)
                this.tem3.push(this.props.temoignage[i]);
            else
                this.tem4.push(this.props.temoignage[i]);
        }

    }
    render() {
        this.affecterTem();
        return <React.Fragment>
            <Slide temoignage={this.tem1} href="#one" click={this.props.click} />
            <Slide temoignage={this.tem2} href="#two" click={this.props.click} />
            <Slide temoignage={this.tem3} href="#three" click={this.props.click} />
            <Slide temoignage={this.tem4} href="#four" click={this.props.click} />
        </React.Fragment>
    }
}

class Slide extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return <div id="itemVideo" className="carousel-item" href={this.props.href}>
            <div className="videosGaea">
                {this.props.temoignage.map((elem, index) =>
                    <Video key={index} title={elem.titre} auther={"EXPLICATION DU PROJET " + elem.department} click={this.props.click} />
                )}
            </div>
        </div>
    }
}

class Video extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.click();
    }

    render() {
        return <div className="video" onClick={this.handleClick}>
            <p className="videoTitle">{this.props.title}</p>
            <p className="videoSubTitle">{this.props.auther}</p>
        </div>
    }
}


class VideoLancer extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        return <video className="videoLancer" controls poster='../../images/humansGaea21/temoignage.jpg'>

        </video>
    }
}