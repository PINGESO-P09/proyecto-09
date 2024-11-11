import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Roles from './Roles';
import Permisos from './Permisos';
import Mensajes from './Mensajes';
import Documentos from './Documentos'; // Importa la nueva vista de Documentos
import Proyectos from './Proyectos';
import FloatingChat from './FloatingChat'; // Importa el chat flotante

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/permisos" element={<Permisos />} />
          <Route path="/mensajes" element={<Mensajes />} />
          <Route path="/documentos" element={<Documentos />} /> {/* Nueva ruta para Documentos */}
          <Route path="/proyectos" element={<Proyectos />} /> {/* Nueva ruta para Proyectos */}
        </Routes>
        <FloatingChat /> {/* Agrega el chat flotante aquí */}
      </div>
    </Router>
  );
}

export default App;
