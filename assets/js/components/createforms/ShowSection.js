import React, { Component } from 'react';

class ShowSection extends Component {
    constructor() {
        super();
        this.section = document.querySelector('#section').dataset.section;
    }
    render() {
        return (
            <Section section="{this.section}" key="{this.section.id}" />
        )
    }
}

export default ShowSection;