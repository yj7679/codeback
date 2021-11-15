import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import './app.css';
import Router from 'routes/router';
import { routes } from 'routes/config';
import useAuth from 'hooks/useAuth';
import { msg } from 'util/message';
import { mainAxios } from 'config/axios';
import { SUCCESS_TO_LOGOUT } from 'common/string-template';

const App = observer(() => {
  const auth = useAuth();
  useEffect(() => {
    if (localStorage.getItem('user')) {
      auth.authenticated = true;
      auth
        .getUserInfo()
        .then()
        .catch((err) => msg('Error', err.message));
    }
  }, [auth]);

  mainAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const {
        config,
        response: { status, data }
      } = error;

      if (status === 401) {
        auth
          .logout()
          .then(() => {
            msg('Info', SUCCESS_TO_LOGOUT);
          })
          .catch((err) => msg('Error', err.message));
      } else if (status === 403 && data === 'access token refresh') {
        const originalRequest = config;
        return axios(originalRequest);
      }

      return Promise.reject(error);
    }
  );

  return (
    <BrowserRouter>
      <Router routes={routes} />
    </BrowserRouter>
  );
});

export default App;
