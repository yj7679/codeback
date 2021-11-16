import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { CodemirrorBinding } from 'y-codemirror';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Editor as CodeMirrorEditor } from 'codemirror';
import useEditor from 'hooks/useEditor';
import { config } from 'config/config';

type EditorProps = {
  cellId: string;
  userName: string;
  cursorColor: string;
};

const DataInput = observer(({ cellId, userName, cursorColor }: EditorProps) => {
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
      wsProvider = new WebsocketProvider(config.editorApi, cellId, ydoc);
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
    <div
      style={{
        height: '100%',
        backgroundColor: '#ffffff',
        paddingLeft: '1em'
      }}>
      <div style={{ padding: '1em 0 0 0.5em', color: '#cecece' }}>입력 값</div>
      <CodeMirror
        value={editorStore.input}
        autoScroll
        editorDidMount={(editor) => (editorRef.current = editor)}
        onChange={(_editor, _data, value) => {
          editorStore.input = value;
        }}
      />
    </div>
  );
});

export default DataInput;
