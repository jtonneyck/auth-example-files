import axios from "axios";

export default class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    });
  }

  login = async payload => {
    const { data } = await this.service.post("/auth/login", payload);
    return data;
  };

  isLoggedIn = async () => {
    const { data } = await this.service.get("/auth/isLoggedIn");
    return data;
  };

  logout = async () => {
    const { data } = await this.service.get("/auth/logout");
    return data;
  };

  // register;
}
