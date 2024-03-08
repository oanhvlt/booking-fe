import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeMenu from '../HomePage/HomeHeader/HomeMenu';
import '../HomePage/HomePage.scss';
// import { FormattedMessage } from 'react-intl';
// import { LANGUAGES } from '../../../utils';
import './VerifyEmail.scss';
import {verifyBookAppointmentService} from '../../services/userService';


class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidMount() {
        //console.log('this.props: ', this.props);
        if(this.props.location && this.props.location.search){
            const urlParams = new URLSearchParams(this.props.location.search);
            const token = urlParams.get('token');
            const doctorId = urlParams.get('doctorId');
            let res = await verifyBookAppointmentService({ token, doctorId });
            if(res && (res.errCode === 0 || res.errCode === 2)){
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode,
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.language !== this.props.language){
           
        }   
       
    }

    render() {
        let {statusVerify, errCode} = this.state;
        console.log('check state: ', this.state)
        return ( 
            <div className='container-page'>
                <HomeMenu />
                <div className='verify-email-container'>
                {statusVerify === false ?
                    <div>Loading data ...</div> : 
                    <div>
                        {   errCode === 0? 
                            <p className='info-booking'>Lịch hẹn đã được xác nhận thành công!</p> :
                            <p className='info-booking'>Lịch hẹn đã được xác nhận hoặc không tồn tại!</p>
                        }                    
                    </div>
                }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
