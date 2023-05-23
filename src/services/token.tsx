const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN);
}

export function setAccessToken(valor: string) {
  localStorage.setItem(ACCESS_TOKEN, valor);
}

export function setRefreshToken(valor: string) {
  localStorage.setItem(REFRESH_TOKEN, valor);
}

export function clearAllToken() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

export function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN);
}

export function clearRefreshToken() {
  localStorage.removeItem(REFRESH_TOKEN);
}
