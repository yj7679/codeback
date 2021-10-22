import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './app.css';
import { Header } from 'components';

const App = () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
);

export default App;
