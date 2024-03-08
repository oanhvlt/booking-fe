import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../HomePage/HomePage.scss';
import './DoctorSchedule.scss';
import moment from 'moment';
import 'moment/locale/vi'; //tự động dịch sang file vi làm mặc định
import {getScheduleByDateService} from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
           allDays: [],
           allAvailableTime: [],
           isOpenModalBooking: false,
           dataScheduleTimeModal: {}
        }
    }

    capitalizeFirstLetter (str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    getArrDays = (language) => {
        let arrDays = []
        //add(i, 'days'): tăng lên i ngày
        for (let i = 0; i < 7; i++){
            let obj = {};
            let label ='';
            if(language === LANGUAGES.VI){
                if(i === 0){
                    let dateToday = moment(new Date()).add(i, 'days').format('DD/MM');
                    label = `Hôm nay - ${dateToday}`;
                }else{
                    label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                }
                obj.label = this.capitalizeFirstLetter(label);
                
            }else{
                if(i === 0){
                    let dateToday = moment(new Date()).add(i, 'days').format('DD/MM');
                    label = `Today - ${dateToday}`;
                }else{
                    label =  moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
                obj.label =  label;
            }
            obj.value =  moment(new Date()).add(i, 'days').startOf('day').valueOf(); //startOf('day'): 0h:0m:0s
            arrDays.push(obj);
        }
        return arrDays;
    }

    async componentDidMount() {
        let arrDays = this.getArrDays(this.props.language);
        this.setState({
            allDays: arrDays,
        })
        
        if(this.props.doctorIdFromParent){
            let res = await getScheduleByDateService(this.props.doctorIdFromParent, arrDays[0].value);
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
        
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.language !== this.props.language){
            let arrDays = this.getArrDays(this.props.language);
            this.setState({
                allDays: arrDays
            })
        }   
        if(prevProps.doctorIdFromParent !== this.props.doctorIdFromParent){
            let arrDays = this.getArrDays(this.props.language);
            let res = await getScheduleByDateService(this.props.doctorIdFromParent, arrDays[0].value);
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
    }

    handleOnchangeSelect = async (e) => {
        if(this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1){
            let doctorId = this.props.doctorIdFromParent;
            let date = e.target.value;
            let res = await getScheduleByDateService(doctorId, date);
            if(res && res.errCode === 0){
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
        }
       
    }

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time,

        })
        //console.log('check time: ', time);
    }
   
    closeModalBooking = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }

    render() {
        //console.log('check state doctor schedule: ', this.state)
        let {allDays, allAvailableTime, isOpenModalBooking, dataScheduleTimeModal} = this.state;
        let {language} = this.props;
        return ( 
            <>
                 <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                    <select onChange={(event) => this.handleOnchangeSelect(event)}>
                        {allDays && allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return(
                                    <option value={item.value} key={index}>
                                        {item.label}
                                    </option>
                                ) 
                            })
                        }
                    </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calender'>
                            <span><i className='fas fa-calendar-alt'/> 
                                <FormattedMessage id='patient.doctor-details.schedule' />
                            </span>
                        </div>
                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                            <>
                                <div className='time-content-btn'>
                                {
                                    allAvailableTime.map((item, index) => {
                                        let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                        return(
                                            <button key={index}
                                            className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
                                            onClick={() => this.handleClickScheduleTime(item)}>
                                                {timeDisplay}
                                            </button>
                                        )
                                    })
                                }
                                </div>
                                <div className='book-free'>
                                    <span>Chọn <i className='far fa-hand-point-up'/> và đặt (miễn phí)</span>
                                </div>
                            </>
                                :
                                <div>Bác sĩ không có lịch trống trong ngày này, 
                                    vui lòng chọn ngày khác.
                                </div>
                            }
                        
                        </div>
                    </div>
                </div>
                <BookingModal isOpenModal = {isOpenModalBooking} 
                closeModalBooking = {this.closeModalBooking} 
                dataTime = {dataScheduleTimeModal} />
            </>
           
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
