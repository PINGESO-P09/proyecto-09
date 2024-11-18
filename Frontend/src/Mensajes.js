import React, { useState } from 'react';
import './Mensajes.css';
import {
  Button,
  Col,
  Card,
  Row,
  ListGroup,
  Form,
} from 'react-bootstrap';

const Mensajes = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  const [messageInput, setMessageInput] = useState('');

  // Lista de contactos
  const contactos = [
    { id: 1, nombre: 'José Martínez' },
    { id: 2, nombre: 'Estrella Lopez' },
    { id: 3, nombre: 'Pedro Parra' },
  ];

  // Seleccionar el contacto para abrir el chat
  const handleSelectContact = (contact) => {
    setActiveChat(contact);
    if (!chatMessages[contact.id]) {
      setChatMessages((prev) => ({ ...prev, [contact.id]: [] }));
    }
  };

  // Enviar mensaje
  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      const newMessage = { text: messageInput, sender: 'me' };
      setChatMessages((prev) => ({
        ...prev,
        [activeChat.id]: [...prev[activeChat.id], newMessage],
      }));
      setMessageInput('');
    }
  };

  return (
    <div className="roles-app d-flex">
      <Col xs={12} className="main-content p-4">
        <h1 className="mb-4">Mensajería</h1>

        <Row>
          {/* Lista de contactos */}
          <Col md={4}>
            <Card className="contactos-container">
              <Card.Body>
                <h5>Contactos</h5>
                <ListGroup>
                  {contactos.map((contacto) => (
                    <ListGroup.Item
                      key={contacto.id}
                      action
                      onClick={() => handleSelectContact(contacto)}
                      active={activeChat && activeChat.id === contacto.id}
                    >
                      {contacto.nombre}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          {/* Ventana de chat */}
          <Col md={8}>
            <Card className="main-chat-container">
              <Card.Body>
                <h5>{activeChat ? `Chat con ${activeChat.nombre}` : 'Selecciona un contacto'}</h5>
                <div className="chat-messages">
                  {activeChat && chatMessages[activeChat.id] && chatMessages[activeChat.id].map((message, index) => (
                    <div key={index} className={`chat-message ${message.sender === 'me' ? 'sent' : 'received'}`}>
                      <p>{message.text}</p>
                    </div>
                  ))}
                </div>
                {activeChat && (
                  <div className="chat-input-container">
                    <Form.Control
                      type="text"
                      placeholder="Escribe un mensaje..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button variant="primary" onClick={handleSendMessage} className="send-button">
                      Enviar
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Footer with Logo */}
        <footer className="footer-img-container mt-4">
          <img src="/logo.png" alt="RosenmannLopez" className="footer-img" /> {/* Reemplaza con la ruta correcta */}
        </footer>
      </Col>
    </div>
  );
};

export default Mensajes;
