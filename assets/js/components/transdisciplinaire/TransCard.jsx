import React from 'react'

const TransCard = () => {

  return (
    <>
    <div className='card_flex top_card'>
        <div className='overlay-image'>
            <img className='trans_card' src="/Image/trans/observatory.png" />
            <div className='hover-image'>
                <span className='title_card'>L'observatoire de gaea21</span>
                <p className='text_card'>Création du contenu</p>
            </div>
        </div>

        <div className='overlay-image'>
            <img className='trans_card' src="/Image/trans/ressource.png" />
            <div className='hover-image'>
                <span className='title_card'>Ressources humaines</span>
                <p className='text_card'>Gestion de compétences et de collaboration</p>
            </div>
        </div>

        <div className='overlay-image'>
            <img className='trans_card' src="/Image/trans/formation.png" />
            <div className='hover-image'>
                <span className='title_card'>Département de formation</span>
                <p className='text_card'>Gestion des savoirs</p>
            </div>
        </div>            
    </div>

    <div className='card_flex bottom_card'>
        <div className='overlay-image'>
            <img className='trans_card' src="/Image/trans/marketing.png" />
            <div className='hover-image'>
                <span className='title_card'>Département marketing</span>
                <p className='text_card'>Gestion des communication et des relations avec l'exterieur</p>
            </div>
        </div>

        <div className='overlay-image'>
            <img className='trans_card' src="/Image/trans/culture.png" />
            <div className='hover-image'>
                <span className='title_card'>Département culture</span>
                <p className='text_card'>Gestion des mode de transmission du message</p>
            </div>
        </div>        
    </div>
    </>
  )
}

export default TransCard