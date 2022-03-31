import React, { Suspense } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
// import {AuthRoute, PrivateRoute} from "routes";
import { appConfigs } from "configs";
import { AuthRoute } from 'routes/AuthRoute';
import { PrivateRoute } from 'routes/PrivateRoute';

const ViewApp = React.lazy(() => import('views/app'));
const ViewAuth = React.lazy(() => import('views/auth'));
const ViewLoginSuccess = React.lazy(() => import('containers/auth/LoginSuccess'));
const ViewErrorNotFound = React.lazy(() => import('containers/errors/ErrorNotFound'));
const ViewErrorUnauthorized = React.lazy(() => import('containers/errors/ErrorUnauthorized'));
const Verify = React.lazy(() => import('containers/verify/Verify'));


function App() {
    return (
        <div className="h-100">
            <>
            <NotificationContainer />
            <Suspense fallback={<div className="loading" />}>
                <Router>
                    <Switch>
                        <Redirect exact from="/" to={`${appConfigs.rootUrl}/dashboard`} />
                        <PrivateRoute
                            path={appConfigs.rootUrl}
                            component={ViewApp}
                        />
                        <AuthRoute
                            path="/auth"
                            component={ViewAuth}
                        />
                        <PrivateRoute
                            path="/login-success"
                            exact
                            component={ViewLoginSuccess}
                        />
                        <Route
                            path="/verify"
                            exact
                            render={(props) => <Verify {...props} />}
                        />
                        <Route
                            path="/not-found"
                            exact
                            render={(props) => <ViewErrorNotFound {...props} />}
                        />
                        <Route
                            path="/unauthorized"
                            exact
                            render={(props) => <ViewErrorUnauthorized {...props} />}
                        />
                        <Redirect to="/not-found" />
                    </Switch>
                </Router>
            </Suspense>
            </>
        </div>
    );
}

export default App;
