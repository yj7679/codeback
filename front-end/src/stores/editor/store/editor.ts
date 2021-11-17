import { makeAutoObservable } from 'mobx';
import { CompileResult, OptionType } from '../model/editor-model';

export interface Editor {
  code: string;
  language: OptionType;
  fontSize: OptionType;
  theme: OptionType;
  compileState: 'Pending' | 'Done';
  input: string;
  compileResult: CompileResult | undefined;
  compile: (socket: any) => void;
  clearOutput: () => void;
}

export class EditorImpl implements Editor {
  code = '';

  language = { value: 'JavaScript', label: 'JavaScript' };

  fontSize = { value: '16', label: '16' };

  theme: OptionType = { value: 'Bright', label: 'Bright' };

  compileState: 'Pending' | 'Done' = 'Done';

  input = '';

  compileResult: CompileResult | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  compile(socket: any) {
    this.compileState = 'Pending';
    socket.compile(this.code, this.input, this.language.value);
  }

  clearOutput() {
    this.compileResult = undefined;
  }
}
