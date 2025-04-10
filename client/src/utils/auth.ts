import { JwtPayload, jwtDecode } from 'jwt-decode';

const TOKEN_KEY = "id_token";

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

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  clearToken(): void {
    localStorage.removeItem(TOKEN_KEY); // ✅ fixes the error
  }

  login(idToken: string) {
    this.setToken(idToken);
    window.location.assign('/dashboard');
  }

  logout() {
    this.clearToken(); // ✅ use the new method
    window.location.assign('/login');
  }
}

export default new AuthService();
