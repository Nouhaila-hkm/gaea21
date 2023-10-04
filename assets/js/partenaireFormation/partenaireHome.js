import React from 'react';
import ReactDOM from 'react-dom';
import Partenaire from './partenaire.js'

class App extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <Partenaire/>
    }
}

ReactDOM.render(<Partenaire/>, document.getElementById('humansFooter'));


