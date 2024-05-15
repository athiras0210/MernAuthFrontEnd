import React from 'react';
import { Button } from 'react-bootstrap';

function Home({ setIsAuthenticated }) {
  const name = sessionStorage.getItem('name');

  const handleLogout = () => {
    sessionStorage.clear();
    setIsAuthenticated(false);
  };

  return (
    <div>
      <h1>Welcome {name}!</h1>
      <p>This is the home page content.</p>
      <Button variant="secondary" onClick={handleLogout}>Logout</Button>
    </div>
  );
}

export default Home;
