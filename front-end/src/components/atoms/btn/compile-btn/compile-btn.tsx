import React from 'react';
import { Button } from 'antd';
import useEditor from 'hooks/useEditor';

const CompileBtn = ({ style }: { style?: React.CSSProperties }) => {
  const editor = useEditor();

  const compile = () => {
    editor.compile();
  };

  return (
    <Button onClick={compile} style={{ ...style }}>
      실행
    </Button>
  );
};

export default CompileBtn;
