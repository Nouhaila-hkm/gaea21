import React from 'react';
import Indicator from './component/Indicator';

export default class GaeaVideos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0
        }

        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.instances;
        this.instance;
        this.elems;

        this.draged = this.draged.bind(this);

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
        this.instance = M.Carousel.getInstance(this.elems[1]);
    }

    handleNext() {
        this.instance.next();
        this.setState((state) => ({ id: (state.id + 1) % 4 }));
    }

    handlePrev() {
        this.instance.prev();
        this.setState((state) => ({ id: (state.id - 1) % 4 }))
    }

    render() {
        return <React.Fragment>
            <h1 className="titleGaeaVideo">Vidéos</h1>
            <div id="carouselGaeaVideo" className="carousel carousel-slider" data-bs-ride="carousel" onMouseOverCapture={this.draged}>
                <ListSlide />
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
    }
    render() {
        return <React.Fragment>
            <Slide href="#one" />
            <Slide href="#two" />
            <Slide href="#three" />
            <Slide href="four" />
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
                <Video title="LE RÉPÉRTOIRE VERT" auther="EXPLICATION DU PROJET" />
                <Video title="LE RÉPÉRTOIRE VERT" auther="EXPLICATION DU PROJET" />
                <Video title="LE RÉPÉRTOIRE VERT" auther="EXPLICATION DU PROJET" />
                <Video title="LE RÉPÉRTOIRE VERT" auther="EXPLICATION DU PROJET" />
                <Video title="LE RÉPÉRTOIRE VERT" auther="EXPLICATION DU PROJET" />
                <Video title="LE RÉPÉRTOIRE VERT" auther="EXPLICATION DU PROJET" />
            </div>
        </div>
    }
}

class Video extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="video">
            <p className="videoTitle">{this.props.title}</p>
            <p className="videoSubTitle">{this.props.auther}</p>
        </div>
    }
}
