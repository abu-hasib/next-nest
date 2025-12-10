import axios from "axios";

const API = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

export function setAuthToken(token?: string) {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("access_token", token);
  } else {
    delete API.defaults.headers.common["Authorization"];
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  }
}

export function initAuth() {
  if (typeof window !== "undefined") {
    const t = localStorage.getItem("access_token");
    if (t) setAuthToken(t);
  }
}

export default API;
