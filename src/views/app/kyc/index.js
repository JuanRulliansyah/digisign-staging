import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const CreateKyc = React.lazy(() => import('containers/kyc/CreateKyc'));
const ListKyc = React.lazy(() => import('containers/kyc/ListKyc'));

const KycPages = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Route
                path={`${match.url}/create-kyc`}
                render={(props) => <CreateKyc {...props} />}
            />
            <Route
                path={`${match.url}/`}
                render={(props) => <ListKyc {...props} />}
            />
            <Redirect to="/not-found" />
        </Switch>
    </Suspense>
);
export default KycPages;