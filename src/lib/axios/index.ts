import axios from "axios";

export const httpClient = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

function interceptor(request: any) {
  const tokenKey = localStorage.getItem("token-user");

  if (tokenKey) {
    request.headers.Authorization = `Bearer ${tokenKey}`;
  }

  return request;
}

httpClient.interceptors.request.use((request) => interceptor(request));
