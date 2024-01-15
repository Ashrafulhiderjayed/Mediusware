import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';

const Problem2 = () => {
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [usContacts, setUsContacts] = useState([]);

  const handleCloseModalA = () => setShowModalA(false);
  const handleCloseModalB = () => setShowModalB(false);

  const handleShowModalA = () => {
    setShowModalA(true);
    fetchData('/contacts/');
  };

  const handleShowModalB = () => {
    setShowModalB(true);
    // Set URL for Modal B
    window.history.pushState(null, '', '/modalB');
    fetchData('/country-contacts/US/');
  };

  const fetchData = async (endpoint) => {
    try {
      const response = await fetch(`https://contact.mediusware.com/api${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
  
      if (endpoint === '/contacts/') {
        setContacts(data.results);
      } else if (endpoint === '/country-contacts/US/') {
        setUsContacts(data.results);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  useEffect(() => {
    fetchData('/contacts/');
  }, []);

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>
                
                <div className="d-flex justify-content-center gap-3">
                <Button className="btn-lg primary" type="button" onClick={handleShowModalA}>
                    All Contacts
                </Button>

                <Button className="btn-lg btn-outline-warning text-light" type="button" onClick={handleShowModalB}>
                    US Contacts
                </Button>
                </div>


                {/* Modal Part */}
                <Modal show={showModalA} onHide={handleCloseModalA}>
          <Modal.Header closeButton>
            <Modal.Title>All Contacts</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           
            {contacts.map((contact) => (
              <div key={contact.id}>{contact.phone}</div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModalA}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal B */}
        <Modal show={showModalB} onHide={handleCloseModalB}>
          <Modal.Header closeButton>
            <Modal.Title>US Contacts</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
            {usContacts.map((contact) => (
              <div key={contact.id}>{contact.phone}</div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModalB}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
                
            </div>
        </div>
    );
};

export default Problem2;