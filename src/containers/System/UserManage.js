import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers, createNewUserService, 
    deleteUserService, editSummaryUserService} from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import {emitter} from '../../utils/emitter';

    /** Life cycle
     * Run component:
     - 1. Run constructor -> init state
     - 2. Did mount (only one time) -> set state: bornl unmount
     - 3. Render (re-render)
    */


class UserManage extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModaEditlUser: false,
            userEdit:{}
        }
    }

    //componentDidMount: load data at here
    async componentDidMount() {
        await this.getUsersFromReact();
    }

    getUsersFromReact = async() => {
        //let response = await getUsers('ALL');
        let response = await getAllUsers();
        if(response && response.errCode === 0){
            this.setState({
                arrUsers: response.users
            })
        }    
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })

    }

    handleDeleteUser = async(userId) => {
        try {
            //show confirm delete
            let res = await deleteUserService(userId);
            if(res && res.errCode !== 0){
                alert(res.message);
            }else{
                await this.getUsersFromReact();
            }

        } catch (e) {
            console.log(e);
        }

    }

    handleEditUser = async(user) => {
        console.log('user = ', user);
        this.setState({
            isOpenModaEditlUser: true,
            userEdit: user
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleUseEditModal = () => {
        this.setState({
            isOpenModaEditlUser: !this.state.isOpenModaEditlUser,
        })
    }

    createNewUser = async(data) => {
        try {
            let response = await createNewUserService(data);
            if(response && response.errCode !== 0){
                alert(response.message);
            }else {
                await this.getUsersFromReact();
                this.setState({
                    isOpenModalUser: false,
                });
                //example pass data to child:
                //emitter.emit('EVENT_CLEAR_MODAL_DATA', {isClearDataFromParent : this.state.isClearData});
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            } 
        } catch (e) {
            console.log(e);
        }
    }

    editUser = async(data) => {
        //console.log('data', data);
        try {
            let response = await editSummaryUserService(data);
            if(response && response.errCode !== 0){
                alert(response.message);
            }else {
                await this.getUsersFromReact();
                this.setState({
                    isOpenModaEditlUser: false,
                });
            } 
        } catch (e) {
            console.log(e);
        }
    }


    render() {
        let arrUsers = this.state.arrUsers;

        return (
            <div className="users-container">
                <ModalUser 
                    isOpenModalUserFromParent={this.state.isOpenModalUser} 
                    toggleUserModalFromParent = {this.toggleUserModal}
                    createNewUser = {this.createNewUser} 
                />
                {
                    //to componentDidMount's generated when click Edit button 
                    this.state.isOpenModaEditlUser &&
                    <ModalEditUser 
                    isOpenModalUserFromParent={this.state.isOpenModaEditlUser} 
                        toggleUserModalFromParent = {this.toggleUseEditModal}
                        currentUser={this.state.userEdit}
                        editUser = {this.editUser} 
                    />
                }
               
                <div className='title text-center'>Manage users</div>
                <div className='mx-1'> 
                    <button className='btn bg-platform px-3' 
                    onClick={ ()=>this.handleAddNewUser() }>
                        <i className="fas fa-plus-circle"></i> Add new
                    </button>
                </div>
                <div className='users-table mt-3 mx-1'>
                    <table id="users">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>Fist Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>           
                        {arrUsers && arrUsers.map((item, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit' onClick={ () => this.handleEditUser(item)}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button className='btn-delete' onClick={ () => this.handleDeleteUser(item.id)}>
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        } 
                    </tbody>
                    </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
