const React = require('react');

class ErrorInputMessage extends React.Component{

  constructor(props){

    super(props);
  }

  render(){

    if(this.props.message === ""){
      return null;
    }
    return(

      <p className="customErrorMessage">{this.props.message}</p>
    )
  }

}

ErrorInputMessage.PropTypes = {

  message: React.PropTypes.string.isRequired

}

module.exports = ErrorInputMessage;
