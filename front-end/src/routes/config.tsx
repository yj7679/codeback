import React, { ComponentType, LazyExoticComponent, ReactNode, lazy } from 'react';
import { PageLoading } from 'components';

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
    fallback: <PageLoading />
  },
  {
    path: '/signup',
    exact: true,
    private: false,
    component: lazy(() => import('pages/signup/signup')),
    fallback: <PageLoading />
  },
  {
    path: '/study/:id',
    exact: true,
    private: false,
    component: lazy(() => import('pages/study/study')),
    fallback: <PageLoading />
  },
  {
    path: '*',
    exact: true,
    private: false,
    component: lazy(() => import('pages/error/not-found/not-found')),
    fallback: <PageLoading />
  }
];
