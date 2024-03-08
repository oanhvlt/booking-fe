import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../HomePage/HomePage.scss';
import './DoctorExtraInfo.scss';
import {getExtraInfoDoctorByIdService} from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
//import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';



class DoctorExtraInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfo: false,
            extraInfo: {}
        }
    }


    async componentDidMount() {
        if(this.props.doctorIdFromParent){
            let res = await getExtraInfoDoctorByIdService(this.props.doctorIdFromParent);
            if(res && res.errCode === 0)
           
            this.setState({
                extraInfo: res.data
            })
        }
       
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.language !== this.props.language){
           
        }  
        if(prevProps.doctorIdFromParent !== this.props.doctorIdFromParent){
            let res = await getExtraInfoDoctorByIdService(this.props.doctorIdFromParent);
            if(res && res.errCode === 0)
           
            this.setState({
                extraInfo: res.data
            })
        }     
    }

    showHideDetailInfo = (status) => {
        this.setState({
            isShowDetailInfo: status
        })
    }
    
   
    render() {
        let {language} = this.props;
        let {isShowDetailInfo, extraInfo} = this.state;
        //console.log('check state: ', this.state)
        return ( 
            <div className='doctor-extra-info-container'>
                <div className='content-up'>
                    <div className='text-address'>ĐỊA CHỈ KHÁM</div>
                    <div className='name-clinic'>
                        {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}
                    </div>
                    <div className='address-details'>
                    {extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}
                    </div>
                </div>
                <div className='content-down'>
                
                    {isShowDetailInfo === false && 
                        <div className='short-info'>
                            GIÁ KHÁM: 
                            {extraInfo && extraInfo.priceData  && language === LANGUAGES.VI
                                &&
                                <NumberFormat value={extraInfo.priceData.valueVi} 
                                    displayType={'text'} 
                                    thousandSeparator={true} 
                                    suffix={'VNĐ.'} 
                                    className='currency'/> 
                            }
                            {extraInfo && extraInfo.priceData  && language === LANGUAGES.EN
                                &&
                                <NumberFormat value={extraInfo.priceData.valueEn} 
                                    displayType={'text'} 
                                    thousandSeparator={true} 
                                    suffix={'USD.'} 
                                    className='currency'/> 
                            }
                            
                            <span className='details' onClick={() => this.showHideDetailInfo(true)}>
                                Xem chi tiết
                            </span>
                        </div>
                    }
                    {isShowDetailInfo === true && 
                        <>
                            <div className='title-price'>GIÁ KHÁM:</div>
                            <div className='detail-info'>
                                <div className='price'>
                                    <span className='left'>Giá khám:</span>
                                    <span className='right'>
                                        {extraInfo && extraInfo.priceData  && language === LANGUAGES.VI
                                            &&
                                            <NumberFormat value={extraInfo.priceData.valueVi} 
                                                displayType={'text'} 
                                                thousandSeparator={true} 
                                                suffix={'VNĐ.'} 
                                                className='currency'/> 
                                        }
                                        {extraInfo && extraInfo.priceData  && language === LANGUAGES.EN
                                            &&
                                            <NumberFormat value={extraInfo.priceData.valueEn} 
                                                displayType={'text'} 
                                                thousandSeparator={true} 
                                                suffix={'USD.'} 
                                                className='currency'/> 
                                        }
                                    </span>
                                </div> 
                                <div className='note'>
                                {extraInfo && extraInfo.note ? extraInfo.note : ''}
                                </div>
                            </div>
                            <div className='payment'>
                                Phòng khám có hình thức thanh toán chi phí bằng:
                                {extraInfo && extraInfo.paymentData && language === LANGUAGES.VI 
                                    ? extraInfo.paymentData.valueVi : ''}
                                {extraInfo && extraInfo.paymentData && language === LANGUAGES.EN
                                    ? extraInfo.paymentData.valueEn : ''}
                            </div>
                            <div className='hide-price'>
                                <span onClick={() => this.showHideDetailInfo(false)}>
                                    Ân bảng giá
                                </span>
                            </div>

                        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
