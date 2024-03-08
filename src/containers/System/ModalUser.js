// import { truncate } from 'lodash';
import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {emitter} from '../../utils/emitter';

class ModalUser extends Component {

    constructor(props){
        super(props); 
        this.state = {
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            address:'',
        }

        this.listenToEmitter();
    }

    listenToEmitter() {
        // example pass data from parent:
        // emitter.on('EVENT_CLEAR_MODAL_DATA', data => {
        //     console.log('isClearData: ', data); //isClearDataFromParent = true
        
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email:'',
                password:'',
                firstName:'',
                lastName:'',
                address:'',
            })
        });
    }

    componentDidMount() {
        console.log('mounting modal');
    }

    // componentWillUnmount() {
    //     window.removeEventListener('EVENT_CLEAR_MODAL_DATA', this.EVENT_CLEAR_MODAL_DATA.bind(this), false);
    // }


    toggle = () => {
        this.props.toggleUserModalFromParent();
    }

    handleOnChangeInput = (event, id) => {
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }) 
    }

    checkValidateInput = () =>{
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for(let i = 0; i < arrInput.length; i++){
            if(!this.state[arrInput[i]]){ //ex: this.state['email'] ~ this.state.email
                alert('Missing parameter: ' + arrInput[i]);
                return false;
            }
        } 
        return true;
    }

    handleAddNewUser = () => {
        if(this.checkValidateInput()){
            this.props.createNewUser(this.state);    
        } 
    }

    render() {
        //console.log(this.props.isOpen);
        //reactstrap https://reactstrap.github.io/?path=/docs/components-modal--modal
        return (
            <Modal isOpen={this.props.isOpenModalUserFromParent}   
                toggle={ ()=>{this.toggle()} }  
                className={"modal-user-container"} 
                size='lg' 
                centered
            >
                <ModalHeader toggle={ ()=>{this.toggle()} }>Create new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'> 
                        <div className='input-container '>
                            <label>Email</label>
                            <input type='text' onChange={ (event)=>{this.handleOnChangeInput(event, "email")} }
                                // value={this.state.email}
                            />
                        </div>
                        <div className='input-container '>
                            <label>Password</label>
                            <input type='password' onChange={ (event)=>{this.handleOnChangeInput(event, "password")} }
                                // value={this.state.password}
                            />
                        </div>
                        <div className='input-container '>
                            <label>First name</label>
                            <input type='text' onChange={ (event)=>{this.handleOnChangeInput(event, "firstName")} }
                                // value={this.state.firstName}
                            />
                        </div>
                        <div className='input-container '>
                            <label>Last name</label>
                            <input type='text' onChange={ (event)=>{this.handleOnChangeInput(event, "lastName")} }
                                //value={this.state.lastName}
                            />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type='text' onChange={ (event)=>{this.handleOnChangeInput(event, "address")} }
                                //value={this.state.address}
                            />
                        </div>    
                    </div> 
                </ModalBody>
                <ModalFooter>
                <Button className='bg-platform px-3' 
                    onClick={ ()=>{this.handleAddNewUser()} }>
                    Save
                </Button>{' '}
                <Button color="secondary" className='px-3' onClick={ ()=>{this.toggle()} }>
                    Close
                </Button>
                </ModalFooter>
            </Modal>
            
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);



