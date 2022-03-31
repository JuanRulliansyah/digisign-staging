export function isLogin() {
    return !!localStorage.getItem('accessToken');
}

export function isObject(obj) {
    return obj != null && obj.constructor.name === "Object";
}

export const setErrorValidation = (response, setError) => {
    let result = response?.data;
    if(result?.hasOwnProperty('detail')) {
        let errorsValidate = result?.detail;
        let errorItem = Object.keys(errorsValidate);
        errorItem.forEach(field => {
            if(isObject(errorsValidate[field])) {
                let errorSubFields = Object.keys(errorsValidate[field]);
                errorSubFields.forEach(errorSubField => {
                    let subField = `${field}.${errorSubField}`;
                    setError(subField, {
                        type: 'manual',
                        message: errorsValidate[field][errorSubField][0]
                    });
                });
            } else {
                setError(field, {
                    type: 'manual',
                    message: errorsValidate[field][0]
                });
            }
        });
    }
}

export const getIdentityFromHref = (href) => {
    const url = href.replace(/\/$/, '');
    return url.substring(url.lastIndexOf('/') + 1);
}

export const handleInputNumber = (e, field, setValue) => {
    const value = e.target.value.replace(/\D/g, "");
    setValue(field, value);
};

export const getHostUrl = (linkUrl) => {
    if(process.env.REACT_APP_ENV === 'local') {
        const apiUrl = new URL(process.env.REACT_APP_API_URL);
        const currentUrl = new URL(linkUrl);

        if(currentUrl.hostname !== apiUrl.hostname) {
            currentUrl.host = apiUrl.host;
            return currentUrl.href;
        }
    }
    return linkUrl;
}

export const getChoiceByValue = (choices, value) => {
    return choices.filter(choice => {
        return choice.value === value;
    });
}

export const getChoiceDisplayName = (choices, value) => {
    const choice = getChoiceByValue(choices, value);
    return choice[0] ? choice[0].displayName : null;
};

const parseGoogleAddressComponents = (address_components) => {
    const result = {};

    for (let i=0; i < address_components.length; i++) {
        for (let b=0; b < address_components[i].types.length; b++) {
            if (address_components[i].types[b] === "administrative_area_level_1") {
                result.province = address_components[i].long_name;
                break;
            }
            if (address_components[i].types[b] === "administrative_area_level_2") {
                result.city = address_components[i].long_name;
                break;
            }
            if (address_components[i].types[b] === "administrative_area_level_3") {
                result.district = address_components[i].long_name;
                break;
            }
            if (address_components[i].types[b] === "administrative_area_level_4") {
                result.subDistrict = address_components[i].long_name;
                break;
            }
            if (address_components[i].types[b] === "postal_code") {
                result.postalCode = address_components[i].long_name;
                break;
            }
        }
    }
    return result;
}

export const isValidSelectedLocation = (results, data) => {
    const googleAddressComponent = parseGoogleAddressComponents(results[0].address_components);
    const address = data.value.split("/");
    const addressComponent = {
        province: address[0],
        city: address[1],
        district: address[2],
        subDistrict: address[3],
        postalCode: address[4]
    };
    // Check Province
    // const isValidProvince = googleAddressComponent.province.toLowerCase().includes(
    //     customerAddressComponent.province.toLowerCase());

    // Check City
    const isValidCity = googleAddressComponent?.city?.toLowerCase().includes(
        addressComponent.city.toLowerCase());

    // Check district
    const isValidDistrict = googleAddressComponent?.district?.toLowerCase().includes(
        addressComponent.district.toLowerCase());

    // Check SubDistrict
    const isValidSubDistrict = googleAddressComponent?.subDistrict?.toLowerCase().includes(
        addressComponent.subDistrict.toLowerCase());

    // Check Postal Code
    let isValidPostalCode = true;
    if(googleAddressComponent?.postalCode) {
        if (googleAddressComponent?.postalCode !== addressComponent.postalCode) {
            isValidPostalCode = false;
        }
    }

    return isValidCity && isValidDistrict && isValidSubDistrict && isValidPostalCode;
};

export const getStatusBadgeColor = (status) => {
    let badgeColor;
    switch (status) {
        case 'unpaid':
        case 'returned':
        case 'complained':
            badgeColor = 'warning';
            break;
        case 'paid':
        case 'delivered':
            badgeColor = 'success';
            break;
        case 'processed':
        case 'prepared':
            badgeColor = 'light';
            break;
        case 'ready':
            badgeColor = 'dark';
            break;
        case 'shipped':
            badgeColor = 'secondary';
            break;
        case 'received':
        case 'waiting_pickup':
        case 'on_pickup':
        case 'on_pickup_process':
        case 'otw_warehouse_hub':
        case 'received_at_warehouse_hub':
        case 'sorting_item':
        case 'shipped_to_logistic':
        case 'received_at_logistic':
            badgeColor = 'info'
            break;
        case 'created':
        case 'completed':
            badgeColor = 'primary';
            break;
        case 'refunded':
        case 'cancelled':
        case 'failed':
            badgeColor = 'danger';
            break;
        default:
            badgeColor = 'light';
            break;
    }
    return badgeColor;
}

export const socialMediaTypeChoices = () => {
    return [
        {value: "facebook", displayName: "Facebook"},
        {value: "google",displayName: "Google"},
        {value: "instagram", displayName: "Instagram"},
        {value: "line", displayName: "Line"},
        {value: "linkedin", displayName: "LinkedIn"},
        {value: "pinterest", displayName: "Pinterest"},
        {value: "telegram", displayName: "Telegram"},
        {value: "tiktok", displayName: "TikTok"},
        {value: "twitter", displayName: "Twitter"},
        {value: "wechat", displayName: "WeChat"},
        {value: "youtube", displayName:"YouTube"}
    ];
}