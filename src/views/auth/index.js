import FooterSmall from 'components/Footers/FooterSmall';
import Navbar from 'components/Navbars/AuthNavbar';
import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

const Login = React.lazy(() => import('containers/auth/Login'));

const Auth = ({ match }) => {
    return (
        <>
        <Navbar transparent />
        <main>
            <section className="relative w-full h-full py-40 min-h-screen">
            <div
                className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
                style={{
                backgroundImage:
                    "url(" + require("assets/img/register_bg_2.png").default + ")",
                }}
            ></div>
            <Suspense fallback={<div className="loading" />}>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={`${match.url}/login`} />
                    <Route
                        path={`${match.url}/login`}
                        render={(props) => <Login {...props} />}
                    />
                    <Redirect to="/not-found" />
                </Switch>
            </Suspense>
            <FooterSmall absolute />
            </section>
        </main>
        </>
    );
};

export default Auth;