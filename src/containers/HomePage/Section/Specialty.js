import React, { Component } from 'react';
import { connect } from 'react-redux';
// Import css files carousel
import Slider from "react-slick";
import { getAllSpecialtiesService } from '../../../services/userService';
//use history.push: directly to a router
import { withRouter } from 'react-router';

class Specialty extends Component {

    constructor(props){
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount(){
        let res = await getAllSpecialtiesService();
        if(res && res.errCode === 0){
            this.setState({
                dataSpecialty: res.data ? res.data : ''
            })
        }
    }

    handleViewDetails = (item) => {
        //use property 'history.push' to get details page
        if(this.props.history){
            this.props.history.push(`specialty-details/${item.id}`);
        }
       
    }

    render() {     
        let {dataSpecialty} = this.state;
        return (
        <div className='section-container section-specialty'>
            <div className='section-header'>
                <span className='section-title'>Chuyên khoa phổ biến</span>
                <button className='section-btn'>Xem thêm</button>
            </div>
            <div className='section-body'>
                    <Slider {...this.props.settings}>
                        {dataSpecialty && dataSpecialty.length > 0 &&
                            dataSpecialty.map((item, index) => {
                                return (
                                    <div className='section-item' key={index}
                                    onClick={() => this.handleViewDetails(item)}>
                                    <div className='item-custom'>
                                        <div className='item-img item-img-specialty'
                                        style={{backgroundImage: `url(${item.image})`}} >

                                        </div>
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

const mapStateToProps = state => {
     return {
       
    };
};

const mapDispatchToProps = dispatch => {
    return {
      
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
