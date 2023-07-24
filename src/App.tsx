import React from 'react';
import './App.css';
import Home from './pages/home';
import { Container } from '@mui/material';

function App() {
  return (
    <div className='App'>
      <Container maxWidth='lg'>
        <Home />
      </Container>
    </div>
  );
}

export default App;
