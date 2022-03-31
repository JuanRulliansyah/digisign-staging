import FooterSmall from 'components/Footers/FooterSmall';
import Navbar from 'components/Navbars/AuthNavbar';
import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

const VerifyPages = React.lazy(() => import('containers/verify/Verify'));

const Verify = ({ match }) => {
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
                    <Route
                        path={`${match.url}/verify`}
                        render={(props) => <VerifyPages {...props} />}
                    />
                    <Redirect to="/not-found" />
                </Switch>
            </Suspense>
            <FooterSmall absolute />
            </section>
        </main>
        {/* // <AuthLayout></AuthLayout> */}
        </>
    );
};

export default Verify;