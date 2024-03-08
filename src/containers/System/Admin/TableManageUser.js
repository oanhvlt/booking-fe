import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
        }
    }

    componentDidMount(){
        this.props.fetchAllUsersStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.usersRedux !== this.props.usersRedux){
            this.setState({
                users: this.props.usersRedux,
            })
        } 
    }

    handleDeleteUser = async (user) => {
        await this.props.deleteUser(user.id);
        this.props.fetchAllUsersStart();
    }

    handleEditUser =  (user) => {
        //truyền data form TableManageUser.js (child) to UserRedux.js (parent)
        this.props.handleEditUserFromParentKey(user);
    }

    render() {
        //console.log('check all user: ', this.props.usersRedux, ' - check state: ', this.state);

        let arrUsers = this.state.users;
        return (
        <>
           
            <div className="users-container mt-4 mb-5">
                <div className='users-table'>
                    <table id='users'>
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>Fist Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>  
                        {arrUsers && arrUsers.length > 0 &&
                            arrUsers.map((item, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td className='td-actions'>
                                            <button className='btn-edit' onClick={() => this.handleEditUser(item)}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}>
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
           
            <MdEditor style={{ height: '500px' }} 
            renderHTML={text => mdParser.render(text)} 
            onChange={handleEditorChange} />
            <div className='mb-5'></div>
        </>
         
        );
    }

}

const mapStateToProps = state => {
    return {
        usersRedux: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsersStart: () => dispatch(actions.fetchAllUsersStart()),
        deleteUser: (id) => dispatch(actions.deleteUser(id)),
        
    };
};

//đưa mapStateToProps và mapDispatchToProps vào bên trong component
export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
