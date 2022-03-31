import axios from 'axios';
import {appConfigs} from "configs";
import {LocalStorageService} from "utils/storage";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const localStorage = LocalStorageService.getService();

export const customAxios = axios.create({
    baseURL: appConfigs.apiUrl
});

customAxios.interceptors.request.use(
    config => {
        const accessToken = localStorage.getAccessToken();
        config.headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const refreshAuthToken = failedRequest =>
    axios.post(`${appConfigs.apiUrl}auth/refresh/`, {
        'headers': {
            'Authorization': `Bearer ${localStorage.getAccessToken()}`,
    }}).then(tokenRefreshResponse => {
        const tokenObj = {
            'access': tokenRefreshResponse.data.access,
            'refresh': localStorage.getRefreshToken()
        }
        localStorage.setToken(tokenObj);
        failedRequest.response.config.headers["Authorization"] = `Bearer ${tokenRefreshResponse.data.access}`;
        return Promise.resolve();
    }).catch(error => {
        if(error.response && error.response.status === 500) {
            // localStorage.clearToken();
            // localStorage.clearPermissions();
            // localStorage.clearModules();
            // window.location = '/auth/login';
        }
    });

createAuthRefreshInterceptor(customAxios, refreshAuthToken, {
    statusCodes: [ 500 ] // default: [ 401 ]
  });