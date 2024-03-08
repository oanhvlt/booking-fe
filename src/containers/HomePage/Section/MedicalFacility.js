import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import {getAllClinicsService} from '../../../services/userService';
//use history.push: directly to a router
import { withRouter } from 'react-router';

class MedicalFacility extends Component {

    constructor(props){
        super(props);
        this.state = {
            dataClinics:[],
        }
    }

    async componentDidMount(){
        let res = await getAllClinicsService();
        if(res && res.errCode === 0){
            this.setState({
                dataClinics: res.data ? res.data : []
            })
        }
    }

    handleViewDetails = (item) => {
        //use property 'history.push' to get details page
        if(this.props.history){
            this.props.history.push(`/clinic-details/${item.id}`);
        }
       
    }

    render() {
        let {dataClinics} = this.state;
        return (
            <div className='section-container section-medical'>
                <div className='section-header'>
                    <span className='section-title'>Cơ sở y tế</span>
                    <button className='section-btn'>Xem thêm</button>
                </div>
                <div className='section-body'>
                        <Slider {...this.props.settings}>
                        {dataClinics && dataClinics.length > 0 &&
                            dataClinics.map((item, index) => {
                                console.log('item.image: ', item.image)
                                return (
                                    <div className='section-item' key={index}
                                        onClick={() => this.handleViewDetails(item)}>
                                       <div className='item-custom'>
                                           <div className='item-img item-img-medical'
                                           style={{backgroundImage: `url(${item.image})`}} ></div>
                                           <div className='item-text'>{item.name}</div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
