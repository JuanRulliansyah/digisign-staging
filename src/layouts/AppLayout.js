import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

const AppLayout = ({ containerClassnames, children, history }) => {
    return (
        <>
        <Sidebar />
        <div className="relative md:ml-64 bg-blueGray-100">
            <AdminNavbar />
            {/* Header */}
            <div className="px-4 md:px-10 mx-auto w-full -m-24">
                
            <FooterAdmin />
            </div>
        </div>
        </>
    );
};

const mapStateToProps = ({ menu }) => {
    const { containerClassnames } = '';
    return { containerClassnames };
};
const mapActionToProps = {};

export default withRouter(
    connect(mapStateToProps, mapActionToProps)(AppLayout)
);