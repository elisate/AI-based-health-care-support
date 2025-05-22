import React from 'react'
import { Outlet } from 'react-router-dom';
import SSidebar from './SSidebar';
import SNavbar from './SNavbar';

const SuperDashboardlayout = () => {
    return (
        <div className="dashboard">
            <SSidebar />
            <div className="main-container">
                <SNavbar />
                <div className="main-content">
                    <Outlet />
                </div>
            </div>
        </div>

    )
}

export default SuperDashboardlayout
