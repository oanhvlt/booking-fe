import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { FormattedMessage } from 'react-intl';
import {LANGUAGES, USER_ROLE} from '../../utils';
import _ from 'lodash';
//import all actions in redux store
import * as actions from "../../store/actions";

class Header extends Component {

    constructor(props){
        super(props);
        this.state = {
            menuApp: []
        }
    }

    handleChangeLanguage(language){
         //call event đã map từ redux (from  function: mapDispatchToProps)
         this.props.changeLanguageAppRedux(language);   
    }

    componentDidMount(){
        //check quyền user
        
        let {userInfo} = this.props;
        let menu = [];
        if(userInfo && !_.isEmpty(userInfo)){
            let role = userInfo.roleId;
            if(role === USER_ROLE.ADMIN){
                menu = adminMenu;
            }
            else if(role === USER_ROLE.DOCTOR){
                menu = doctorMenu;
            }

            this.setState({
                menuApp: menu
            })
        }
    }
    render() {
         //console.log('user info: ',  this.props.userInfo);
        const { processLogout, language, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className='language'>
                    <span className="welcome">
                        <FormattedMessage id="system_header.welcome"/>, {userInfo && userInfo.firstName ? userInfo.firstName : ''}
                    </span>
                    <span className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}
                        onClick={ () => this.handleChangeLanguage(LANGUAGES.VI) }>VN
                    </span>
                    <span className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}
                        onClick={ () => this.handleChangeLanguage(LANGUAGES.EN) }>EN
                    </span>
                    {/* nút logout */}
                    <div className="btn btn-logout" 
                        onClick={processLogout} title = 'Logout'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
   
            </div>
        );
    }

}

//isLoggedIn,userInfo: initial from 'userReducer.js'
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        //fire redux event (redux action): pass action changeLanguageApp from "appAction.js"
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
