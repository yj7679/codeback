import { auth } from 'stores/auth';
import { Auth } from 'stores/auth/store/auth';
import {
  MANDATORY_EMAIL,
  INVALID_EMAIL_FORMAT,
  DUPLICATED_EMAIL,
  MANDATORY_NICKNAME,
  DUPLICATED_NICKNAME,
  INVALID_PASSWORD_FORMAT,
  MANDATORY_PASSWORD,
  INVALID_NICKNAME_FORMAT
} from './../common/string-template';

export interface InputValidator {
  checkEmail: (_: any, email: string) => Promise<void>;
  checkNickname: (_: any, nickname: string) => Promise<void>;
  checkPassword: (_: any, password: string) => Promise<void>;
}

class InputValidatorImpl implements InputValidator {
  private readonly emailRegExp: RegExp;

  private readonly nicknameRegExp: RegExp;

  private readonly passwordRegExp: RegExp;

  constructor(private readonly authStore: Auth) {
    this.emailRegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.nicknameRegExp = /[a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,10}/;
    this.passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
  }

  checkEmail = async (_: any, email: string) => {
    if (email.length === 0) {
      return Promise.reject(new Error(MANDATORY_EMAIL));
    }

    if (!email.match(this.emailRegExp)) {
      return Promise.reject(new Error(INVALID_EMAIL_FORMAT));
    }

    try {
      await this.authStore.checkEmailDuplicated(email);
      return await Promise.resolve();
    } catch {
      return Promise.reject(new Error(DUPLICATED_EMAIL));
    }
  };

  checkEmailLoginForm = async (_: any, email: string) => {
    if (email.length === 0) {
      return Promise.reject(new Error(MANDATORY_EMAIL));
    }

    if (!email.match(this.emailRegExp)) {
      return Promise.reject(new Error(INVALID_EMAIL_FORMAT));
    }
  };

  checkNickname = async (_: any, nickname: string) => {
    if (!nickname) {
      return Promise.reject(new Error(MANDATORY_NICKNAME));
    }

    if (!nickname.match(this.nicknameRegExp)) {
      return Promise.reject(new Error(INVALID_NICKNAME_FORMAT));
    }

    try {
      await this.authStore.checkNicknameDuplicated(nickname);
      return await Promise.resolve();
    } catch {
      return Promise.reject(new Error(DUPLICATED_NICKNAME));
    }
  };

  checkPassword = (_: any, password: string) => {
    if (!password) {
      return Promise.reject(new Error(MANDATORY_PASSWORD));
    }
    if (!password.match(this.passwordRegExp)) {
      return Promise.reject(new Error(INVALID_PASSWORD_FORMAT));
    }
    return Promise.resolve();
  };
}

export default new InputValidatorImpl(auth);
