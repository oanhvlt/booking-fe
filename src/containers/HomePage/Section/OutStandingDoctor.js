import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
//use history.push: directly to a router
import { withRouter } from 'react-router';

class OutStandingDoctor extends Component {
 
    constructor(props){
        super(props);
        this.state = {
            arrDoctors: [],
        }
    }

    componentDidMount(){
        this.props.loadTopDoctors();
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.topDoctorsRedux !== this.props.topDoctorsRedux){ 
            this.setState({
                arrDoctors: this.props.topDoctorsRedux,
            })
        }
    }

    handleViewDoctorDetails = (doctor) => {
        //use property 'history.push' to get details page
        if(this.props.history){
            this.props.history.push(`doctor-details/${doctor.id}`);
        }
       
    }

    render() {
        //console.log('check topDoctorsRedux: ', this.props.topDoctorsRedux)
        let arrDoctors = this.state.arrDoctors;
        let language = this.props.languageRedux;

        return (
        <div className='section-container section-outstanding-doctor'>
            <div className='section-header'>
                <span className='section-title'>Bác sĩ nổi bật tuần qua</span>
                <button className='section-btn'>Xem thêm</button>
            </div>
            <div className='section-body'>
                    <Slider {...this.props.settings}>
                        {arrDoctors && arrDoctors.length &&
                            arrDoctors.map((item, index) => {
                                let imageBase64 = '';
                                if(item.image){
                                    imageBase64 = new Buffer.from(item.image, 'base64').toString('binary');
                                }
                                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                return (
                                    <div className='section-item' key={index} onClick={() => this.handleViewDoctorDetails(item)}>
                                        <div className='item-custom'>
                                            <div className='item-img item-img-outstanding-doctor'
                                                style={{backgroundImage: `url(${imageBase64})`}} 
                                            />
                                            <div className='position text-center'>
                                                <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                <div>Nam học</div>
                                            </div>
                                        </div>
                                    </div> 
                                )
                            })
                        }
                    </Slider>
            </div>               
        </div> 
        );
    }

}

//redux

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,
        languageRedux: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctors()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
