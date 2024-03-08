import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";

class HandBook extends Component {

    render() {
        // let settings = {
        //     dots: false,
        //     infinite: true,
        //     speed: 500,
        //     slidesToShow: 4, //số item show trên 1 frame
        //     slidesToScroll: 1, // số item lướt qua khi next/prev
        // };

        return (
            <div className='section-container section-handbook'>
                <div className='section-header'>
                    <span className='section-title'>Cẩm nang</span>
                    <button className='section-btn'>Xem thêm</button>
                </div>
                <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-item'>
                                <div className='item-custom'>
                                    <div className='item-img item-img-handbook'></div>
                                    <div className='item-text'>Chi phí điều trị viêm nang lông tại địa chỉ uy tín ở TP.HCM</div>
                                </div>
                            </div>   
                            <div className='section-item'>
                                <div className='item-custom'>
                                   
                                    <div className='item-img item-img-handbook'></div>
                                    <div className='item-text'>Cẩm nang </div>
                                </div>
                            </div> 
                            <div className='section-item'>
                                <div className='item-custom'>
                                    
                                    <div className='item-img item-img-handbook'></div>
                                    <div className='item-text'>Cẩm nang </div>
                                </div>
                            </div> 
                            <div className='section-item'>
                                <div className='item-custom'>
                                  
                                    <div className='item-img item-img-handbook'></div>
                                    <div className='item-text'>Cẩm nang </div>
                                </div>
                            </div> 
                            <div className='section-item'>
                                <div className='item-custom'>
                                  
                                    <div className='item-img item-img-handbook'></div>
                                    <div className='item-text'>Cẩm nang </div>
                                </div>
                            </div> 
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
