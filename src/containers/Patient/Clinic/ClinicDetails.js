//ClinicDetails
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
// import { LANGUAGES } from '../../../utils';
import './ClinicDetails.scss';
import HomeMenu from '../../HomePage/HomeHeader/HomeMenu';
import '../../HomePage/HomePage.scss';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import {getClinicDetailsByIdService} from '../../../services/userService';
import  _ from 'lodash';

class ClinicDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId:[],
            dataClinic:{}
        }
    }


    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            let res = await getClinicDetailsByIdService({id});
          
            if(res && res.errCode === 0){
                let data = res.data;
                let arrDoctorId = [];
                if(data && !_.isEmpty(data)){
                    let arr = data.doctorClinic;
                    if(arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                            return item;
                        })
                    }
                }
                this.setState({
                    dataClinic: res.data,
                    arrDoctorId: arrDoctorId,
                  
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.language !== this.props.language){
           
        }   
       
    }

    render() {
        //console.log('check state:', this.state)
        let {arrDoctorId, dataClinic} = this.state;
        let {language} = this.props;
        return ( 
            <div className='container-page'>
                <HomeMenu />
                <div className='clinic-details-container'>
                    <div className='description'>
                        {dataClinic && !_.isEmpty(dataClinic) &&
                            <>
                                <div className='name-clinic'>{dataClinic.name}</div>
                                <div dangerouslySetInnerHTML={{__html: dataClinic.contentHTML}}
                                />
                            </>
                          
                        }
                    </div>
               
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            console.log('item: ', item)
                            return(
                                <div className='eachDotor' key={index} >
                                    <div className='dt-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                            doctorIdFromParent = {item}
                                            isShowDescriptionDoctor = {true}
                                            isShowLinkDetails = {true}
                                            isShowPrice = {false}
                                            />
                                        </div>
                                    </div>
                                    <div className='dt-content-right'>
                                        <div className='schedule'>
                                            <DoctorSchedule doctorIdFromParent= {item}/>
                                        </div>
                                        <div className='extra-info'>
                                            <DoctorExtraInfo doctorIdFromParent= {item}/>
                                        </div>
                                    </div>
                                </div>
                                
                            )
                        })
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

export default connect(mapStateToProps, mapDispatchToProps)(ClinicDetails);


