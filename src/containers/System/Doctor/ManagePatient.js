import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
// import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import {getListPatientForDoctorService, sendRemedyService} from '../../../services/userService';
import moment from 'moment';
import RemedyModal from './RemedyModal';
import {toast} from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';


class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal:{},
            isShowLoading: false,
        }
    }


    async componentDidMount() {
        this.getDataPatient();
    }

    getDataPatient = async() => {
        let {user} = this.props;
        let {currentDate} = this.state;
        let formatedDate = new Date(currentDate).getTime();
        let res = await getListPatientForDoctorService({
            doctorId: user.id,
            date: formatedDate
        })
        if(res && res.errCode === 0){
            this.setState({
                dataPatient: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.language !== this.props.language){
           
        }   
       
    }

    handleOnchangeDatePicker = (date) =>{
        this.setState({
            currentDate: date[0],
        }, async () => {
            await this.getDataPatient();
        })
    }
    
    handleConfirm = (item) => {
        //console.log('check item: ', item)
        let data ={
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,

        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
        })
    }

    sendRemedy = async (dataFromChild) =>{
        this.setState({
            isShowLoading: true
        })
        let {dataModal} = this.state;

        let res = await sendRemedyService ({
            //...dataFromChild, // email, imgBase64 from RemedyModal.js
            email: dataFromChild.email,
            imgBase64: dataFromChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName,
        })
        if(res && res.errCode === 0){
            toast.success('Send remedy succeed!');
            this.closeRemedyModal();
            await this.getDataPatient();
            this.setState({
                isShowLoading: false
            })
        }else{
            this.setState({
                isShowLoading: false
            })
            toast.error('Send remedy failed!');
            console.log('Error send remedy:', res)
        }
    }

    render() {
        //console.log('check state: ', this.state)
        let {language} = this.props;
        let {currentDate, dataPatient, isOpenRemedyModal, dataModal, isShowLoading} = this.state;
        
        return ( 
        <>  
            <LoadingOverlay 
                active={isShowLoading}
                spinner
                text='Loading...'
            >
                <RemedyModal isOpenModal = {isOpenRemedyModal}
                    dataModal = {dataModal}
                    closeModal = {this.closeRemedyModal}
                    sendRemedy = {this.sendRemedy}
                />
            </LoadingOverlay>
            <div className='manage-patient-container'>
                <div className='mp-title'>
                    Quản lý bệnh nhân
                </div>
                <div className='row'>
                    <div className='col-4 form-group'>
                        <label>Chọn ngày khám</label>
                        <DatePicker className='form-control'
                            onChange = {this.handleOnchangeDatePicker} value={currentDate}
                        />
                    </div>
                    <div className='col-12 patients-table'>
                        <table id='patients'>
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th>Thời gian</th>
                                <th>Họ tên</th>
                                <th>Email</th>
                                <th>Giới tính</th>
                                <th>Actions</th>
                            </tr>  
                            {dataPatient && dataPatient.length > 0 ?
                                dataPatient.map((item, index) => {
                                    let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;
                                    let time = language === LANGUAGES.VI ? item.timeTypeBooking.valueVi : item.timeTypeBooking.valueEn;
                                    return(
                                        <tr key={index}>
                                            <td>{index+1}</td>         
                                            <td>{time}</td>   
                                            <td>{item.patientData.firstName}</td>   
                                            <td>{item.patientData.email}</td> 
                                            <td>{gender}</td>     
                                            <td className='td-actions'>
                                                <button className='btn-confirm' 
                                                onClick={() => this.handleConfirm(item)}
                                                >
                                                Xác nhận
                                                </button>
                                    
                                            </td>       
                                        </tr>
                                    )
                                })
                                :
                                <tr><td colSpan={'6'}>No Data</td></tr>
                            
                            }
                            
                        
                        </tbody>
                        </table> 
                    </div>
                </div> 
            </div>
        </>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
