import { makeAutoObservable } from 'mobx';
import { OptionType } from '../model/editor-model';
import SocketClient from 'config/socket';

export interface Editor {
  code: string;
  language: OptionType;
  fontSize: OptionType;
  theme: OptionType;
  compileState: 'Pending' | 'Done';
  input: string;
  output: string;
  compile: () => void;
}

export class EditorImpl implements Editor {
  code = '';

  language = { value: 'JavaScript', label: 'JavaScript' };

  fontSize = { value: '16', label: '16' };

  theme: OptionType = { value: 'Bright', label: 'Bright' };

  compileState: 'Pending' | 'Done' = 'Done';

  input = '';

  output = '';

  constructor() {
    makeAutoObservable(this);
  }

  compile() {
    this.compileState = 'Pending';
    SocketClient.compile(this.code, this.input, this.language.value);
  }
}
