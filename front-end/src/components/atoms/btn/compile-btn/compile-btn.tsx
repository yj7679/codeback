import React from 'react';
import { Button } from 'antd';
import useEditor from 'hooks/useEditor';

const CompileBtn = ({ style, socket }: { style?: React.CSSProperties; socket: any }) => {
  const editor = useEditor();

  const compile = () => {
    editor.compile(socket);
  };

  return (
    <Button onClick={compile} style={{ ...style }}>
      실행
    </Button>
  );
};

export default CompileBtn;
