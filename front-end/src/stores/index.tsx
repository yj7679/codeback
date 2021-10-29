import React from 'react';
import { editor, EditorProvider } from './editor';

const nest = (children: React.ReactNode, component: React.ReactElement) =>
  React.cloneElement(component, {}, children);

export type MultiProviderProps = React.PropsWithChildren<{
  providers: React.ReactElement[];
}>;

const MultiProvider = ({ children, providers }: MultiProviderProps) => (
  <>{providers.reduceRight(nest, children)}</>
);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => (
  <MultiProvider providers={[<EditorProvider key="1" value={editor} />]}>{children}</MultiProvider>
);

export default GlobalProvider;
