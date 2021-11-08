import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './app.css';
import Router from 'routes/router';
import { routes } from 'routes/config';
import { observer } from 'mobx-react-lite';
import useAuth from 'hooks/useAuth';

const App = observer(() => {
  const auth = useAuth();
  useEffect(() => {
    if (localStorage.getItem('user')) {
      auth.authenticated = true;
    }
  }, [auth]);

  return (
    <BrowserRouter>
      <Router routes={routes} />
    </BrowserRouter>
  );
});

export default App;
