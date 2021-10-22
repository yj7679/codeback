import React from 'react';
import { Switch } from 'react-router-dom';
import { RouteType } from './config';
import RouteWithSubRoutes from './route-with-sub-routes';

type RouterProps = {
  routes: RouteType[];
};

const Router = ({ routes }: RouterProps) => (
  <Switch>
    {routes && routes.map((route: RouteType) => <RouteWithSubRoutes key={route.path} {...route} />)}
  </Switch>
);

export default Router;
