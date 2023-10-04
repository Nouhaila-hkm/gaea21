
import '../../styles/topbar.scss';
import '../../styles/humansGaea21/programme/programme.scss'



import React from 'react';
import ReactDOM from 'react-dom';
import GaeaFooter from './temoignages/GaeaFooter.js';
import GaeaContact from './GaeaContact.js';

class App extends React.Component{
    render() {
        return <React.Fragment>
            <h1>Programme humans of gaea21</h1>
            <p>Lorem ipsum dolor sit amet. Est voluptas rerum a doloremque iusto ad voluptatem itaque ut fugiat itaque ducimus eaque a ducimus quidem! At optio deserunt et molestias consectetur est dignissimos quae aut nesciunt molestiae et perspiciatis quaerat est autem quasi? Quo consequatur quas et consectetur voluptas qui veniam nulla vel unde sint ea saepe suscipit et Quis nesciunt. Est fuga nobis nam sequi commodi quo magni quae eum velit possimus. Id mollitia quis aut deserunt quae et nisi ab tempore magni est dolore libero. Ut voluptatem voluptatem et omnis quibusdam a nostrum aperiam. Et sapiente esse non beatae quam sed magni quidem. Aut unde tempore et necessitatibus nostrum sit provident voluptas. Ex officiis cumque aut nisi placeat sed minus nisi et temporibus quaerat. Et molestiae ducimus non blanditiis atque qui sapiente dolorum est voluptas obcaecati. Lorem ipsum dolor sit amet. Est voluptas rerum a doloremque iusto ad voluptatem itaque ut fugiat itaque ducimus eaque a ducimus quidem! At optio deserunt et molestias consectetur est dignissimos quae aut nesciunt molestiae et perspiciatis quaerat est autem quasi? Quo consequatur quas et consectetur voluptas qui veniam nulla vel unde sint ea saepe suscipit et Quis nesciunt. Est fuga nobis nam sequi commodi quo magni quae eum velit possimus. Id mollitia quis aut deserunt quae et nisi ab tempore magni est dolore libero. Ut voluptatem voluptatem et omnis quibusdam a nostrum aperiam. Et sapiente esse non beatae quam sed magni quidem. Aut unde tempore et necessitatibus nostrum sit provident voluptas. Ex officiis cumque aut nisi placeat sed minus nisi et temporibus quaerat. Et molestiae ducimus non blanditiis atque qui sapiente dolorum est voluptas obcaecati.</p>    
        </React.Fragment>
    }
}


ReactDOM.render(<App/>, document.getElementById('contenu'));
ReactDOM.render(<GaeaContact/>, document.getElementById("contact"));
ReactDOM.render(<GaeaFooter/>, document.getElementById('humansFooter'));

