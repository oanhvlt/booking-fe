import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import {changeLanguageApp} from '../../../store/actions';
//use history.push: directly to a router
import { withRouter } from 'react-router';

class HomeMenu extends Component {

    changeLanguage = (language) => {
        //call event đã map từ redux (from  function: mapDispatchToProps)
        this.props.changeLanguageAppRedux(language);   
    }

    returnToHome = () => {
        if(this.props.history){
            this.props.history.push(`/home`);
        }
    }

    render() {
        
        //call language đã map từ redux store (thông qua props):
        let language = this.props.language;

        return (
        <>
            <div className='home-header-container'>
                <div className='home-header-content'>
                    <div className='left-content'>
                        <i className="fas fa-bars"></i> 
                        <div className='header-logo' onClick={() => this.returnToHome()}></div> 
                    </div>
                    <div className='center-content'>
                        <div className='child-content'>
                            <div><b><FormattedMessage id="home_header.specialty"/></b></div>
                            <div className='sub-title'><FormattedMessage id="home_header.search_doctor_by_specialty"/></div>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id="home_header.health_facility"/></b></div>
                            <div className='sub-title'><FormattedMessage id="home_header.select_clinic_room"/></div>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id="home_header.doctor"/></b></div>
                            <div className='sub-title'><FormattedMessage id="home_header.select_doctor"/></div>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id="home_header.checkup_package"/></b></div>
                            <div className='sub-title'><FormattedMessage id="home_header.general_health_check"/></div>
                        </div>
                    </div>
                    <div className='right-content'>
                        <div className='support'>
                            <i className="fas fa-question-circle"></i> <FormattedMessage id="home_header.support"/>
                        </div>
                        <div className={language === LANGUAGES.VI ? 'language active':'language'}>
                            <span onClick={ ()=>this.changeLanguage(LANGUAGES.VI) }>VN</span>
                        </div>
                        <div className={language === LANGUAGES.EN ? 'language active language-en ':'language language-en'}>
                            <span onClick={ ()=>this.changeLanguage(LANGUAGES.EN) }>EN</span>
                        </div>
                    </div>
                </div>
            </div>
          
        </>
        );
    }

}

const mapStateToProps = state => {
     return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //fire redux event (redux action): pass action changeLanguageApp from "appAction.js"
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeMenu));
