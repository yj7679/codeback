import { AxiosInstance } from 'axios';
import { mainAxios } from 'config/axios';
import { config } from 'config/config';
import { LoginValues, SignupValues } from '../model/auth-model';

class AuthRepository {
  constructor(private readonly instance: AxiosInstance) {}

  async getUserInfo() {
    return this.instance.get(`${config.api}/user`);
  }

  async login(value: LoginValues) {
    return this.instance.post(`${config.api}/auth/login`, value);
  }

  async logout() {
    return this.instance.get(`${config.api}/auth/logout`);
  }

  async getSignupStartCookie() {
    return this.instance.get(`${config.api}/auth/startsignup`);
  }

  async checkEmailDuplicated(email: string) {
    return this.instance.get(`${config.api}/auth/duplicate/email/${email}`);
  }

  async checkNicknameDuplicated(nickname: string) {
    return this.instance.get(`${config.api}/auth/duplicate/nickname/${nickname}`);
  }

  async sendAuthcode(email: string) {
    return this.instance.post(`${config.api}/auth/email/req`, { email });
  }

  async confirmAuthCode(email: string, code: string) {
    return this.instance.post(`${config.api}/auth/email/confirm`, { email, code });
  }

  async signup(values: SignupValues) {
    return this.instance.post(`${config.api}/user/signup`, values);
  }

  async update(values: SignupValues) {
    const { email, nickname, password } = values;
    return this.instance.put(`${config.api}/user`, {
      email,
      nickname,
      password
    });
  }

  async deleteAccount() {
    return this.instance.delete(`${config.api}/user`);
  }
}

export default new AuthRepository(mainAxios);
