// ./assets/js/components/webContents.js
    
import React, {useEffect,useState} from 'react';
import axios from 'axios';
    
const WebContents = props => { 

        const [webConts,setWebConts] = useState([])
        
        useEffect(()=>{
            axios.get(`http://localhost:3000/api/webcontents`)
            .then(response => response.data)
            .then(data => setWebConts(data))
            .catch(error => console.log(error.response));
           },[]);
        // const loading = this.state.loading;
        return(
            <div>
            <div class="container">
            <a data-target="modalCat" class="btn gaeaColor  modal-trigger"><i class="material-icons white-text">add</i></a>
             <table class="responsive-table striped">
             <thead>
             <th>ID</th>
             <th>TEXT1</th>
             <th>TEXT2</th>
             <th>ARTICLE</th>
             <th>LANGUE</th>
             <th>ACTIONS</th>
             </thead>
             <tbody>
                 {webConts.map(web =>(
                   <tr key={web.id}>
                   <td>{web.id}</td>
                   <td>{web.rawText}</td>
                   <td>{web.formatedText}</td>
                   <td>{web.langueContent}</td>
                   <td>{web.articleRelated}</td>
                   </tr> 
                    ))};
             </tbody>
         </table>
      </div>
      </div>
        );
}

export default WebContents;