import { useContext } from 'react';
import { EditorContext } from 'stores/editor';

const useEditor = () => {
  const counterContext = useContext(EditorContext);
  return counterContext;
};

export default useEditor;
