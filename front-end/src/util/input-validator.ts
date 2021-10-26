import {
  MANDATORY_EMAIL,
  INVALID_EMAIL_FORMAT,
  DUPLICATED_EMAIL,
  MANDATORY_NICKNAME,
  NICKNAME_LENGTH_FORMAT,
  NICKNAME_CANT_USE_SPECIAL_CHAR,
  DUPLICATED_NICKNAME,
  INVALID_PASSWORD_FORMAT
} from './../common/string-template';

export interface InputValidator {
  checkEmail: (_: any, email: string) => Promise<void>;
  checkNickname: (_: any, email: string) => Promise<void>;
  checkPassword: (_: any, email: string) => Promise<void>;
}

class InputValidatorImpl implements InputValidator {
  private readonly emailRegExp: RegExp;

  private readonly nicknameRegExp: RegExp;

  private readonly passwordRegExp: RegExp;

  constructor() {
    this.emailRegExp = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;
    this.nicknameRegExp = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣])/;
    this.passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
  }

  checkEmail = (_: any, email: string) => {
    if (!email) {
      return Promise.reject(new Error(MANDATORY_EMAIL));
    }
    if (!email.match(this.emailRegExp)) {
      return Promise.reject(new Error(INVALID_EMAIL_FORMAT));
    }
    // 이메일 중복 확인 API가 들어가야 함
    if (email === '123@naver.com') {
      return Promise.reject(new Error(DUPLICATED_EMAIL));
    }
    return Promise.resolve();
  };

  checkNickname = (_: any, nickname: string) => {
    if (!nickname) {
      return Promise.reject(new Error(MANDATORY_NICKNAME));
    }
    if (nickname.length < 2 || nickname.length > 10) {
      return Promise.reject(new Error(NICKNAME_LENGTH_FORMAT));
    }
    if (!nickname.match(this.nicknameRegExp)) {
      return Promise.reject(new Error(NICKNAME_CANT_USE_SPECIAL_CHAR));
    }
    // 닉네임 중복 로직 들어가야 함
    if (nickname === 'asdf1234') {
      return Promise.reject(new Error(DUPLICATED_NICKNAME));
    }
    return Promise.resolve();
  };

  checkPassword = (_: any, password: string) => {
    if (!password.match(this.passwordRegExp)) {
      return Promise.reject(new Error(INVALID_PASSWORD_FORMAT));
    }
    return Promise.resolve();
  };
}

export default new InputValidatorImpl();
