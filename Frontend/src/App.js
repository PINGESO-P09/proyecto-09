import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Roles from './Roles';
import Permisos from './Permisos';
import Mensajes from './Mensajes';
import FloatingChat from './FloatingChat'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/permisos" element={<Permisos />} />
          <Route path="/mensajes" element={<Mensajes />} />
        </Routes>
        <FloatingChat /> {/* Agrega el chat flotante aquí */}
      </div>
    </Router>
  );
}

export default App;
