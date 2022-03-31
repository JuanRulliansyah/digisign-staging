import { customAxios as axios } from "utils/axios";
import {appConfigs} from "../../configs";

export const getUserModules = async () => {
    let result = [];
    const url = appConfigs.apiUrl + 'module/user/';

    await axios.get(url, {
        'headers': {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,

        }}).then(response => {
        result = response;
    }).catch(error => {
        result = error.response;
    });

    return result;
}

export const getProfileRequirement = async () => {
    let result = [];
    const url = appConfigs.apiUrl + 'profile-requirement/';

    await axios.get(url, {
        'headers': {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,

        }}).then(response => {
        result = response;
    }).catch(error => {
        result = error.response;
    });

    return result;
}