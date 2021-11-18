import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import { msg } from 'util/message';
import useEditor from 'hooks/useEditor';
import {
  CPP_TEMPLATE,
  JAVASCRIPT_TEMPLATE,
  JAVA_TEMPLATE,
  PYTHON_TEMPLATE
} from 'common/string-template';

const CopyCodeTemplateBtn = observer(({ style }: { style?: React.CSSProperties }) => {
  const editor = useEditor();
  const copyLanguageTemplate = () => {
    switch (editor.language.value) {
      case 'JavaScript':
        navigator.clipboard.writeText(JAVASCRIPT_TEMPLATE);
        break;
      case 'C++':
        navigator.clipboard.writeText(CPP_TEMPLATE);
        break;
      case 'Java':
        navigator.clipboard.writeText(JAVA_TEMPLATE);
        break;
      case 'Python':
        navigator.clipboard.writeText(PYTHON_TEMPLATE);
        break;
      default:
        throw new Error(`unknown language ${editor.language.value}`);
    }
    msg('Success', '코드 템플릿 복사');
  };
  return (
    <Button onClick={copyLanguageTemplate} style={{ ...style }}>
      코드 템플릿
    </Button>
  );
});

export default CopyCodeTemplateBtn;
