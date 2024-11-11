import React, { useState } from 'react'; 
import './Proyectos.css';
import {
  Button,
  Col,
  Navbar,
  Nav,
  Card,
  Table,
  Form,
  Modal,
  Dropdown,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  FaKey, FaUsers, FaEnvelope, FaProjectDiagram, FaFileAlt, FaTasks, FaCog, FaDownload, FaEllipsisH, FaEdit, FaTrash,
} from 'react-icons/fa';

const Proyectos = () => {
  const [menuVisible, setMenuVisible] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null); // Proyecto seleccionado
  const [editingProject, setEditingProject] = useState(null); // Proyecto en edición
  const [showEditModal, setShowEditModal] = useState(false); // Estado para el modal de edición
  const [proyectos, setProyectos] = useState([
    { codigo: 'IN/1001/24', cliente: 'ACME', correo: 'contact@email.com', fechaInicio: '2022-01-23', fechaTermino: '2022-02-07', estado: 'Cerrado', inversion: '$2,350.00' },
    { codigo: 'IN/1002/24', cliente: 'Museo Nacional', correo: 'finance@johndoe.com', fechaInicio: '2022-01-09', fechaTermino: '2022-01-21', estado: 'Nuevo', inversion: '$259.00' },
    { codigo: 'IN/1003/24', cliente: 'Coliseo Metropolitano', correo: 'invoice@company.com', fechaInicio: '2022-02-11', fechaTermino: '2022-02-24', estado: 'En Proceso', inversion: '$1,259.00' },
    { codigo: 'IN/1004/24', cliente: 'Mausoleo Colón', correo: 'contact@email.com', fechaInicio: '2022-03-13', fechaTermino: '2022-03-26', estado: 'Cerrado', inversion: '$1,159.00' },
  ]);

  const [documents, setDocuments] = useState([
    { id: 1, projectCode: 'IN/1001/24', nombre: 'Informe Dimensiones', cliente: 'ACME', fecha: '2022-01-23', tipo: 'Informe' },
    { id: 2, projectCode: 'IN/1002/24', nombre: 'Plano 3D', cliente: 'Museo Nacional', fecha: '2022-01-09', tipo: 'Plano' },
    { id: 3, projectCode: 'IN/1003/24', nombre: 'Análisis Financiero', cliente: 'Coliseo Metropolitano', fecha: '2023-08-15', tipo: 'Informe' },
    { id: 4, projectCode: 'IN/1004/24', nombre: 'Especificaciones Técnicas', cliente: 'Mausoleo Colón', fecha: '2023-11-02', tipo: 'Manual' },
  ]);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // Filtrar documentos por proyecto seleccionado
  const filteredDocuments = documents.filter(doc => doc.projectCode === selectedProject);

  // Función para eliminar un proyecto y sus documentos
  const handleDeleteProject = (projectCode) => {
    if (window.confirm("¿Desea eliminar el proyecto y todos sus documentos?")) {
      setProyectos(proyectos.filter(proj => proj.codigo !== projectCode));
      setDocuments(documents.filter(doc => doc.projectCode !== projectCode));
    }
  };

  // Función para editar un proyecto
  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowEditModal(true);
  };

  // Función para guardar los cambios del proyecto editado
  const handleSaveProject = () => {
    setProyectos(proyectos.map(proj => 
      proj.codigo === editingProject.codigo ? editingProject : proj
    ));
    setShowEditModal(false);
  };

  // Función para eliminar todos los documentos de un proyecto sin eliminar el proyecto en sí
  const handleDeleteAllDocuments = (projectCode) => {
    setDocuments(documents.filter(doc => doc.projectCode !== projectCode));
  };

  return (
    <div className="proyectos-app d-flex">
      {/* Sidebar */}
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
              <Nav.Link as={Link} to="/documentos">
                <FaFileAlt /> Documentos
              </Nav.Link>
              <Nav.Link as={Link} to="/proyectos">
                <FaProjectDiagram /> Proyectos
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

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">Administración Proyectos</h1>
          <Button variant="dark">Nuevo Proyecto</Button>
        </div>

        {/* Project Selector */}
        <Form.Group className="mb-3">
          <Form.Label>Seleccionar Proyecto:</Form.Label>
          <Form.Control as="select" onChange={(e) => setSelectedProject(e.target.value)}>
            <option value="">Todos los Proyectos</option>
            {proyectos.map(proyecto => (
              <option key={proyecto.codigo} value={proyecto.codigo}>{proyecto.codigo} - {proyecto.cliente}</option>
            ))}
          </Form.Control>
        </Form.Group>

        {/* Projects Table */}
        <Card className="mb-4">
          <Card.Body>
            <h5>Lista de Proyectos</h5>
            <Table responsive bordered>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Cliente</th>
                  <th>Correo</th>
                  <th>Fecha Inicio</th>
                  <th>Fecha Término</th>
                  <th>Estado</th>
                  <th>Inversión</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {proyectos.map((proyecto, index) => (
                  <tr key={index}>
                    <td>{proyecto.codigo}</td>
                    <td>{proyecto.cliente}</td>
                    <td>{proyecto.correo}</td>
                    <td>{proyecto.fechaInicio}</td>
                    <td>{proyecto.fechaTermino}</td>
                    <td>{proyecto.estado}</td>
                    <td>{proyecto.inversion}</td>
                    <td>
                      <Button variant="warning" size="sm" onClick={() => handleEditProject(proyecto)}>
                        <FaEdit /> Editar
                      </Button>{' '}
                      <Button variant="danger" size="sm" onClick={() => handleDeleteProject(proyecto.codigo)}>
                        <FaTrash /> Eliminar
                      </Button>{' '}
                      <Button variant="outline-danger" size="sm" onClick={() => handleDeleteAllDocuments(proyecto.codigo)}>
                        <FaTrash /> Eliminar Documentos
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Documents Table */}
        <Card>
          <Card.Body>
            <h5>Documentos Asociados al Proyecto {selectedProject || "Todos"}</h5>
            <Table responsive bordered>
              <thead>
                <tr>
                  <th>Nombre Documento</th>
                  <th>Cliente</th>
                  <th>Fecha Subido</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc, index) => (
                    <tr key={index}>
                      <td>{doc.nombre}</td>
                      <td>{doc.cliente}</td>
                      <td>{doc.fecha}</td>
                      <td>{doc.tipo}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No hay documentos para este proyecto.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Footer with Logo */}
        <footer className="footer-img-container mt-4">
          <img src="/logo.png" alt="RosenmannLopez" className="footer-img" /> {/* Reemplaza con la ruta correcta */}
        </footer>

        {/* Edit Modal */}
        {editingProject && (
          <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Proyecto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Cliente</Form.Label>
                <Form.Control
                  type="text"
                  value={editingProject.cliente}
                  onChange={(e) => setEditingProject({ ...editingProject, cliente: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  value={editingProject.correo}
                  onChange={(e) => setEditingProject({ ...editingProject, correo: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Fecha Inicio</Form.Label>
                <Form.Control
                  type="date"
                  value={editingProject.fechaInicio}
                  onChange={(e) => setEditingProject({ ...editingProject, fechaInicio: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Fecha Término</Form.Label>
                <Form.Control
                  type="date"
                  value={editingProject.fechaTermino}
                  onChange={(e) => setEditingProject({ ...editingProject, fechaTermino: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  type="text"
                  value={editingProject.estado}
                  onChange={(e) => setEditingProject({ ...editingProject, estado: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Inversión</Form.Label>
                <Form.Control
                  type="text"
                  value={editingProject.inversion}
                  onChange={(e) => setEditingProject({ ...editingProject, inversion: e.target.value })}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleSaveProject}>
                Guardar Cambios
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Col>
    </div>
  );
};

export default Proyectos;
