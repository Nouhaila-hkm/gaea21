import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';

const AddEvent = ({ onAddEvent }) => {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleAddEvent = () => {
    
    // Créer le nouvel événement et l'ajouter à la liste des événements
    const newEvent = {
      title: title,
      start: start,
      end: end,
    };
    onAddEvent(newEvent);

    // Réinitialiser les valeurs du formulaire
    setTitle('');
    setStart('');
    setEnd('');

    // Fermer le modal
    handleClose();
  };

  return (
    <div>
    <Button variant="primary" onClick={handleShow}>
                Add Event
    </Button>
    <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ajouter un événement</Modal.Title>
            </Modal.Header>
        <Modal.Body>
      
            <div>
                <label>Titre :</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
                <label>Date de début :</label>
                <input type="date" value={start} onChange={e => setStart(e.target.value)} />
            </div>
            <div>
                <label>Date de fin :</label>
                <input type="date" value={end} onChange={e => setEnd(e.target.value)} />
            </div>
      </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleAddEvent}>
                Valider
            </Button>
        </Modal.Footer>

    </Modal>
    </div>
  );
};

export default AddEvent;
