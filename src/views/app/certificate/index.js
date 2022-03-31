import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const CreateCertificate = React.lazy(() => import('containers/certificate/CreateCertificate'));
const ListCertificate = React.lazy(() => import('containers/certificate/ListCertificate'));

const CertificatePages = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Route
                path={`${match.url}/create-certificate`}
                render={(props) => <CreateCertificate {...props} />}
            />
            <Route
                path={`${match.url}/`}
                render={(props) => <ListCertificate {...props} />}
            />
            <Redirect to="/not-found" />
        </Switch>
    </Suspense>
);
export default CertificatePages;