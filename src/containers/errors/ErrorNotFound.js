import React, { useEffect } from 'react';
import { Row, Card, CardTitle } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { appConfigs } from 'configs';

const ErrorNotFound = () => {
    useEffect(() => {
        document.body.classList.add('background');
        document.body.classList.add('no-footer');

        return () => {
            document.body.classList.remove('background');
            document.body.classList.remove('no-footer');
        };
    }, []);

    return (
        <>
            <div className="fixed-background" />
            <main>
                <div className="container">
                    <Row className="h-100">
                        <div xxs="12" md="10" className="mx-auto my-auto">
                            <Card className="auth-card">
                                <div className="position-relative image-side ">
                                    <p className="text-white h2">WHOOPS!!</p>
                                    <p className="white mb-0">Looks like an error occurred!</p>
                                </div>
                                <div className="form-side">
                                    <NavLink to="/" className="white">
                                        <span className="logo-single" />
                                    </NavLink>
                                    <CardTitle className="mb-4">
                                        Page Not Found
                                    </CardTitle>
                                    <p className="mb-0 text-muted text-small mb-0">
                                        We can't find the page that you're looking for :(
                                    </p>
                                    <p className="display-1 font-weight-bold mb-5">404</p>
                                    <NavLink to={`${appConfigs.rootUrl}/dashboard`} className="btn btn-primary btn-shadow btn-lg">
                                        Go Back Home
                                    </NavLink>
                                </div>
                            </Card>
                        </div>
                    </Row>
                </div>
            </main>
        </>
    );
};

export default ErrorNotFound;