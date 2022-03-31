import { customAxios as axios } from "utils/axios";
import { appConfigs } from "configs";
// import { LocalStorageService } from "utils/storage";

export const postKyc = async (data) => {
    let result = [];
    // const localStorage = LocalStorageService.getService();
    const kyc = new FormData();
    kyc.append('identity_number', data.identity_number);
    kyc.append('full_name', data.full_name);
    kyc.append('email', data.email);
    kyc.append('phone_number', data.phone_number);
    kyc.append('gender', data.gender);
    kyc.append('place_of_birth', data.place_of_birth);
    kyc.append('date_of_birth', data.date_of_birth);
    kyc.append('province', data.province);
    kyc.append('city', data.city);
    kyc.append('district', data.district);
    kyc.append('sub_district', data.sub_district);
    kyc.append('address', data.address);
    kyc.append('postal_code', data.postal_code);

    // Files
    console.log(data.identity_file[0]);
    kyc.append('identity_file', data.identity_file[0]);
    kyc.append('face_file', data.face_file[0]);
    kyc.append('selfie_file', data.selfie_file[0]);
    kyc.append('signature_file', data.signature_file[0]);
    
    const url = appConfigs.apiUrl + 'profile/';

    await axios.post(url, kyc, {
        'headers': {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        }
    })
    .then(function (response) {
        result = response
        console.log(result);
    }).catch(function (error) {
        result = error.response
        console.log(result);
    });
    return result;
}

export const getListKyc = async () => {
    let result = [];
    const url = appConfigs.apiUrl + 'profile-list/';

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

export const getListGeneralKyc = async () => {
    let result = [];
    const url = appConfigs.apiUrl + 'profile-general-list/';

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

export const getListProvince = async (query) => {
    let result = [];
    const params = {q: query};
    const url = appConfigs.apiUrl + 'region/province';

    await axios.get(url, {
        'headers': {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,

        },
        params
    }).then(response => {
        result = response;
    }).catch(error => {
        result = error.response;
    });

    return result;
}

export const getListCity = async (query, province) => {
    let result = [];
    const params = {q: query, province: province};
    const url = appConfigs.apiUrl + 'region/city';

    await axios.get(url, {
        'headers': {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,

        },
        params
    }).then(response => {
        result = response;
    }).catch(error => {
        result = error.response;
    });

    return result;
}

export const getListDistrict = async (query, city) => {
    let result = [];
    const params = {q: query, city: city};
    const url = appConfigs.apiUrl + 'region/district';

    await axios.get(url, {
        'headers': {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,

        },
        params
    }).then(response => {
        result = response;
    }).catch(error => {
        result = error.response;
    });

    return result;
}

export const getListSubdistrict = async (query, district) => {
    let result = [];
    const params = {q: query, district: district};
    const url = appConfigs.apiUrl + 'region/sub-district';

    await axios.get(url, {
        'headers': {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,

        },
        params
    }).then(response => {
        result = response;
    }).catch(error => {
        result = error.response;
    });

    return result;
}

export const deleteKyc = async (identity) => {
    let result = [];
    const url = appConfigs.apiUrl + 'profile/delete/'+identity;

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

export const getDetailKyc = async (identity) => {
    let result = [];
    const url = appConfigs.apiUrl + `profile/${identity}/`;

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

export const approveKyc = async (data) => {
    console.log(data);
    let result = [];
    // const localStorage = LocalStorageService.getService();
    const kyc = new FormData();
    kyc.append('status', kyc.status);
    kyc.append('active', kyc.active);
    kyc.append('notes', kyc.notes);
    console.log(kyc);
    
    const url = appConfigs.apiUrl + 'profile/'+ data.kyc_id;

    await axios.patch(url, data, {
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