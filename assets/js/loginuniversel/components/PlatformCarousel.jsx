import React, {useState, useEffect} from 'react'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

import prevButton from '../../../../public/images/loginUniversel/prev_button.png'

import repertoireVert from '../../../../public/images/loginUniversel/repertoirevert.jpg'
import greenEventsSeries from '../../../../public/images/loginUniversel/greeneventsseries.jpg'
import greenCoaching from '../../../../public/images/loginUniversel/greencoaching.jpg'
import alumni from '../../../../public/images/loginUniversel/alumni.jpg'


import '../../../styles/loginUniversel/platformCarousel.scss'



//items inside the carousel
const items = [
    <div className="item platform-item" data-value="1">
        <img class= "img-platform-carousel" src ={repertoireVert}/> 

    </div>,
    <div className="item platform-item" data-value="2">
        <img class= "img-platform-carousel" src ={greenEventsSeries}/> 
    </div>,
    <div className="item platform-item" data-value="3">
        <img class= "img-platform-carousel" src ={greenCoaching}/> 
    </div>,
    <div className="item platform-item" data-value="4">
        <img class= "img-platform-carousel" src ={alumni}/> 
    </div>,
];

//responsive design
const responsive = {
    0: { items: 3 },
    568: { items: 3 },
    1024: { items: 3 },
};


const thumbItems = (items, [setThumbIndex, setThumbAnimation]) => {
    return items.map((item, i) => (
        <div className="thumb" onClick={() => (setThumbIndex(i), setThumbAnimation(true))}>
            {item}
        </div>
    ));
};



const PlatformCarousel = () =>{
   
    const [mainIndex, setMainIndex] = useState(0);
    const [mainAnimation, setMainAnimation] = useState(false);
    const [thumbIndex, setThumbIndex] = useState(0);
    const [thumbAnimation, setThumbAnimation] = useState(false);
    const [thumbs] = useState(thumbItems(items, [setThumbIndex, setThumbAnimation]));
  
    //putting a class to the first element
    useEffect(() => {
        
        addingStyle();
      }, [thumbIndex]);
    
    //adding a class to the current item 
    const addingStyle = ()=>{
        const allItems=document.querySelectorAll('.platform-item');
        allItems.forEach(oneItem=>{
            if(oneItem.classList.contains('add_style')){
                oneItem.classList.remove('add_style')
            }
            console.log(thumbIndex);
            console.log(thumbIndex);
            if(oneItem.getAttribute('data-value')-1 === thumbIndex){
                oneItem.classList.add('add_style') //adding style
            }
            
        })
        
    }
    const slideNext = () => {
        console.log(thumbIndex);
        
        if (!thumbAnimation && thumbIndex < thumbs.length - 1) {
            setThumbAnimation(true);
            setThumbIndex(thumbIndex + 1);
            addingStyle();
            
        }
    };

    const slidePrev = () => {
        
       
        if (!thumbAnimation && thumbIndex > 0) {
            setThumbAnimation(true);
            setThumbIndex(thumbIndex - 1);
        }
    };

    const syncMainBeforeChange = (e) => {
        setMainAnimation(true);
    };

    const syncMainAfterChange = (e) => {
        setMainAnimation(false);
        console.log(e.type);
        if (e.type === 'action') {
            setThumbIndex(e.item);
            setThumbAnimation(false);
        } else {
            setMainIndex(thumbIndex);
        }
    };

    const syncThumbs = (e) => {
      
        setThumbIndex(e.item);
        setThumbAnimation(false);

        if (!mainAnimation) {
            setMainIndex(e.item);
        }
    };
    
  return (

    <div className="thumbs thumbs-carousel">
        <div onClick={slidePrev}>
            <img src={prevButton} className="btn_prev" />
        </div>
    
    <AliceCarousel
        activeIndex={thumbIndex}
        autoWidth={false}
        items={thumbs}
        responsive={responsive}
        disableButtonsControls
        disableDotsControls
        mouseTracking={false}
        onSlideChanged={syncThumbs}
        touchTracking={!mainAnimation}
        
        />
    
    <div onClick={slideNext}>
    <img src={prevButton} className="btn_next" />
    </div>
    
        
    </div>
       
  )
}

export default PlatformCarousel