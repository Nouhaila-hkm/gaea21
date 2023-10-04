import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import dataPrestations from '../data-pop-up/data_eco-mind-presta.json'
import dataPackage from '../data-pop-up/data_eco-mind-package.json'

// IMPORT DU CHEVRON POUR LE BOUTON
import chevron from '../../../../images/chevron-droit.png'
import cross from '../../../..//images/cross.svg'

import '../../../../styles/système_design_components/smallBoxDesign/smallBox_popup_em.scss'
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

const Popup = () => {

    const [prestationData, setPrestationData] = useState()
    const [packageData, setPackageData] = useState()

    // const [active, setActive] = useState(false)
    const [idPresta, setIdPresta] = useState(null)
    const [idPack, setIdPack] = useState(null)

    const [modalIsOpen, setIsOpen] = useState(false)

    const prestationParsedData = JSON.stringify(dataPrestations)
    const packageParsedData = JSON.stringify(dataPackage)


    // Functions

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
        document.documentElement.style.overflow = 'visible';
    }

    function openModal(e) {
        document.documentElement.style.overflow = 'hidden';

        const id_popupPrestation = e.target.getAttribute("data-idprestation")
        const id_popupPackage = e.target.getAttribute("data-idpackage")

        // console.log(e.target.getAttribute("data-idprestation"))
        // console.log(e.target.getAttribute("data-idpackage"))

        setIdPresta(id_popupPrestation)
        setIdPack(id_popupPackage)

        setIsOpen(true);
    }

// Hook
    useEffect(() => {
        setPrestationData(JSON.parse(prestationParsedData))
        setPackageData(JSON.parse(packageParsedData))

    }, [])

    // console.log(prestationData)
    // console.log(packageData)

  


    return (<>
        {prestationData &&

            <div className='container-prestation'>
                {dataPrestations.map((data, key) => {
                    return (
                        <div className='box' key={key} >
                            <div className='_img'>
                                <img src={data.image} alt={data.title} />
                            </div>
                            <div className='box-text-content'>
                                <p>{data.title}</p>
                                <button className='.btn-popup' data-idprestation={data.id} onClick={openModal}>Découvrir <img src={chevron} className='chevron-btn' /></button>
                            </div>
                        </div>
                    )
                })}
                {idPresta &&
                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal">


                        <h3 className='modal--header'>{prestationData[idPresta].title}</h3>
                        <p className='modal--content'>{prestationData[idPresta].text}</p>
                        <div className='cross-container'><img src={cross} className="close" onClick={closeModal} /></div>
                        
                    </Modal>
                }
            </div>
        }

        <p className='separation'>En plus des différents types de services proposés, <b>eco-minds</b> fonctionne également avec un système de <b>package.</b></p>

        {packageData &&

<div className='container-prestation'>
    {dataPackage.map((data, key) => {
        return (
            <div className='box' key={key} >
                <div className='_img'>

                    <img src={data.image} alt={data.title} />
                </div>
                <div className='box-text-content'>
                    <p>{data.title}</p>

                    <button className='.btn-popup' data-idpackage={data.id} onClick={openModal}>Découvrir <img src={chevron} className='chevron-btn' /></button>

                </div>
            </div>
        )
    })}
    {idPack &&
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal">


            <h3 className='modal--header'>{packageData[idPack].title}</h3>
            <p className='modal--content'>{packageData[idPack].text}</p>
            <div className='cross-container'><img src={cross} className="close" onClick={closeModal} /></div>
        </Modal>
    }
</div>
}
    </>)
}

export default Popup