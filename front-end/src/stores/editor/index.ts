import { createContext } from 'react';
import { EditorImpl } from './store/editor';

export const editor = new EditorImpl();
export const EditorContext = createContext(editor);
export const EditorProvider = EditorContext.Provider;
