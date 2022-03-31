import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const CreateDocument = React.lazy(() => import('containers/document/CreateDocument'));
const ListDocument = React.lazy(() => import('containers/document/ListDocument'));
const DetailDocument = React.lazy(() => import('containers/document/DetailDocument'));

const DocumentPages = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Route
                path={`${match.url}/create-document`}
                render={(props) => <CreateDocument {...props} />}
            />
            <Route
                path={`${match.url}/detail-document`}
                render={(props) => <DetailDocument {...props} />}
            />
            <Route
                path={`${match.url}/`}
                render={(props) => <ListDocument {...props} />}
            />
            <Redirect to="/not-found" />
        </Switch>
    </Suspense>
);
export default DocumentPages;