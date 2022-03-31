import { appConfigs } from "configs";
import { alertNotification } from "utils/helpers/alertNotifications";
import { setErrorValidation } from "utils/helpers/commons";

export const handleChangePageSize = (size, page, setSelectedPageSize, setCurrentPage) => {
    setSelectedPageSize(size);
    setCurrentPage(page);
}

export const handleSearchKey = (e, setSearch, setCurrentPage) => {
    if (e.key === 'Enter') {
        setSearch(e.target.value.toLowerCase());
        if (e.target.value !== '') {
            setCurrentPage(1);
        }
    }
}

export const includeDelete = (checked, setCheckedIncludeDeleted, setCurrentPage) => {
    setCheckedIncludeDeleted(checked);
    setCurrentPage(1);
}

export const getList = (service, params, selectedPageSize, setIsLoaded, setTotalItemCount, setTotalPage, setItems) => {
    async function fetchList() {
        await service(params).then(response => {
            if (response.status !== 200) {
                setIsLoaded(false);
                alertNotification(
                    'error',
                    response.data.message,
                    'Error',
                    3000
                );
            } else {
                const totalResult = Number(response.headers['x-total-results']);
                const totalPage = Math.ceil(totalResult / selectedPageSize);

                setIsLoaded(true);
                setTotalItemCount(totalResult);
                setTotalPage(totalPage);
                setItems(response.data);
            }
        });
    }
    fetchList();
}

export const handleCreate = (service, data, setLoading, setError, history, message, url) => {
    setLoading(true);
    service(data).then(response => {
        setLoading(false);
        console.log(data);
        console.log(response);
        if (response.status !== 201) {
            setErrorValidation(response, setError);
            alertNotification(
                'error',
                response.data.message,
                'Error Occurred',
                5000
            )
        } else {
            alertNotification(
                'success',
                message,
                'Success',
                3000
            )
            setTimeout(() => {
                history.push(`${appConfigs.rootUrl}${url}`);
            }, 2000);
        }
    });
}

export const handleUpdate = (service, data, identity, setLoading, setError, history, message, url) => {
    setLoading(true);
    service(identity, data).then(response => {
        setLoading(false);
        if(response.status !== 200) {
            setErrorValidation(response, setError);
            alertNotification(
                'error',
                response.data.message,
                'Error',
                5000
            )
        } else {
            alertNotification(
                'success',
                message,
                'Success',
                2000
            )
            setTimeout(() => {
                history.push(`${appConfigs.rootUrl}${url}`);
            }, 2000)
        }
    });
}

export const handleSwitch = (checked, identity, service, data) => {
    service(identity, data).then(response => {
        if(response.status !== 200) {
            alertNotification(
                'error',
                response.data.message,
                'Error Occurred',
                5000
            )
        }
    });
}

export const handleDelete = (service, identity, setRefresh, refresh, message) => {
    service(identity).then(response => {
        if(response.status !== 204) {
            alertNotification(
                'error',
                response.data.message,
                'Error Occurred',
                5000
            )
        } else {
            alertNotification(
                'success',
                message,
                'Success',
                3000
            )
            setRefresh(!refresh);
        }
    });
}