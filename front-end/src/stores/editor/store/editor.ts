import { makeAutoObservable } from 'mobx';
import { OptionType } from '../model/editor-model';

export interface Editor {
  code: string;
  language: OptionType;
  fontSize: OptionType;
  theme: OptionType;
  compile: (code: string) => Promise<void>;
}

export class EditorImpl implements Editor {
  code = '';

  language = { value: 'JavaScript', label: 'JavaScript' };

  fontSize = { value: '16', label: '16' };

  theme: OptionType = { value: 'Bright', label: 'Bright' };

  constructor() {
    makeAutoObservable(this);
  }

  async compile() {
    console.log('compile');
  }
}
