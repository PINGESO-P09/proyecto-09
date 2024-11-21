import React, { useState } from 'react'; 
import './Proyectos.css';
import {
  Button,
  Col,
  Card,
  Table,
  Form,
  Modal,
} from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Proyectos = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({
    codigo: '',
    cliente: '',
    correo: '',
    fechaInicio: '',
    fechaTermino: '',
    estado: '',
    inversion: '',
  });

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

  // Función para generar un nuevo código de proyecto automáticamente
  const generateProjectCode = () => {
    const year = new Date().getFullYear().toString().slice(-2);
    const lastProject = proyectos[proyectos.length - 1];
    const lastNumber = lastProject ? parseInt(lastProject.codigo.split('/')[1]) : 1000;
    const newNumber = lastNumber + 1;
    return `IN/${newNumber}/${year}`;
  };

  // Función para abrir el modal de nuevo proyecto y generar el código
  const handleOpenNewProjectModal = () => {
    setNewProject({
      codigo: generateProjectCode(),
      cliente: '',
      correo: '',
      fechaInicio: '',
      fechaTermino: '',
      estado: '',
      inversion: '',
    });
    setShowNewProjectModal(true);
  };

  // Función para guardar el nuevo proyecto
  const handleSaveNewProject = () => {
    if (
      newProject.codigo &&
      newProject.cliente &&
      newProject.fechaInicio &&
      newProject.fechaTermino
    ) {
      setProyectos([...proyectos, newProject]);
      setShowNewProjectModal(false);
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowEditModal(true);
  };

  const handleDeleteProject = (projectCode) => {
    if (window.confirm("¿Desea eliminar el proyecto y todos sus documentos?")) {
      setProyectos(proyectos.filter(proj => proj.codigo !== projectCode));
      setDocuments(documents.filter(doc => doc.projectCode !== projectCode));
    }
  };

  const handleSaveProject = () => {
    setProyectos(proyectos.map(proj => 
      proj.codigo === editingProject.codigo ? editingProject : proj
    ));
    setShowEditModal(false);
  };

  const filteredDocuments = documents.filter(doc => doc.projectCode === selectedProject);

  return (
    <div className="proyectos-app">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Administración Proyectos</h1>
        <Button variant="dark" onClick={handleOpenNewProjectModal}>
          Nuevo Proyecto
        </Button>
      </div>

      <Form.Group className="mb-3">
        <Form.Label>Seleccionar Proyecto:</Form.Label>
        <Form.Control as="select" onChange={(e) => setSelectedProject(e.target.value)}>
          <option value="">Todos los Proyectos</option>
          {proyectos.map(proyecto => (
            <option key={proyecto.codigo} value={proyecto.codigo}>{proyecto.codigo} - {proyecto.cliente}</option>
          ))}
        </Form.Control>
      </Form.Group>

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
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

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

      <Modal show={showNewProjectModal} onHide={() => setShowNewProjectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Código</Form.Label>
            <Form.Control type="text" value={newProject.codigo} readOnly />
          </Form.Group>
          <Form.Group>
            <Form.Label>Cliente</Form.Label>
            <Form.Control
              type="text"
              value={newProject.cliente}
              onChange={(e) => setNewProject({ ...newProject, cliente: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              value={newProject.correo}
              onChange={(e) => setNewProject({ ...newProject, correo: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fecha Inicio</Form.Label>
            <Form.Control
              type="date"
              value={newProject.fechaInicio}
              onChange={(e) => setNewProject({ ...newProject, fechaInicio: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fecha Término</Form.Label>
            <Form.Control
              type="date"
              value={newProject.fechaTermino}
              onChange={(e) => setNewProject({ ...newProject, fechaTermino: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Estado</Form.Label>
            <Form.Control
              type="text"
              value={newProject.estado}
              onChange={(e) => setNewProject({ ...newProject, estado: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Inversión</Form.Label>
            <Form.Control
              type="text"
              value={newProject.inversion}
              onChange={(e) => setNewProject({ ...newProject, inversion: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNewProjectModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveNewProject}>
            Guardar Proyecto
          </Button>
        </Modal.Footer>
      </Modal>

      <footer className="mt-4 footer-img-container">
        <img src="/logo.png" alt="Footer Logo" className="footer-img" />
      </footer>
    </div>
  );
};

export default Proyectos;
