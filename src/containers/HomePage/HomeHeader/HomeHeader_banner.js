import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import {changeLanguageApp} from '../../../store/actions';

class HomeHeader extends Component {

    changeLanguage = (language) => {
        //call event đã map từ redux (from  function: mapDispatchToProps)
        this.props.changeLanguageAppRedux(language);   
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
                        <div className='header-logo'></div> 
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
            {this.props.isShowBanner === true &&
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'><FormattedMessage id="home_banner.slogan1"/></div>
                        <div className='title2'><FormattedMessage id="home_banner.slogan2"/></div>
                    
                    </div>
                    <div className='content-between'>
                        <div className='search'>
                            <i className="fas fa-search"></i>                      
                            <FormattedMessage id="home_banner.search_specialty" defaultMessage="search">
                                {placeholder =>  <input placeholder={placeholder}/>}
                            </FormattedMessage>
                        
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='option-child'>
                            <div className='icon-child'><i className="far fa-hospital"></i></div>
                            <div className='text-child'><FormattedMessage id="home_banner.specialized_examination"/></div>
                        </div>
                        <div className='option-child'>
                            <div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
                            <div className='text-child'><FormattedMessage id="home_banner.remote_examination"/></div>
                        </div>
                        <div className='option-child'>
                            <div className='icon-child'><i className="fas fa-procedures"></i></div>
                            <div className='text-child'><FormattedMessage id="home_banner.general_examination"/></div>
                        </div>
                        <div className='option-child'>
                            <div className='icon-child'><i className="fas fa-flask"></i></div>
                            <div className='text-child'><FormattedMessage id="home_banner.medical_tests"/></div>
                        </div>
                        <div className='option-child'>
                            <div className='icon-child'><i className="fas fa-user-md"></i></div>
                            <div className='text-child'><FormattedMessage id="home_banner.mental_health"/></div>
                        </div>
                        <div className='option-child'>
                            <div className='icon-child'><i className="fas fa-briefcase-medical"></i></div>
                            <div className='text-child'><FormattedMessage id="home_banner.dental_examination"/></div>
                        </div>
                    </div>
                </div>
            }
            
        </>
        );
    }

}

//redux: chạy song song với react, đóng vai trò bộ nhớ (store), khi nào cần dùng thì goi
//store redux: isLoggedIn, language
//mapStateToProps: lấy value từ redux store gán cho biến lưu trữ trong component (isLoggedIn, language) 
//component sẽ gọi stat, function thông qua props, 
//ex: this.props.language, this.props.changeLanguageAppRedux

const mapStateToProps = state => {
     return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //fire redux event (redux action): pass action changeLanguageApp from "appAction.js"
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
