import React from 'react';
import Indicator from './../component/Indicator';
import { temoignagesVideo } from './TestTem.js';
import ReactDOM from 'react-dom';


export default class GaeaPodcast extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            show: false,
            podcastActuel: null
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
        ReactDOM.render(<React.Fragment></React.Fragment>, document.getElementById("lecturePodcast"));
        if (this.state.podcastActuel != null) {
            this.state.podcastActuel.children[1].src = "../../../images/humansGaea21/Polygone 1.svg";
            this.state.podcastActuel.className = "podcastAudio";
            this.setState({ podcastActuel: null });
        }

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

    ///Lors du click sur un podcast , on le lance.
    handleClick(e) {
        //Si il y a un podcast qui est en cours de lecture en l'arret et mis le designe 
        ReactDOM.render(<PodcastLecture name={e.parentNode.children[1].textContent} />, document.getElementById("lecturePodcast"));
        let etatPodcast = e.children[1];

        if (e != null) {

            etatPodcast.src = "../../../images/humansGaea21/Groupe 876.svg";
            e.className = "podcastAudio clicked";
            console.log(e.className);
            if (this.state.podcastActuel == null) {
                this.setState({ podcastActuel: e });
            } else {
                this.state.podcastActuel.children[1].src = "../../../images/humansGaea21/Polygone 1.svg";
                this.state.podcastActuel.className = "podcastAudio";
                this.setState({ podcastActuel: e });
            }
        }
    }

    render() {
        this.filtreHandel();
        return <React.Fragment>
            <div id="carouselGaeaPodcast" className="carousel carousel-slider" data-bs-ride="carousel" onMouseOverCapture={this.draged}>
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

        return <div id="itemPodcast" className="carousel-item" href={this.props.href}>
            <div className="podcastGaea">
                {this.props.temoignage.map((elem, index) =>
                    <Podcast key={index} title={elem.titre} auther={"EXPLICATION DU PROJET " + elem.department} click={this.props.click} />
                )}
            </div>
        </div>
    }
}

class Podcast extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {

        if (e.target.className == "podcastAudio") {
            this.props.click(e.target);
        } else {
            this.props.click(e.target.parentNode);
        }
    }

    render() {
        return <React.Fragment>
            <div className="podcast" >
                <div className="podcastAudio" onClick={this.handleClick}>
                    <img className="imagePodcast" src="../../../images/humansGaea21/Capture d’écran 2022-05-18 à 18.59@2x.png" >
                    </img>

                    <img className="etatPodcast" src="../../../images/humansGaea21/Polygone 1.svg"></img>
                </div>

                <p className="podcastName">{this.props.title}</p>
            </div>

        </React.Fragment>
    }
}


class PodcastLecture extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return <div className="podcastPersonne">
            <audio className="audioPodcast" controls>

            </audio>

            <p>Témoignages de {this.props.name}</p>
        </div>

    }
}