import React, { useState } from 'react';
import './Mensajes.css';
import {
  Button,
  Col,
  Navbar,
  Nav,
  Card,
  Row,
  ListGroup,
  Form,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUsers, FaKey, FaEnvelope, FaProjectDiagram, FaFileAlt, FaTasks, FaCog } from 'react-icons/fa';

const Mensajes = () => {
  const [menuVisible, setMenuVisible] = useState(true);
  const [activeChat, setActiveChat] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  const [messageInput, setMessageInput] = useState('');

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

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
      {menuVisible && (
        <Col xs={2} className="sidebar">
          <Navbar bg="dark" variant="dark" className="flex-column">
            <Navbar.Brand href="#">RosenmannLopez</Navbar.Brand>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/roles">
                <FaUsers /> Roles
              </Nav.Link>
              <Nav.Link as={Link} to="/permisos">
                <FaKey /> Asignar Permisos
              </Nav.Link>
              <Nav.Link as={Link} to="/mensajes">
                <FaEnvelope /> Mensajes
              </Nav.Link>
              <Nav.Link href="#proyectos">
                <FaProjectDiagram /> Proyectos
              </Nav.Link>
              <Nav.Link href="#documentos">
                <FaFileAlt /> Documentos
              </Nav.Link>
              <Nav.Link href="#actividades">
                <FaTasks /> Actividades
              </Nav.Link>
              <Nav.Link href="#configuracion">
                <FaCog /> Configuración
              </Nav.Link>
            </Nav>
          </Navbar>
        </Col>
      )}

      <Col xs={menuVisible ? 10 : 12} className="main-content p-4">
        <Button variant="dark" onClick={toggleMenu} className="mb-3">
          {menuVisible ? 'Ocultar Menú' : 'Mostrar Menú'}
        </Button>
        <h1 className="mb-4">Mensajes</h1>

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
            <Card className="chat-container">
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
      </Col>
    </div>
  );
};

export default Mensajes;
