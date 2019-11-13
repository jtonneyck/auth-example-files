import axios from 'axios';

export default class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    });
  }

  login = async payload => {
    const { username, password } = payload;
    const { data } = await this.service.post('/auth/login', {
      username,
      password
    });
    return data;
  };

  register = async payload => {
    const { username, password } = payload;
    const { data } = await this.service.post('/auth/register', {
      username,
      password
    });
    return data;
  };

  isLoggedIn = async () => {
    const { data } = await this.service.get('/auth/isLoggedIn');
    return data;
  };

  logout = async () => {
    const { data } = await this.service.get('/auth/logout');
    return data;
  };
}
