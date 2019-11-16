import axios from 'axios';

export default class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    });
  }

  uploadProfilePicture = async payload => {
    const { data } = await this.service.post('/upload/profile-picture', payload);
    return data;
  };

}
