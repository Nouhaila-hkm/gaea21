import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';


function ModalModele(props) {

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: props.width,
            height: props.height,
            borderRadius: '23px',
            display: 'flex',
        },
    };

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const html = document.getElementById('test');


    useEffect(() => {
        if (modalIsOpen) {
            html.classList.add('stop')
        } else {
            html.classList.remove('stop')
        }
    }, [modalIsOpen]);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
    <>
        <img id='boutton2' className='know_more know_tools lean' src={props.img} onClick={() => setIsOpen(!modalIsOpen)} />

        <div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='popbox'>
                    <h2 className='h2_modele'>{props.title}</h2>
                    <p className='modele_text'>{props.text}</p>
                </div>
                <img className={props.class} src={props.source} />
            </Modal>
        </div>
    </>
    );
}

export default ModalModele;