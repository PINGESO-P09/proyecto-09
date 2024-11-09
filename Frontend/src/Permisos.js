import React, { useState } from 'react';
import './Roles.css';
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
import { FaHome, FaKey, FaUsers, FaEnvelope, FaProjectDiagram, FaFileAlt, FaTasks, FaCog } from 'react-icons/fa';

const Permisos = () => {
  const [menuVisible, setMenuVisible] = useState(true);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const [permisos, setPermisos] = useState([
    { nombre: 'Lectura Documentos', asignado: true },
    { nombre: 'Edición documentos', asignado: false },
    { nombre: 'Comentar documentos', asignado: false },
    { nombre: 'Subir Documentos', asignado: false },
    { nombre: 'Descargar documentos', asignado: false },
  ]);

  const [usuarios, setUsuarios] = useState([
    { nombre: 'José Martínez', rol: 'Arquitecto', asignado: true },
    { nombre: 'Estrella Lopez', rol: 'Socio', asignado: false },
    { nombre: 'Pedro Parra', rol: 'Arquitecto', asignado: false },
  ]);

  const handlePermisoChange = (index) => {
    const updatedPermisos = [...permisos];
    updatedPermisos[index].asignado = !updatedPermisos[index].asignado;
    setPermisos(updatedPermisos);
  };

  const handleUsuarioChange = (index) => {
    const updatedUsuarios = [...usuarios];
    updatedUsuarios[index].asignado = !updatedUsuarios[index].asignado;
    setUsuarios(updatedUsuarios);
  };

  const handleGuardarCambios = () => {
    console.log('Cambios guardados:', { permisos, usuarios });
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
        <h1 className="mb-4">Asignar Permisos</h1>

        <Row>
          <Col md={4}>
            <Card className="permissions-container">
              <Card.Body>
                <h5>Permisos</h5>
                <ListGroup>
                  {permisos.map((permiso, index) => (
                    <ListGroup.Item key={index}>
                      <Form.Check
                        type="checkbox"
                        label={permiso.nombre}
                        checked={permiso.asignado}
                        onChange={() => handlePermisoChange(index)}
                      />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <Card>
              <Card.Body>
                <h5>Usuarios</h5>
                <ListGroup variant="flush">
                  {usuarios.map((usuario, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                      <span>{usuario.nombre} - {usuario.rol}</span>
                      <Form.Check
                        type="checkbox"
                        checked={usuario.asignado}
                        onChange={() => handleUsuarioChange(index)}
                      />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <Button variant="success" onClick={handleGuardarCambios}>Guardar Cambios</Button>
        </div>

        <footer className="mt-4 footer-img-container">
          <img
            src="/logo.png"
            alt="Footer"
            className="footer-img"
          />
        </footer>
      </Col>
    </div>
  );
};

export default Permisos;
