import React from "react";
import {Redirect, Route} from "react-router-dom";
import { isLogin } from "utils/helpers/commons";
// import { getIdentityFromHref } from "utils/helpers/commons";
// import { LocalStorageService } from "utils/storage";


export const PrivateRoute = ({component: Component, ...rest}) => {
    const setComponent = (props) => {
        // const localStorage = LocalStorageService.getService();
        // const permissions = localStorage.getPermissions();

        if (isLogin()) {
            // const pageWithoutPermissions = ["profile", "login-success"];
            // const currentLocation = getIdentityFromHref(props.location.pathname);
            // if(pageWithoutPermissions.includes(currentLocation)) {
            //     return <Component {...props} />;
            // } else {
            //     if (permissions.includes(currentLocation)) {
            //         return <Component {...props} />;
            //     } else {
            //         return <Redirect to={{
            //             pathname: '/unauthorized',
            //             state: {from: props.location},
            //         }}/>
            //     }
            // }
            return <Component {...props} />;
        } else {
            return <Redirect to={{
                pathname: '/auth/login',
                state: {
                    from: props.location
                }
            }}/>
        }
    }

    return (
        <Route {...rest} render={setComponent}/>
    );
};