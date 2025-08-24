import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;


const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, 
});
axiosInstance.interceptors.request.use(async (config) => {
  let token = localStorage.getItem('access_token');
  console.log('현재 토큰', token);
  const refreshToken = localStorage.getItem('refresh_token');
  if (!token && refreshToken) {
    console.log('토큰 없음 → refresh 실행 예정');
    token = await refreshAccessToken();
  }

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const refreshClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});
let isRefreshing = false;
let pendingQueue: ((token: string) => void)[] = [];
let pendingRejects: ((err: any) => void)[] = [];

const processQueue = (token: string | null, error: any) => {
  if (token) {
    pendingQueue.forEach((res) => res(token));
  } else {
    pendingRejects.forEach((rej) => rej(error));
  }
  pendingQueue = [];
  pendingRejects = [];
};

const refreshAccessToken = async (): Promise<string> => {
  const { data } = await refreshClient.post('/ara/auth/refresh',{"refreshToken": localStorage.getItem('refresh_token')});
  const token: string = data.accessToken;
  if (!token) throw new Error('No accessToken in refresh response');
  localStorage.setItem('access_token', token);
  return token;
};
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push((token: string) => {
            original.headers = original.headers ?? {};
            (original.headers as any).Authorization = `Bearer ${token}`;
            resolve(axiosInstance(original));
          });
          pendingRejects.push(reject);
        });
      }

      isRefreshing = true;
      try {
        const newToken = await refreshAccessToken();
        processQueue(newToken, null);
        isRefreshing = false;
        original.headers = original.headers ?? {};
        (original.headers as any).Authorization = `Bearer ${newToken}`;
        return axiosInstance(original);
      } catch (e) {
        processQueue(null, e);
        isRefreshing = false;
        localStorage.removeItem('access_token');
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
