import { makeAutoObservable, runInAction } from 'mobx';
import axios, { AxiosError } from 'axios';
import authRepository from '../repository/auth-repository';
import { LoginValues } from '../model/auth-model';
import { handleServerError } from 'util/http-error';
import { FAIL_TO_LOGIN, FAIL_TO_LOGOUT } from 'common/string-template';

export interface Auth {
  authenticated: boolean;
  login: (value: LoginValues) => Promise<void>;
  logout: () => Promise<void>;
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
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        handleServerError(axiosError);
        throw new Error(FAIL_TO_LOGOUT);
      }
    }
  }
}
