const React = require('react');

const ErrorInputMessage = require('./error-input-message');

class ContactForm extends React.Component{

  constructor(props){
    super(props);

    this.newObject = {}
    this.tempObject = {}

    Object.assign(this.newObject, props.newContact , {hasError:{email: {error:false , message: ""}, subject: {error:false , message: ""}, message: {error:false , message: ""}}})
    Object.assign(this.tempObject, props.newContact)

    this.state = this.newObject;

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  onSubmit(e){
    e.preventDefault();

    if(!this.registerHasError()){

      this.props.onNewSubmit(this.state);

    }

    //this.setState(this.newObject);
  }

  onChange(e, which){

    let obj = {};
    obj[which] = e.target.value;
    this.setState(obj);
    Object.assign(this.tempObject, obj);

    switch (which){
      case 'email':
        this.emailHasError();
      break;
      case 'subject':
        this.subjectHasError()
      break;
      case 'message':
        this.messageHasError()
      break;

    }


  }

  registerHasError(){

    if(this.state.hasError.email.error || this.state.hasError.subject.error || this.state.hasError.message.error){
      return true;
    }

    return false;

  }

  emailHasError(){

    if(!this.isEmail(this.tempObject.email) && this.tempObject.email.length > 0){


      this.setState((prevState, props)=>{

        let hasError = {}
        let obj = {}
        Object.assign(hasError, prevState.hasError, {email:{error: true, message: "El email introducido no es valido"}});
        Object.assign(obj, prevState, {hasError: hasError});
        return obj;
      });


    }else if(this.tempObject.email.length > 32){

      this.setState((prevState, props)=>{

        let hasError = {}
        let obj = {}
        Object.assign(hasError, prevState.hasError, {email:{error: true, message: "El email introducido es demasiado largo"}});
        Object.assign(obj, prevState, {hasError: hasError});
        return obj;
      });


    }else{

      this.setState((prevState, props)=>{
        let hasError = {}
        let obj = {}
        Object.assign(hasError, prevState.hasError, {email:{error: false, message: ""}});
        Object.assign(obj, prevState, {hasError: hasError});
        return obj;
      });

    }


  }

  subjectHasError(){

    if(this.tempObject.subject.length > 64){

      this.setState((prevState, props)=>{

        let hasError = {}
        let obj = {}
        Object.assign(hasError, prevState.hasError, {subject:{error: true, message: "El asunto introducido es demasiado largo"}});
        Object.assign(obj, prevState, {hasError: hasError});
        return obj;
      });

    }else{

      this.setState((prevState, props)=>{
        let hasError = {}
        let obj = {}
        Object.assign(hasError, prevState.hasError, {subject:{error: false, message: ""}});
        Object.assign(obj, prevState, {hasError: hasError});
        return obj;

      });

    }
  }

  messageHasError(){

    if(this.tempObject.message.length > 512){

      this.setState((prevState, props)=>{

        let hasError = {}
        let obj = {}
        Object.assign(hasError, prevState.hasError, {message:{error: true, message: "El apellido introducido es demasiado largo"}});
        Object.assign(obj, prevState, {hasError: hasError});
        return obj;
      });

    }else{

      this.setState((prevState, props)=>{
        let hasError = {}
        let obj = {}
        Object.assign(hasError, prevState.hasError, {message:{error: false, message: ""}});
        Object.assign(obj, prevState, {hasError: hasError});
        return obj;
      });

    }
  }


  isEmail(email) {

      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email);
  }


  render(){

    let emailErrorMessage = null;
    let subjectErrorMessage = null;
    let messageErrorMessage = null;

    let email = <input type="email" className="form-control custom" placeholder="Email" value={this.state.email} onChange={e => {this.onChange(e, 'email')}} required/>
    let subject =  <input type="text" className="form-control custom" placeholder="Asunto" value={this.state.subject} onChange={e => {this.onChange(e, 'subject')}} required/>
    let message = <textarea className="form-control custom" placeholder="Mensaje" value={this.state.message} onChange={e => {this.onChange(e, 'message')}} required/>

    if(this.state.hasError.email.error){
      emailErrorMessage = <ErrorInputMessage message={this.state.hasError.email.message} />
      email = <input type="email" className="form-control customError" placeholder="Email" value={this.state.email} onChange={e => {this.onChange(e, 'email')}} required/>

    }

    if(this.state.hasError.subject.error){
      subjectErrorMessage = <ErrorInputMessage message={this.state.hasError.subject.message} />
      subject =  <input type="text" className="form-control customError" placeholder="Asunto" value={this.state.subject} onChange={e => {this.onChange(e, 'subject')}} required/>

    }

    if(this.state.hasError.message.error){
      messageErrorMessage = <ErrorInputMessage message={this.state.hasError.message.message} />
      message = <textarea className="form-control customError" placeholder="Mensaje" value={this.state.message} onChange={e => {this.onChange(e, 'message')}} required/>

    }


    return(
      <form className="form-horizontal custom" onSubmit={this.onSubmit}>
        <div className="form-group col-xs-12">
          {email}
          {emailErrorMessage}
        </div>
        <div className="form-group col-xs-12">
          {subject}
          {subjectErrorMessage}
        </div>
        <div className="form-group col-xs-12">
          {message}
          {messageErrorMessage}
        </div>
        <div className="form-group col-xs-12">
          <button className="btn custom" type="submit">Enviar Mensaje</button>
        </div>
      </form>
    )

  }

}

ContactForm.PropTypes = {

  newContact: React.PropTypes.object.isRequired,
  onNewSubmit: React.PropTypes.func.isRequired
}

module.exports = ContactForm;
