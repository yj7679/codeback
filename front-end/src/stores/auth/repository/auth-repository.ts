import { AxiosInstance } from 'axios';
import { mainAxios } from 'config/axios';
import { config } from 'config/config';
import { LoginValues } from '../model/auth-model';

class AuthRepository {
  constructor(private readonly instance: AxiosInstance) {}

  async login(value: LoginValues) {
    return this.instance.post(`${config.api}/auth/login`, value);
  }

  async logout() {
    return this.instance.get(`${config.api}/auth/logout`);
  }
}

export default new AuthRepository(mainAxios);
