import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RemedyModal.scss';
// import { FormattedMessage } from 'react-intl';
// import { LANGUAGES } from '../../../utils';
//import {bookAppointmentService} from '../../../../services/userService';
//use modal
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import * as actions from '../../../store/actions';
import { CommonUtils } from '../../../utils';


class RemedyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: ''
        }
    }


    componentDidMount() {
        if(this.props.dataModal){
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.dataModal !== this.props.dataModal){
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    handleOnchange = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
               imgBase64: base64
            })  
        }
    }

    handleSendRemedy = () => {
        //console.log('check state:', this.state)
        this.props.sendRemedy(this.state);
    }
   
    render() {
       let {isOpenModal, closeModal} = this.props;
       let {email} = this.state;
        return ( 
            // doc: https://reactstrap.github.io/?path=/docs/components-modal--modal
            <Modal isOpen={isOpenModal}   
                className={"booking-container"} 
                size='lg' 
                centered
            >
                <ModalHeader toggle={closeModal}>Gửi hoá đơn thành công</ModalHeader>
                <ModalBody>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Email</label>
                            <input className='form-control' type='email' value={email}
                            onChange={(event)=>this.handleOnchange(event)}/>
                        </div>
                        <div className='col-6 form-group'>
                            <label>Chọn file đơn thuốc</label>
                            <input className='form-control-file' type='file'
                            onChange={(event)=> this.handleOnchangeImage(event)}/>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleSendRemedy()}>
                        Send
                    </Button>{' '}
                    <Button color="secondary" onClick={closeModal}>
                        Cancel
                    </Button>
                </ModalFooter>
           
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGender: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
