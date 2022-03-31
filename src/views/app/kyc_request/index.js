import DetailKycRequest from 'containers/kyc_request/DetailKycRequest';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// const CreateKyc = React.lazy(() => import('containers/kyc/CreateKyc'));
// const ListKyc = React.lazy(() => import('containers/kyc/ListKyc'));
// const UpdateKyc = React.lazy(() => import('containers/kyc/UpdateKyc'));
const ListKycRequest = React.lazy(() => import('containers/kyc_request/ListKycRequest'));

const KycRequestPages = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            {/* <Route
                path={`${match.url}/create-kyc`}
                render={(props) => <CreateKyc {...props} />}
            />
            <Route
                path={`${match.url}/edit-kyc`}
                render={(props) => <UpdateKyc {...props} />}
            /> */}
            <Route
                path={`${match.url}/detail-kyc-request`}
                render={(props) => <DetailKycRequest {...props} />}
            />
            <Route
                path={`${match.url}/`}
                render={(props) => <ListKycRequest {...props} />}
            />
            
            <Redirect to="/not-found" />
        </Switch>
    </Suspense>
);
export default KycRequestPages;