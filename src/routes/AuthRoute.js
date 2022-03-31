import { appConfigs } from "configs";
import React from "react";
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from "utils/helpers/commons";

export const AuthRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLogin() ? <Redirect to={`${appConfigs.rootUrl}/dashboard`} /> : <Component {...props} />
        )} />
    );
};