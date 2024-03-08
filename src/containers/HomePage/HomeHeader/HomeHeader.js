import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeMenu from './HomeMenu';
import HomeBanner from './HomeBanner';

class HomeHeader extends Component {

    render() {
     
        return (
        <>
            <HomeMenu/>
            <HomeBanner/>
        </>
        );
    }

}

//redux: chạy song song với react, đóng vai trò bộ nhớ (store), khi nào cần dùng thì goi
//store redux: isLoggedIn, language
//mapStateToProps: lấy value từ redux store gán cho biến lưu trữ trong component (isLoggedIn, language) 
//component sẽ gọi stat, function thông qua props, 
//ex: this.props.language, this.props.changeLanguageAppRedux

const mapStateToProps = state => {
    return {
       
    };
};

const mapDispatchToProps = dispatch => {
    return {
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
