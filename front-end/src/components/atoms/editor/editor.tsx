import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { CodemirrorBinding } from 'y-codemirror';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { Editor as CodeMirrorEditor } from 'codemirror';
import './editor-addon';
import useEditor from 'hooks/useEditor';
import { setLanguageString } from './util';

type EditorProps = {
  cellId: string;
  userName: string;
  cursorColor: string;
};

const Editor = observer(({ cellId, userName, cursorColor }: EditorProps) => {
  const editorRef = useRef<undefined | CodeMirrorEditor>();
  const editorStore = useEditor();

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    // A Yjs document holds the shared data
    const ydoc = new Y.Doc({
      meta: {
        cellId: cellId
      }
    });

    let wsProvider: WebsocketProvider | null = null;

    try {
      wsProvider = new WebsocketProvider('wss://demos.yjs.dev', cellId, ydoc);
      // Define a shared text type on the document
      const yText = ydoc.getText('codemirror');

      wsProvider.awareness.setLocalStateField('user', {
        name: userName,
        color: cursorColor
      });

      // "Bind" the codemirror editor to a Yjs text type.
      new CodemirrorBinding(yText, editorRef.current, wsProvider.awareness);

      wsProvider.on('status', (event: { status: string }) => {
        console.log(event.status); // logs "connected" or "disconnected"
      });
    } catch (error) {
      alert(error);
    }

    return () => {
      if (wsProvider) {
        wsProvider.disconnect();
        ydoc.destroy();
      }
    };
  }, [cellId, cursorColor, userName]);

  return (
    <div style={{ width: '100%', height: '100%', fontSize: `${editorStore.fontSize.value}px` }}>
      <CodeMirror
        value={editorStore.code}
        autoScroll
        editorDidMount={(editor) => (editorRef.current = editor)}
        onBeforeChange={(_editor, _data, value) => {
          editorStore.code = value;
        }}
        options={{
          theme: editorStore.theme.value,
          mode: setLanguageString(editorStore.language.value),
          lineNumbers: true,
          lineWrapping: true,
          smartIndent: true,
          foldGutter: true,
          tabSize: 2,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          autoCloseTags: true,
          autoCloseBrackets: true,
          matchBrackets: true
        }}
      />
    </div>
  );
});

export default Editor;
