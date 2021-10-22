import React, { ComponentType, LazyExoticComponent, ReactNode, lazy } from 'react';

export type RouteType = {
  path: string;
  exact: boolean;
  fallback: NonNullable<ReactNode> | null;
  component?: LazyExoticComponent<ComponentType<any>>;
  routes?: RouteType[];
  redirect?: string;
  private?: boolean;
};

export const routes: RouteType[] = [
  {
    path: '/',
    exact: true,
    private: false,
    component: lazy(() => import('pages/landing/landing')),
    fallback: <h1>Loading...</h1>
  },
  {
    path: '*',
    exact: true,
    private: false,
    component: lazy(() => import('pages/error/not-found')),
    fallback: <h1>Loading...</h1>
  }
];
