import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import AdminRoles from './Roles'; // Importa tu nuevo componente

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/roles" element={<AdminRoles />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
