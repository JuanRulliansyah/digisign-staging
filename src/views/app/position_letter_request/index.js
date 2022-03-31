import DetailPositionLetterRequest from 'containers/position_letter_request/DetailPositionLetterRequest';
import ListPositionLetterRequest from 'containers/position_letter_request/ListPositionLetterRequest';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// const CreateKyc = React.lazy(() => import('containers/kyc/CreateKyc'));
// const ListKyc = React.lazy(() => import('containers/kyc/ListKyc'));
// const UpdateKyc = React.lazy(() => import('containers/kyc/UpdateKyc'));

const PositionLetterRequestPages = ({ match }) => (
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
                path={`${match.url}/detail-position-letter-request`}
                render={(props) => <DetailPositionLetterRequest {...props} />}
            />
            <Route
                path={`${match.url}/`}
                render={(props) => <ListPositionLetterRequest {...props} />}
            />
            
            <Redirect to="/not-found" />
        </Switch>
    </Suspense>
);
export default PositionLetterRequestPages;