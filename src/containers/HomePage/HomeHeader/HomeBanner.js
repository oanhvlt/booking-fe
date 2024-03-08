import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

class HomeBanner extends Component {

    render() {
        return (
        <>
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
        </>
        );
    }

}

export default HomeBanner;
