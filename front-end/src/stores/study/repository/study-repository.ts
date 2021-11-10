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

  async verifyStudy(id: string) {
    return this.instance.post(`${config.api}/room/verification`, {
      hash: id
    });
  }
}

export default new StudyRepository(mainAxios);
