import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import dataSLP from '../data/dataPopupSLP.json'

import cross from '../../../..//images/cross.svg'



const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute'
  },
};

import "../../../../styles/système_design_components/BtnLargePopup/BtnRectangle.scss"

function Popup() {
  const [slpData, setSlpData] = useState()
  const [modalIsOpen, setIsOpen] = useState(false)

  console.log(dataSLP)

  const [idSlp, setIdSlp] = useState(null)

  const slpParsedData = JSON.stringify(dataSLP)

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
    document.documentElement.style.overflow = 'visible';
  }


  function openModal(e) {
    document.documentElement.style.overflow = 'hidden';


    const id = e.target.getAttribute("data-idslp")
    console.log(id)

    setIdSlp(id)

    console.log(idSlp)
    setIsOpen(true);
  }

  // Hook
  useEffect(() => {
    setSlpData(JSON.parse(slpParsedData))
  }, [])

  return (<>
    {slpData &&

      <div className='container-slp'>
        {dataSLP.map((data, key) => {
          return (<>
            <a className='btn-slp-programs' key={key} data-idslp={data.id} onClick={openModal}>{data.title}</a>
          </>)
        })}
        {idSlp &&
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal">


            <h3 className='modal--header'>{slpData[idSlp].title}</h3>
            <p className='modal--content'>{slpData[idSlp].text}</p>
            <div className='cross-container'><img src={cross} className="close" onClick={closeModal} /></div>

          </Modal>
        }
      </div>
    }</>
  )
}

export default Popup