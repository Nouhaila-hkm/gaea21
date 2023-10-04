

import React from 'react';


export default class NavBarPro extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return <React.Fragment>
            <h1>Projets</h1>
            <div className="rechercheDiv">
                <input type="search"></input>
                <img src="../../images/humansGaea21/loup.jpg"></img>
            </div>

        </React.Fragment>
    }
}