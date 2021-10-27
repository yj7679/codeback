import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './app.css';
import Router from 'routes/router';
import { routes } from 'routes/config';

const App = () => (
  <BrowserRouter>
    <Router routes={routes} />
  </BrowserRouter>
);

export default App;
