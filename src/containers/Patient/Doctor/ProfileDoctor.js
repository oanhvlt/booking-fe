import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import './ProfileDoctor.scss';
import {getProfileDoctorByIdService} from '../../../services/userService';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/vi'; //tự động dịch sang file vi làm mặc định
import {Link} from 'react-router-dom';

class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        }
    }


    async componentDidMount() {
        let data = await this.getInfoDoctor(this.props.doctorIdFromParent);
        this.setState({
            dataProfile: data
        })
    }

    getInfoDoctor = async (id) => {
        let result = {};
        if(id) {
            let res = await getProfileDoctorByIdService(id);
            if(res && res.errCode === 0){
                result = res.data;
            }
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.language !== this.props.language){
           
        }  
        if(prevProps.doctorIdFromParent !== this.props.doctorIdFromParent){
            let data = await this.getInfoDoctor(this.props.doctorIdFromParent);
            this.setState({
                dataProfile: data
            })
        }   
       
    }

    renderTimeBooking = (dataTime) => {
        let {language} = this.props;
        if(dataTime && !_.isEmpty(dataTime)){
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            //convert string to date in js // +dataTime.date: convert string to number
            let date = language === LANGUAGES.VI ? 
            moment.unix(+dataTime.date/1000).format('dddd - DD/MM/YYYY')
            : moment.unix(+dataTime.date/1000).locale('en').format('ddd - MM/DD/YYYY');

            return(
                <>
                    <div>{time} - {date}</div>
                    <div>Miễn phí đặt lịch</div>
                </>
            )
        }
       
    }

    render() {
        let {dataProfile} = this.state;
        let {language, isShowDescriptionDoctor, dataTime, 
            isShowLinkDetails, isShowPrice, doctorIdFromParent} = this.props;
        let nameVi = '', nameEn = '';
        if(dataProfile && dataProfile.positionData){
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        //console.log('check state: ', this.state)
        return ( 
            <div className='profile-doctor-container'>
                <div className='intro'>
                    <div className='content-left'>
                        <div className='doctor-image'
                        style={{backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image: ''})`}} 
                        />  
                        {isShowLinkDetails === true &&
                           <Link className='link-details' to = {`/doctor-details/${doctorIdFromParent}`}>Xem thêm</Link>
                        }
                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {isShowDescriptionDoctor === true ?
                                <>
                                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description
                                        && 
                                        <span>
                                            {dataProfile.Markdown.description}
                                        </span>
                                    }
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataTime)}
                                 </>
                            }
                        
                        </div>
                    </div>
                </div>
                {isShowPrice === true &&
                    <div className='price'>
                        Giá khám:
                        {dataProfile && dataProfile.Doctor_Info && language === LANGUAGES.VI ?
                            <NumberFormat value={dataProfile.Doctor_Info.priceData.valueVi} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                suffix={'VNĐ.'} 
                                className='currency'/> 
                            : ''
                        }
                        {dataProfile && dataProfile.Doctor_Info && language === LANGUAGES.EN ?
                            
                            <NumberFormat value={dataProfile.Doctor_Info.priceData.valueEn} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                suffix={'USD.'} 
                                className='currency'/> 
                            : ''
                        }
                    </div>
                }
               
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
