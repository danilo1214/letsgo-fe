import axios from 'axios';

export default class Axios {
  constructor(options) {
    this.instance = axios.create(options);
  }

  deleteUrl(path) {
    return this.instance.delete(path);
  }

  getUrl(path, options) {
    return this.instance.get(path, {
      ...options,
    });
  }

  patchUrl(path, data) {
    return this.instance.patch(path, data);
  }

  postUrl(path, data) {
    return this.instance.post(path, data);
  }

  setToken(token) {
    this.instance.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
}
