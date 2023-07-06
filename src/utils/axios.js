import axios from 'axios';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import secureLocalStorage from "react-secure-storage";
// config
import { BASE_URL } from '../config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const settingsJsonStr = localStorage.getItem("settings")??'{}';
  const settings = JSON.parse(settingsJsonStr);
  if (!settings?.locale) {
    delete config.headers['Accept-Language'];
  } else {
    config.headers['Accept-Language'] = settings?.locale;
  }

  const csrf_token = secureLocalStorage.getItem("csrf");
  if (!csrf_token) {
    const fp = await FingerprintJS.load();
    const { visitorId } = await fp.get();
    secureLocalStorage.setItem("csrf", visitorId);
    config.headers['X-CSRF-Token'] = visitorId;
  } else {
    secureLocalStorage.setItem("csrf", csrf_token);
    config.headers['X-CSRF-Token'] = csrf_token;
  }

  const jwt_token = secureLocalStorage.getItem("jwt");
  if (!jwt_token) {
    delete config.headers['Authorization'];
  } else {
    secureLocalStorage.setItem("jwt", jwt_token);
    config.headers['Authorization'] = 'Basic ' + jwt_token;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((!!error.response && error.response.headers['content-type'].startsWith('application/json') && error.response.data) || 'An unexpected error occurred')
);

export default axiosInstance;
