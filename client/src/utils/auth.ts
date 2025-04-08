import { JwtPayload, jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'token';

class AuthService {
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return true;
      return decoded.exp * 1000 < Date.now();
    } catch (err) {
      return true;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  login(idToken: string) {
    localStorage.setItem(TOKEN_KEY, idToken);
    window.location.assign('/dashboard'); // redirect to dashboard
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    window.location.assign('/login');
  }
}

export default new AuthService();
