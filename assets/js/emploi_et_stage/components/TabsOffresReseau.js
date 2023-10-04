import React, {useRef, useState} from 'react'
import loupe from '../../../images/emploi_et_stage/icon-loupe.svg';
import OffresGaea21 from './OffresGaea21';
import OffresReseau from './OffresReseau';

const TabsOffresReseau = () => {

  const [index, setIndex] = useState(0);
 
  const gaeaRef = useRef(0);
  const tabRef = useRef(1);




  const handleGaea21 = event => {

   gaeaRef.current.classList.add('active-gaea21');
   tabRef.current.classList.remove('active-reseau');

    setIndex(1)
  };

  const handleReseau = event => {
    // 👇️ toggle isActive state on click
    gaeaRef.current.classList.remove('active-gaea21');
    tabRef.current.classList.add('active-reseau');
    
   
    setIndex(0)
  };

  return (

    <>

<section className="reseau-1"  >

<div className="img-1">
    <img className='res-img' src={loupe}/>
    <p id='p-img' hidden={index != 0}>Réseau</p>
</div>

<div className="p-t" hidden={index != 0}><b>Offres réseau gaea21</b></div>
<div className="p-t" hidden={index != 1}><b>Offres gaea21</b></div>

</section>




      <div className='links'>
          <div className='left'>
            <div className='tabReseau active-reseau' ref={tabRef} onClick={handleReseau}>Offres réseau gaea21</div>
            <div className='tabgaea21' ref={gaeaRef} onClick={handleGaea21}>Offres gaea21</div>
            
          </div>
          <div className='right' hidden={index != 1}>
       Recruteur: <a href="#"> déposer une annonce </a>
   </div>
          <div className='right link-reseau' hidden={index != 0}>
       Recruteur: <a href="#"> déposer une annonce </a>
   </div>
      </div>

      <div hidden={index != 0}><OffresReseau/></div>
      <div hidden={index != 1}><OffresGaea21/></div>



    </>




  )
}

export default TabsOffresReseau