import { makeAutoObservable, runInAction } from 'mobx';
import axios, { AxiosError } from 'axios';
import authRepository from '../repository/auth-repository';
import { LoginValues, SignupValues } from '../model/auth-model';
import { handleServerError } from 'util/http-error';
import { FAIL_TO_LOGIN, FAIL_TO_LOGOUT, FAIL_TO_SIGNUP } from 'common/string-template';

export interface Auth {
  authenticated: boolean;
  login: (value: LoginValues) => Promise<void>;
  logout: () => Promise<void>;
  getSignupStartCookie: () => Promise<void>;
  checkEmailDuplicated: (email: string) => Promise<void>;
  checkNicknameDuplicated: (nickname: string) => Promise<void>;
  sendAuthCode: (email: string) => Promise<void>;
  confirmAuthCode: (email: string, code: string) => Promise<void>;
  signup: (values: SignupValues) => Promise<void>;
}

export class AuthImpl implements Auth {
  authenticated = false;

  constructor() {
    makeAutoObservable(this);
  }

  async login(value: LoginValues) {
    try {
      await authRepository.login(value);
      runInAction(() => {
        this.authenticated = true;
        localStorage.setItem('user', 'user');
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        handleServerError(axiosError);
        throw new Error(FAIL_TO_LOGIN);
      }
    }
  }

  async logout() {
    try {
      await authRepository.logout();
      runInAction(() => {
        this.authenticated = false;
        localStorage.removeItem('user');
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        handleServerError(axiosError);
        throw new Error(FAIL_TO_LOGOUT);
      }
    }
  }

  async getSignupStartCookie() {
    try {
      await authRepository.getSignupStartCookie();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        handleServerError(axiosError);
        throw new Error(FAIL_TO_SIGNUP);
      }
    }
  }

  async checkEmailDuplicated(email: string) {
    try {
      await authRepository.checkEmailDuplicated(email);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        handleServerError(axiosError);
        throw new Error(FAIL_TO_SIGNUP);
      }
    }
  }

  async checkNicknameDuplicated(nickname: string) {
    try {
      await authRepository.checkNicknameDuplicated(nickname);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        handleServerError(axiosError);
        throw new Error(FAIL_TO_SIGNUP);
      }
    }
  }

  async sendAuthCode(email: string) {
    try {
      await authRepository.sendAuthcode(email);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        handleServerError(axiosError);
        throw new Error(FAIL_TO_SIGNUP);
      }
    }
  }

  async confirmAuthCode(email: string, code: string) {
    try {
      await authRepository.confirmAuthCode(email, code);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        handleServerError(axiosError);
        throw new Error(FAIL_TO_SIGNUP);
      }
    }
  }

  async signup(values: SignupValues) {
    try {
      await authRepository.signup(values);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        handleServerError(axiosError);
        throw new Error(FAIL_TO_SIGNUP);
      }
    }
  }
}
