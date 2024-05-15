import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './Home';
import LoginRegisterForm from './LoginRegisterForm';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="container mt-5">
      {isAuthenticated ? (
        <Home setIsAuthenticated={setIsAuthenticated}/>
      ) : (
        <LoginRegisterForm setIsAuthenticated={setIsAuthenticated} />
      )}
    </div>
  );
}

export default App;
