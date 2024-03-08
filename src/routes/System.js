// this file create route in system admin

import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from '../containers/Header/Header';
import ManageDoctor from '../containers/System/Admin/ManageDoctor';
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';
import ManageClinic from '../containers/System/Clinic/ManageClinic';


class System extends Component {
     /* {this.props.isLoggedIn && <Header />} */
    render() {
        const { systemMenuPath, isLoggedIn} = this.props;
        return (
        <>
           {isLoggedIn && <Header />}
           <div className="system-container">
                <div className="system-list">
                    <Switch>
                        {/* use Route as link in menuApp.js */}
                        <Route path="/system/user-manage" component={UserManage} /> 
                        <Route path="/system/user-redux" component={UserRedux} />
                        <Route path="/system/manage-doctor" component={ManageDoctor} />
                        <Route path="/system/manage-doctor" component={ManageDoctor} />
                        <Route path="/system/manage-specialty" component={ManageSpecialty} />
                        <Route path="/system/manage-clinic" component={ManageClinic} />

                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                    </Switch>
                </div>
            </div>
        </>
            
        );
    }
}

//systemMenuPath: initial from 'appReducer.js'
//isLoggedIn: initial from 'userReducer.js'
const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
