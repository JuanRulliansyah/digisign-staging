import { customAxios as axios } from "utils/axios";
import { appConfigs } from "configs";

export const getDetailVerify = async (identity) => {
    let result = [];
    const url = appConfigs.baseUrl + 'verify/'+identity;

    await axios.get(url, {
        'headers': {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,

        }}).then(response => {
        result = response;
    }).catch(error => {
        result = error.response;
    });
    console.log(result);
    return result;
}