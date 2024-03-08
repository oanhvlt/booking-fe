import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomeFooter extends Component {

    render() {     
     
        return (
        <div className='home-footer'>
            <p>
                &copy; 2023 TED Digital Web Page. More information, please visit our youtube channel.
                <a target='_blank' rel="noreferrer" href='https://www.w3schools.com/html/html_symbols.asp'> 
                    &#8594; Click here &#8592;
                </a>
            </p>        
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
