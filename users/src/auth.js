class Auth {
  constructor() {
    this.authenticated = Boolean(localStorage.getItem('token'));
    this.token = localStorage.getItem('token');
  }
  setToken(token, cb) {
    localStorage.setItem('token', token);
    cb();
  }
  getToken() {
    return localStorage.getItem('token');
  }
  logOut(cb) {
    localStorage.removeItem('token');
    cb();
  }
  isAuthenticated() {
    return Boolean(localStorage.getItem('token'));
  }
}

export default new Auth();
