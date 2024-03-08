import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { FormattedMessage } from 'react-intl';
//import image form utils//ImageStore.js
//import { About_IMG } from '../../../utils';

class About extends Component {

    render() {     

        return (
        <div className='section-container section-about'>
            <div className='section-about-header'>
                Truyền thông nói về Channel Booking Care
            </div>  
            <div className='section-about-content'>
                <div className='content-left'>
            
                    <iframe width="100%" height="400px" 
                        src="https://www.youtube.com/embed/wxDM81OyDms?si=uvEIwc5GQF4tuDuK" 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    />

                </div>
                <div className='content-right'>
                    <p>A Silent Threat: 8 Signs That Could Indicate Fatty Liver Disease | Healthy Care
                    Disclaimer: this video is for educational purposes only, 
                    so do speak to your doctor if you have any medical conditions.
                    </p>
                </div>  
            </div>       
        </div>  
        );
    }

}

const mapStateToProps = state => {
     return {
       
    };
};

const mapDispatchToProps = dispatch => {
    return {
      
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
