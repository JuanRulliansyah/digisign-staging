import axios from "axios";
import { appConfigs } from "configs";

export const postLogin = async (data) => {
    let result = []
    const url = appConfigs.apiUrl + 'auth/login/';

    await axios.post(url, data, {
        headers: {
            'Content-Type': 'application/json;',
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(function (response) {
        result = response
        console.log(result);
    }).catch(function (error) {
        result = error.response
        console.log(result);
    });
    return result;
}