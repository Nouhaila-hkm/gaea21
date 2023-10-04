import React from 'react'
import arrow from '../../../../public/Image/cards-projet/chevron-right-solid.svg'
import card from '../../../../public/Image/cards-projet/background-cards.svg'

const Cards = ({content}) => {

    const items = content.items.map((item) =>

       <div className='box_card'>
          <div className='inside_box'>
            <div className='card_flex top_card'>
                <div className='overlay-image'>
                    <img className='trans_card' src={item.img} />
                    <div className='hover-image'>
                        <span className='title_card'>{item.title}</span>
                    </div>
                </div>
                    <div className='cards_text'>
                        {item.text}
                    </div>
            </div>
            <button id={item.id} className='cards_button'>Découvrir<img className='chevron' src={arrow} /></button>
        </div>
      </div> 
    );
  return (
    <div className='cards_align'>{items}</div>
  )
}

export default Cards