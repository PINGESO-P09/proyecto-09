import React, { useState } from 'react';
import './Roles.css';
import {
  Button,
  Col,
  Navbar,
  Nav,
  Table,
  Card,
  Row,
  ListGroup,
  Form,
} from 'react-bootstrap';
import { FaHome, FaKey, FaUsers, FaEnvelope, FaProjectDiagram, FaFileAlt, FaTasks, FaCog } from 'react-icons/fa';

const App = () => {
  const [roles, setRoles] = useState([
    { nombre: 'Socio', activo: true },
    { nombre: 'Arquitecto', activo: false },
    { nombre: 'Administrador', activo: false },
  ]);

  const [permisos, setPermisos] = useState([
    { nombre: 'Modificar Documentos', activo: true },
    { nombre: 'Subir Documentos', activo: true },
    { nombre: 'Dar Permisos', activo: true },
    { nombre: 'Crear Roles', activo: true },
    { nombre: 'Crear Usuario', activo: true },
    { nombre: 'Mensajería', activo: true },
  ]);

  const [menuVisible, setMenuVisible] = useState(true);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleActivoChange = (index) => {
    const updatedRoles = [...roles];
    updatedRoles[index].activo = !updatedRoles[index].activo;
    setRoles(updatedRoles);
  };

  const handlePermisoChange = (index) => {
    const updatedPermisos = [...permisos];
    updatedPermisos[index].activo = !updatedPermisos[index].activo;
    setPermisos(updatedPermisos);
  };

  const handleEliminar = (index) => {
    const updatedRoles = [...roles];
    updatedRoles.splice(index, 1);
    setRoles(updatedRoles);
  };

  const handleAñadirRol = () => {
    const nuevoRol = {
      nombre: prompt('Introduce el nombre del nuevo rol:'),
      activo: false,
    };
    if (nuevoRol.nombre) {
      setRoles([...roles, nuevoRol]);
    }
  };

  return (
    <div className="roles-app d-flex">
      {/* Sidebar */}
      {menuVisible && (
        <Col xs={2} className="sidebar">
          <Navbar bg="dark" variant="dark" className="flex-column">
            <Navbar.Brand href="#">RosenmannLopez</Navbar.Brand>
            <Nav className="flex-column">
              <Nav.Link href="#menu">
                <FaHome /> Menú
              </Nav.Link>
              <Nav.Link href="#permisos">
                <FaKey /> Permisos
              </Nav.Link>
              <Nav.Link href="#roles">
                <FaUsers /> Roles
              </Nav.Link>
              <Nav.Link href="#mensajes">
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

      {/* Main Content */}
      <Col xs={menuVisible ? 10 : 12} className="main-content p-4">
        <Button variant="dark" onClick={toggleMenu} className="mb-3">
          {menuVisible ? 'Ocultar Menú' : 'Mostrar Menú'}
        </Button>
        <h1 className="mb-4">Administrar Roles</h1>
        <Button variant="dark" className="btn-add-role mb-3" onClick={handleAñadirRol}>
          + Añadir Rol
        </Button>
        <Row>
          <Col md={8}>
            <Card>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Rol</th>
                      <th>Activo</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map((rol, index) => (
                      <tr key={index}>
                        <td>{rol.nombre}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={rol.activo}
                            onChange={() => handleActivoChange(index)}
                          />
                        </td>
                        <td>
                          <Button variant="danger" onClick={() => handleEliminar(index)}>
                            ELIMINAR
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          {/* Permisos */}
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
                        checked={permiso.activo}
                        onChange={() => handlePermisoChange(index)}
                      />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <footer className="mt-4 footer-img-container">
          <img
            src="/logo.jpg"  /* Imagen desde public */
            alt="Footer"
            className="footer-img"
          />
        </footer>
      </Col>
    </div>
  );
};

export default App;
