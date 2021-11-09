import React from 'react';
import { auth, AuthProvider } from './auth';
import { editor, EditorProvider } from './editor';
import { study, StudyProvider } from './study';

const nest = (children: React.ReactNode, component: React.ReactElement) =>
  React.cloneElement(component, {}, children);

export type MultiProviderProps = React.PropsWithChildren<{
  providers: React.ReactElement[];
}>;

const MultiProvider = ({ children, providers }: MultiProviderProps) => (
  <>{providers.reduceRight(nest, children)}</>
);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => (
  <MultiProvider
    providers={[
      <EditorProvider key="1" value={editor} />,
      <AuthProvider key="2" value={auth} />,
      <StudyProvider key="3" value={study} />
    ]}>
    {children}
  </MultiProvider>
);

export default GlobalProvider;
