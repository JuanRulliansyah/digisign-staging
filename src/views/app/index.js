import React, {Suspense} from 'react';
import {Route, withRouter, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import KycPages from './kyc';
import Sidebar from 'components/Sidebar/Sidebar';
import AdminNavbar from 'components/Navbars/AdminNavbar';
import FooterAdmin from 'components/Footers/FooterAdmin';
import HeaderStats from 'components/Headers/HeaderStats';
import PositionLetterPages from './position_letter';
import CertificatePages from './certificate';
import DocumentPages from './document';
import KycRequestPages from './kyc_request';
import PositionLetterRequestPages from './position_letter_request';

const Dashboard = React.lazy(() => import('containers/dashboards/index'));

const AppAdmin = ({match}) => {
    return (
        <>
        <Sidebar />
        <div className="relative md:ml-64 bg-blueGray-100">
            <AdminNavbar />
            {/* Header */}
            <HeaderStats />
            <div className="px-4 md:px-10 mx-auto w-full -m-24">
            <Suspense fallback={<div className="loading"/>}>
                <Switch>
                    <Redirect
                        exact
                        from={`${match.url}/`}
                        to={`${match.url}/dashboard`}
                    />
                    <Route
                        path={`${match.url}/dashboard`}
                        render={(props) => <Dashboard {...props} />}
                    />
                    <Route
                        path={`${match.url}/kyc`}
                        render={(props) => <KycPages {...props} />}
                    />
                    <Route
                        path={`${match.url}/kyc-request`}
                        render={(props) => <KycRequestPages {...props} />}
                    />
                    <Route
                        path={`${match.url}/position-letter`}
                        render={(props) => <PositionLetterPages {...props} />}
                    />
                    <Route
                        path={`${match.url}/position-letter-request`}
                        render={(props) => <PositionLetterRequestPages {...props} />}
                    />
                    <Route
                        path={`${match.url}/certificate`}
                        render={(props) => <CertificatePages {...props} />}
                    />
                    <Route
                        path={`${match.url}/document`}
                        render={(props) => <DocumentPages {...props} />}
                    />
                    <Redirect to="/not-found" />
                </Switch>
            </Suspense>
            <FooterAdmin />
            </div>
        </div>
        </>
    );
};

const mapStateToProps = ({menu}) => {
    const {containerClassnames} = '';
    return {containerClassnames};
};

export default withRouter(connect(mapStateToProps, {})(AppAdmin));
