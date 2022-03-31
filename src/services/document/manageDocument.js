import { customAxios as axios } from "utils/axios";
import { appConfigs } from "configs";
// import { LocalStorageService } from "utils/storage";

export const postDocument = async (data) => {
    let result = [];
    // const localStorage = LocalStorageService.getService();
    const letter = new FormData();

    // Files
    console.log(data.document[0]);
    letter.append('ref_number', data.ref_number);
    letter.append('kd_tema', data.kd_tema);
    letter.append('document_date', data.document_date);

    letter.append('document', data.document[0]);
    letter.append('subject', data.subject);
    letter.append('message', data.message);
    
    const url = appConfigs.apiUrl + 'document/';

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

export const getListDocument = async () => {
    let result = [];
    const url = appConfigs.apiUrl + 'document/';

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

export const getListInbox = async () => {
    let result = [];
    const url = appConfigs.apiUrl + 'document/inbox/';

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

export const getListOutbox = async () => {
    let result = [];
    const url = appConfigs.apiUrl + 'document/outbox/';

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

export const getPurpose = async () => {
    let result = [];
    const url = appConfigs.apiUrl + 'document/purpose/';

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

export const getAvailableUser = async (query) => {
    let result = []
    const url = appConfigs.apiUrl + 'document/share/available-user?query_user='+query;

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

export const getDetailDocument = async (identity) => {
    let result = [];
    const url = appConfigs.apiUrl + `document/${identity}/`;
    console.log(url);

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

export const deleteDocument = async (identity) => {
    let result = [];
    const url = appConfigs.apiUrl + 'document/delete/'+identity;

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

export const shareDocument = async (data) => {
    let result = [];
    // const localStorage = LocalStorageService.getService();
    const letter = new FormData();
    letter.append('document_id', data.document_id);
    letter.append('username', data.username);
    
    const url = appConfigs.apiUrl + 'document/share/send/';

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

export const getSignList = async (identity) => {
    let result = [];
    const url = appConfigs.apiUrl + `document/share/sign-list/${identity}/`;
    console.log(url);

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