import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
// import { FormattedMessage } from 'react-intl';
import {handleLoginApi} from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = async() =>{
        //clear message on UI before login
        this.setState({
            errMessage:''
        })

        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if(data && data.errCode !== 0){
                this.setState({
                    errMessage: data.message
                })
            }else if(data && data.errCode === 0){
                this.props.userLoginSuccess(data.user);
                console.log('Login success!');
            }
            //log data response from api /api/login from server
            //console.log('hdit:', data);

        } catch (e) {
           if(e.response){
                if(e.response.data){
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
           }
           console.log("hdit ", e.response);
        }
    }

    handleShowHidePasswoid = () =>{
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        })

    }

    handleKeyDownLogin = (event) =>{
        if(event.keyCode === 13) { //~ event.key === 'Enter'
            this.handleLogin();
        }
    }

    render(){
        //JSX

        return(
           <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 login-text '>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input type='text' className='form-control' 
                            onChange={(event) => this.handleOnChangeUsername(event)}
                            onKeyDown={(event) => this.handleKeyDownLogin(event)}
                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'} className='form-control' 
                                onChange={(event) => this.handleOnChangePassword(event)}
                                onKeyDown={(event) => this.handleKeyDownLogin(event)}
                                />
                                <span onClick={() => this.handleShowHidePasswoid()}>
                                    <i className={this.state.isShowPassword ? "far fa-eye" : "far fa-eye-slash"} ></i>
                                </span>                            
                            </div>
                            
                        </div>
                        <div className='col-12' style={{color:'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' 
                            onClick={() => this.handleLogin()}>Log In</button>
                        </div>
                        
                        <div className='col-12 forgot-password'>
                            <span>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login'>Or Login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
           </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        // processLogout: () => dispatch(actions.processLogout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
