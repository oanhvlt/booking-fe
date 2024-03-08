import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from "../../../store/actions";
import './UserRedux.scss';
// use image-lightbox
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; 
import TableManageUser from './TableManageUser';


class UserRedux extends Component {

    constructor(props){
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: '',
            isOpen: false,
            //data user
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',  
            role: '',
            position: '',
            avatar: '',
            //user'action
            action:'',
            userEditId: '',
        }
    }

    async componentDidMount () {
        //console.log('componentDidMount() run' );
        this.props.getGenderStart(); //~ this.props.dispatch(actions.fetchGenderStart());
        this.props.getPositionStart();
        this.props.getRoleStart(); 
    }

//componentDidUpdate: auto excute after render() excute
    //hiện tại (this: [3]) và quá khứ (prevProps : [])
    componentDidUpdate(prevProps, prevState, snapshot){
        //console.log('componentDidUpdate() run' );
        if(prevProps.genderRedux !== this.props.genderRedux){ //C2: (this.state.genderArr !== this.props.genderRedux)
            let dropdownList = this.props.genderRedux;
            this.setState({
                genderArr: dropdownList,
                //gender: dropdownList && dropdownList.length > 0 ? dropdownList[0].key : '',
            })
        }
        if(prevProps.positionRedux !== this.props.positionRedux){
            let dropdownList = this.props.positionRedux;
            this.setState({
                positionArr: dropdownList,  
                //position: dropdownList && dropdownList.length > 0 ? dropdownList[0].key : '',       
            })
        }
        if(prevProps.roleRedux !== this.props.roleRedux){
            let dropdownList = this.props.roleRedux;
            this.setState({
                roleArr: dropdownList,
                //role: dropdownList && dropdownList.length > 0 ? dropdownList[0].key : '',
            })
        }

        //reset form create new user after save new user
        if(prevProps.usersRedux !== this.props.usersRedux){
           this.reset();
        }
    }

    reset = () =>{
        this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: 'none',  
            role: 'none',
            position: 'none',
            avatar: '',
            action: CRUD_ACTIONS.CREATE,
            previewImgUrl: '',
        })
    }

    //save value to avatar
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                avatar: base64
            })  
        }
    }

    openPreviewImage = () => {
        if(!this.state.previewImgUrl) return;
        this.setState({
            isOpen: true
        })
    }

    //click save or update user button in form: use redux action
    handleSaveUser = async () => {
        let isValid = this.validateInput();
        if(!isValid) return;

        let {action} = this.state; // action = this.state.action
        if(action === CRUD_ACTIONS.CREATE){
            //fire redux action
            //await: đợi DB lưu xong new user mới do next step
            //this.props.createNewUser({
            await this.props.createNewUser({
                email: this.state.email,
                password:  this.state.password, // lưu hash pass vào DB
                firstName:  this.state.firstName,
                lastName: this.state.lastName,
                phoneNumber: this.state.phoneNumber,
                address: this.state.address,
                gender: this.state.gender,
                role: this.state.role,
                position: this.state.position,
                avatar: this.state.avatar
            })
        }else if (action === CRUD_ACTIONS.EDIT){
            //fire redux edit user
            await this.props.editUser({
                id: this.state.userEditId,
                email: this.state.email,
                firstName:  this.state.firstName,
                lastName: this.state.lastName,
                phoneNumber: this.state.phoneNumber,
                address: this.state.address,
                gender: this.state.gender,
                role: this.state.role,
                position: this.state.position,
                avatar: this.state.avatar
            })
        }
        
        
        // next step: get all user to show on table
        this.props.fetchAllUsersStart();
        //c2: dispatch fetchAllUsersStart in adminAction.js > createNewUser
    }

    validateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
        for(let i = 0; i < arrCheck.length; i++){
            if(!this.state[arrCheck[i]]){
                isValid = false;
                alert(`Missing required data: ${arrCheck[i]}`);
                break;
            }
        }
        return isValid;
    }

    onChangeInput = (event, keyName) => {
        let copyState = {...this.state}; //copy all attributes form state to copyState
        copyState[keyName] = event.target.value //copyState["email"] 
        this.setState({
            ...copyState
        })
    }

    //this function get user's info from TableManageUser.js
    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if(user.image){
            imageBase64 = new Buffer.from(user.image, 'base64').toString('binary');    
        }

        this.setState({
            email: user.email,
            password:  'HARDCODE', // lưu hash pass vào DB
            firstName:  user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            address: user.address,
            phoneNumber: user.phoneNumber,
            role: user.roleId,
            position: user.positionId,
            previewImgUrl: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
        })
    }

    render() {
        //console.log('render() run, ', 'check props from redux: ', this.props.genderRedux, 'check state: ', this.state);
        let gerders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.languageRedux;
        let isLoadingGender = this.props.isLoadingGenderRedux;

        let {email, password, firstName, lastName, phoneNumber, 
            address, gender, role, position} = this.state;
        
        return (
            <div className="user-redux-container" >
                <div className='title'>
                    <FormattedMessage id='manage-user.manage' />
                </div> 
                <div className='user-redux-body mt-5'>
                    <div className='row mt-3'>
                        <h4 className='col-12'>
                            {isLoadingGender === true ? 'Loading gender' : ''}
                        </h4> 
                    </div>
                    <div className='row mt-3'>
                        <div className='col-12'>
                            <h5><b><FormattedMessage id='manage-user.user-detail' /></b></h5>
                        </div>  
                    </div>
                    <div className='row mt-3'>
                        <div className='col-3'>
                            <div className='preview-img-container'>
                                <div className='preview-image'
                                style={{backgroundImage: `url(${this.state.previewImgUrl})`}} 
                                onClick={() => this.openPreviewImage()}>
                                </div>
                                <input id='previewImg' type = "file" hidden
                                onChange={(event) => this.handleOnchangeImage(event)}/> 
                                <label className='lbl-upload' htmlFor='previewImg'>
                                    <FormattedMessage id='manage-user.upload-avatar'/> <i className='fas fa-upload'></i>
                                </label> 
                                
                                {this.state.isOpen === true &&
                                    <Lightbox
                                        mainSrc={this.state.previewImgUrl}            
                                        onCloseRequest={() => this.setState({ isOpen: false })}
                                    />
                                }

                            </div>
                        </div>
                        <div className='col-9'>
                            <div className='row'>
                                <div className='col-6'>
                                    <label><FormattedMessage id='manage-user.email' /></label>
                                    <input className='form-control' type='email' value={email} 
                                    onChange={(event) => this.onChangeInput(event, 'email')}
                                    />
                                </div>
                                <div className='col-6'>
                                    <label><FormattedMessage id='manage-user.password' /></label>
                                    <input className='form-control' type='password' value={password} 
                                    onChange={(event) => this.onChangeInput(event, 'password')}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT}
                                    />
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-6'>
                                    <label><FormattedMessage id='manage-user.firstname' /></label>
                                    <input className='form-control' type='text' value={firstName} 
                                    onChange={(event) => this.onChangeInput(event, 'firstName')}/>
                                </div>
                                <div className='col-6'>
                                    <label><FormattedMessage id='manage-user.lastname' /></label>
                                    <input className='form-control' type='text' value={lastName} 
                                    onChange={(event) => this.onChangeInput(event, 'lastName')}/>
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-3'>
                                    <label><FormattedMessage id='manage-user.phonenumber' /></label>
                                    <input className='form-control' type='text' value={phoneNumber} 
                                    onChange={(event) => this.onChangeInput(event, 'phoneNumber')}/>
                                </div>
                                <div className='col-9'>
                                    <label><FormattedMessage id='manage-user.address' /></label>
                                    <input className='form-control' type='text' value={address} 
                                    onChange={(event) => this.onChangeInput(event, 'address')}/>
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-3'>
                                    <label><FormattedMessage id='manage-user.gender' /></label>
                                    <select className='form-control' value={gender}
                                    onChange={(event) => this.onChangeInput(event, 'gender')}>
                                        <option value={'none'}>Choose...</option>
                                        {gerders && gerders.length > 0 &&
                                            gerders.map((item, index) => {
                                                return(
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='manage-user.role' /></label>
                                    <select className='form-control'  value={role}
                                    onChange={(event) => this.onChangeInput(event, 'role')}>
                                        <option value={'none'}>Choose...</option>
                                        {roles && roles.length > 0 &&
                                            roles.map((item, index) => {
                                                return(
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='manage-user.position' /></label>
                                    <select className='form-control' value={position}
                                    onChange={(event) => this.onChangeInput(event, 'position')}>
                                        <option value={'none'}>Choose...</option>
                                        {positions && positions.length > 0 &&
                                            positions.map((item, index) => {
                                                return(
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>   
                            </div>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-12 mt-3'>
                            <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn bg-platform'} 
                            onClick={() => this.handleSaveUser()}>
                                {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id='manage-user.edit'/> : <FormattedMessage id='manage-user.save'/>}
                            </button>
                            <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn bg-platform'} 
                            onClick={() => this.reset()}>
                                {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id='manage-user.cancel'/> : <FormattedMessage id='manage-user.reset'/>}
                            </button>
                        </div>   
                    </div>
                  
                </div>
                {/* table manage user */}
                <TableManageUser 
                    handleEditUserFromParentKey={this.handleEditUserFromParent}
                    action = {this.state.action}
                />

            </div>
        )
    }

}

//map state của redux vào trong props của react
const mapStateToProps = state => {
    return {
        languageRedux: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGenderRedux: state.admin.isLoadingGender,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,  
        usersRedux: state.admin.users,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPostionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch (actions.createNewUser(data)),
        fetchAllUsersStart: () => dispatch(actions.fetchAllUsersStart()),
        editUser: (data) => dispatch(actions.editUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
