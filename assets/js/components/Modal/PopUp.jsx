import React from 'react';
import Modal from 'react-modal';
import '../../../styles/Modal/popup.scss'
import '../../../styles/user/showUser.scss'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        borderRadius: '23px',
        display: 'flex',
    },
};

function PopUp(props) {

    const [modalIsOpen, setIsOpen] = React.useState(true);

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
        <div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <img src={props.source} />
                <div className='popbox'>
                    <h2 className='h2pop'>{props.title}</h2>
                    <p className='ppop'>{props.text}</p>
                    <a className='button pop' href={props.redirect}>{props.button}</a>
                </div>
            </Modal>
        </div>
    );
}

export default PopUp;