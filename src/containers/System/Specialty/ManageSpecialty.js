import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSpecialty.scss';
// import { FormattedMessage } from 'react-intl';
// import { LANGUAGES } from '../../../utils';
import {saveSpecialtytService} from '../../../services/userService';
//use Markdown
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import {toast} from 'react-toastify';
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            contentMarkdown: '',
            contentHTML: '',
        }
    }


    async componentDidMount() {
       
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.language !== this.props.language){
           
        }   
       
    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = {...this.state};
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({text, html}) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })  
        }
    }

    handleSaveSpecialty = async () => {
        //console.log('check state: ', this.state)
        let res = await saveSpecialtytService(this.state);
        if(res && res.errCode === 0){
            toast.success('Save cussceed!');
            this.setState({
                name: '',
                imageBase64: '',
                contentMarkdown: '',
                contentHTML: '',
            })
        }else{
            toast.error('Save error!');
            console.log('check Error: ',res)
        }
    }

    render() {
        
        let {name, contentMarkdown} = this.state

        return ( 
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quản lý chuyên khoa</div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên chuyên khoa</label>
                        <input className='form-control' type='text' value={name}
                        onChange={(event) => this.handleOnChangeInput(event,'name')}/>
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh chuyên khoa</label>
                        <input className='form-control-file' type='file'
                        onChange={(event) => this.handleOnchangeImage(event)}/>
                    </div>
                    <div className='col-12'>
                        <MdEditor style={{ height: '300px' }} renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange} 
                        value={contentMarkdown} 
                        />
                    </div>
                    <div className='col-12 '>
                        <button className='btn bg-platform' 
                        onClick={()=>this.handleSaveSpecialty()}
                        >
                            Lưu thông tin
                        </button>
                    </div>
                </div>
              
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
