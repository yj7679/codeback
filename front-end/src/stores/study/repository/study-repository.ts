import { AxiosInstance } from 'axios';
import { mainAxios } from 'config/axios';
import { config } from 'config/config';

class StudyRepository {
  constructor(private readonly instance: AxiosInstance) {}

  async getStudyId() {
    return this.instance.post(`${config.api}/room`);
  }

  async leaveStudy() {
    return this.instance.delete(`${config.api}/room`);
  }
}

export default new StudyRepository(mainAxios);
