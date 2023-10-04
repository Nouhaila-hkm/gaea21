
import '../../styles/topbar.scss';
import '../../styles/humansGaea21/home/home.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import ListeInfo from './Info.js';
import GaeaLife from './GaeaLife.js';
import GaeaVideos from './GaeaVideos.js';
import GaeaFooter from './GaeaFooter.js';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <GaeaFooter />
    }
}

/*Pour le button témoignages */
var buttonTemoignage = document.getElementById("btn-temoignage");
console.log(buttonTemoignage.src);
buttonTemoignage.addEventListener("mouseover", function (e) {
    buttonTemoignage.src = "../../images/humansGaea21/Groupe 911@2x.png";
})

buttonTemoignage.addEventListener("mouseout", function () {
    buttonTemoignage.src = "../../images/humansGaea21/Groupe 911.png";
})


ReactDOM.render(<ListeInfo />, document.getElementById('section2'));

ReactDOM.render(<GaeaLife />, document.getElementById('gaeaLife'));

ReactDOM.render(<GaeaVideos />, document.getElementById('gaeaVideo'));

ReactDOM.render(<GaeaFooter />, document.getElementById('humansFooter'));
