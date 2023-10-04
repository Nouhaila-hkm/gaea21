import React from 'react'
import logo from '../../../images/emploi_et_stage/offres/logo.png';
// import iconIT from '../../../images/emploi_et_stage/offres/icon-IT.svg'
import moment from 'moment'
import 'moment/locale/fr'


const Offer = ({data, loading, doc, page}) => {

    if(loading) {
        return <h3>Chargement...</h3>;
    }

    moment.locale('fr');


  return (
    <>
   
    <div className="cards">

            {data.length === 0 ? <div><h5>Nous n’avons trouvé aucun résultat</h5> <p>Vérifiez l’orthographe de chacun des mots-clés</p></div> : data.map((offer) => {
                
                return <a href={`/emploi-et-stage/${page}/details/${offer.id}`} key={offer.id}>
                <div className="card" >
                    <div className="row-1">
                        <p className="job-title">{offer.title}</p>
                        {offer.department?.icon && <img className="icon" src={require("../../../images/emploi_et_stage/"+ doc+ "/" + offer.department.icon)} alt="icon"/> }
                    </div>
                    <div className="row-2">
                        <img className="logo" src={logo} alt="logo"/>                        
                        <p className='modality'>{offer.jobType?.name}</p> 
                       
                  
                    </div>

                    <p className="published-at">Publié {moment(offer.publishedAt).fromNow()}</p>

                </div>
                </a>;
            })}
                            
             
               
               </div>
               </>
  )
}

export default Offer