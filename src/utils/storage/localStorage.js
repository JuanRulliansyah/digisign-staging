export const LocalStorageService = (function(){
    let _service;
    function _getService() {
        if(!_service) {
            _service = this;
            return _service
        }
        return _service
    }

    function _setToken(tokenObj) {
        console.log('settoken : ' + tokenObj);
        localStorage.setItem('accessToken', tokenObj.access);
        localStorage.setItem('refreshToken', tokenObj.refresh);
    }

    function _getAccessToken() {
        return localStorage.getItem('accessToken');
    }

    function _getRefreshToken() {
        return localStorage.getItem('refreshToken');
    }

    function _clearToken() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    function _setPermissions(permissions) {
        localStorage.setItem('permissions', JSON.stringify(permissions));
    }

    function _getPermissions() {
        return JSON.parse(localStorage.getItem('permissions'));
    }

    function _clearPermissions() {
        localStorage.removeItem('permissions');
    }

    function _setModules(modules) {
        localStorage.setItem('modules', JSON.stringify(modules));
    }

    function _getModules() {
        return JSON.parse(localStorage.getItem('modules'));
    }

    function _clearModules() {
        localStorage.removeItem('modules');
    }

    return {
        getService : _getService,
        setToken : _setToken,
        getAccessToken : _getAccessToken,
        getRefreshToken : _getRefreshToken,
        clearToken : _clearToken,
        setPermissions: _setPermissions,
        getPermissions: _getPermissions,
        clearPermissions : _clearPermissions,
        setModules: _setModules,
        getModules: _getModules,
        clearModules : _clearModules,
    }
})();