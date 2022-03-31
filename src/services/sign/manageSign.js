import { customAxios as axios } from "utils/axios";
import { appConfigs } from "configs";

export const signDocument = async (data) => {
    let result = [];
    // const localStorage = LocalStorageService.getService();
    const letter = new FormData();
    letter.append('document_id', data.document_id);
    letter.append('password', data.password);
    
    const url = appConfigs.apiUrl + 'sign/';

    await axios.post(url, letter, {
        'headers': {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,

        }
    })
    .then(function (response) {
        result = response
    }).catch(function (error) {
        result = error.response
    });
    return result;
}