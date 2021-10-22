import React, { Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { RouteType } from './config';

const RouteWithSubRoutes = (route: RouteType) => {
  const authenticated = false;

  return (
    <Suspense fallback={route.fallback}>
      <Route
        path={route.path}
        render={(props) =>
          route.redirect ? (
            <Redirect to={route.redirect} />
          ) : route.private ? (
            authenticated ? (
              route.component && <route.component {...props} routes={route.routes} />
            ) : (
              <Redirect to="/" />
            )
          ) : (
            route.component && <route.component {...props} routes={route.routes} />
          )
        }
      />
    </Suspense>
  );
};

export default RouteWithSubRoutes;
