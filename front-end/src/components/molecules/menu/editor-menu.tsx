import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Select } from 'antd';
import useEditor from 'hooks/useEditor';
import { OptionType } from 'stores/editor/model/editor-model';
import { CssKeyObject } from 'types/common';
import { CompileBtn, UrlCopyBtn } from 'components';
import SocketClient from 'config/socket';

const { Option } = Select;

const styles: CssKeyObject = {
  container: {
    minWidth: '18em'
  },
  option: {
    marginRight: '.5em'
  },
  theme: {
    minWidth: '6em'
  },
  language: {
    minWidth: '7.8em'
  }
};

const EditorMenu = observer(() => {
  const editor = useEditor();

  useEffect(() => {
    SocketClient.io.on('language', (language: any) => {
      editor.language = { ...language };
    });
  }, [editor]);

  const handleLanguageChange = (value: OptionType) => {
    SocketClient.io.emit('language', {
      language: value
    });
    editor.language = value;
  };

  const handleThemeChange = (value: OptionType) => {
    editor.theme = value;
  };

  const handleFontChange = (value: OptionType) => {
    editor.fontSize = value;
  };

  return (
    <div style={styles.container}>
      <CompileBtn style={styles.option} />
      <UrlCopyBtn style={styles.option} />
      <Select
        labelInValue
        defaultValue={editor.theme}
        style={{ ...styles.option, ...styles.theme }}
        onChange={handleThemeChange}>
        <Option value="Dark">Dark</Option>
        <Option value="Bright">Bright</Option>
      </Select>

      <Select
        labelInValue
        value={editor.language}
        style={{ ...styles.option, ...styles.language }}
        onChange={handleLanguageChange}>
        <Option value="JavaScript">JavaScript</Option>
        <Option value="Java">Java</Option>
        <Option value="Python">Python</Option>
        <Option value="C++">C++</Option>
      </Select>

      <Select
        labelInValue
        defaultValue={editor.fontSize}
        style={styles.option}
        onChange={handleFontChange}>
        <Option value="16">16</Option>
        <Option value="20">20</Option>
        <Option value="24">24</Option>
        <Option value="28">28</Option>
        <Option value="32">32</Option>
        <Option value="36">36</Option>
      </Select>
    </div>
  );
});

export default EditorMenu;
