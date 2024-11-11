import React, { useState } from 'react';
import './Documentos.css';
import {
  Button,
  Col,
  Navbar,
  Nav,
  Card,
  Table,
  Form,
  Dropdown,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaKey, FaUsers, FaEnvelope, FaProjectDiagram, FaFileAlt, FaTasks, FaCog, FaUpload, FaFolderPlus, FaBell, FaEdit, FaEllipsisH, FaTrash, FaDownload, FaExternalLinkAlt, FaPencilAlt } from 'react-icons/fa';

const Documentos = () => {
  const [menuVisible, setMenuVisible] = useState(true);
  const [documents, setDocuments] = useState([
    { folder: 'Cerrados', doc: 'Informe Dimensiones', client: 'ACME', date: '2022-01-23', type: 'Informe' },
    { folder: 'En Etapa 3', doc: 'Plano 3D', client: 'Coliseo Metropolitano', date: '2024-01-09', type: 'Plano' },
    { folder: 'Activos', doc: 'Análisis Financiero', client: 'Global Corp', date: '2023-08-15', type: 'Informe' },
    { folder: 'Finalizados', doc: 'Especificaciones Técnicas', client: 'Industrias Químicas', date: '2023-11-02', type: 'Manual' },
    { folder: 'Recientes', doc: 'Memoria de Cálculo', client: 'Inmobiliaria Sur', date: '2023-09-18', type: 'Informe' },
    { folder: 'En Proceso', doc: 'Maqueta VR', client: 'Museo Nacional', date: '2024-03-10', type: 'Plano' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isSortedAlphabetically, setIsSortedAlphabetically] = useState(false);
  const [isSortedByDate, setIsSortedByDate] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // Función para ordenar alfabéticamente
  const handleSortAlphabetically = () => {
    const sortedDocuments = [...documents].sort((a, b) =>
      isSortedAlphabetically
        ? b.doc.localeCompare(a.doc)
        : a.doc.localeCompare(b.doc)
    );
    setDocuments(sortedDocuments);
    setIsSortedAlphabetically(!isSortedAlphabetically);
    setIsSortedByDate(false); // Reinicia el estado de ordenación por fecha
  };

  // Función para ordenar por fecha
  const handleSortByDate = () => {
    const sortedDocuments = [...documents].sort((a, b) =>
      isSortedByDate ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)
    );
    setDocuments(sortedDocuments);
    setIsSortedByDate(!isSortedByDate);
    setIsSortedAlphabetically(false); // Reinicia el estado de ordenación alfabética
  };

  // Función para manejar la búsqueda
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtra los documentos basados en el término de búsqueda
  const filteredDocuments = documents.filter((doc) =>
    doc.doc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="documentos-app d-flex">
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
              <Nav.Link href="/proyectos">
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
        
        {/* Header with Title and Notification Bell */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">Administración Documentos</h1>
          <FaBell style={{ fontSize: '24px', cursor: 'pointer' }} />
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <Button variant="outline-secondary" className="me-2" onClick={handleSortAlphabetically}>
              Ordenar {isSortedAlphabetically ? 'Z-A' : 'A-Z'}
            </Button>
            <Button variant="outline-secondary" className="me-2" onClick={handleSortByDate}>
              Ordenar por Fecha {isSortedByDate ? 'Ascendente' : 'Descendente'}
            </Button>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                <FaUpload /> Subir documento
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Informe</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Plano</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Excel</Dropdown.Item>
                <Dropdown.Item href="#/action-4">Presentación</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Button variant="dark">
            <FaFolderPlus /> Crear carpeta
          </Button>
        </div>

        {/* Search Bar */}
        <div className="search-container mb-4">
          <Form.Control
            type="text"
            placeholder="Buscar Doc"
            className="search-input"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Documents Table with Scroll */}
        <Card>
          <Card.Body>
            <div className="table-scroll">
              <Table responsive bordered>
                <thead>
                  <tr>
                    <th>Nombre Carpeta</th>
                    <th>Nombre Documento</th>
                    <th>Cliente</th>
                    <th>Fecha Subido</th>
                    <th>Tipo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocuments.map((doc, index) => (
                    <tr key={index}>
                      <td>{doc.folder}</td>
                      <td>{doc.doc}</td>
                      <td>{doc.client}</td>
                      <td>{doc.date}</td>
                      <td>{doc.type}</td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle variant="outline-secondary" size="sm">
                            <FaEllipsisH />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item href="#/download">
                              <FaDownload /> Descargar
                            </Dropdown.Item>
                            <Dropdown.Item href="#/open">
                              <FaExternalLinkAlt /> Abrir
                            </Dropdown.Item>
                            <Dropdown.Item href="#/rename">
                              <FaPencilAlt /> Cambiar nombre
                            </Dropdown.Item>
                            <Dropdown.Item href="#/edit">
                              <FaEdit /> Editar
                            </Dropdown.Item>
                            <Dropdown.Item href="#/delete" className="text-danger">
                              <FaTrash /> Borrar
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>

        {/* Footer with Logo */}
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

export default Documentos;
