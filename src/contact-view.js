const React = require('react');

const ContactForm = require('./contact-form');
const ContactError = require('./contact-error');



class ContactView extends React.Component{

  constructor(props){

    super(props);
    this.state = {ErrorMessage: ""}
    this.onNewSubmit = this.onNewSubmit.bind(this);

  }

  onNewSubmit(state){
    let obj = {};
    obj.email = state.email.trim();
    obj.subject = state.subject.trim();
    obj.text = state.message.trim();

    var self = this;

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "http://localhost:8080/contactEmail",
        data: obj,
        success: function(e) {
            if (e.id === 0) {

              $('#contactar').modal('hide');

              var options = {
                  style: "toast",
                  content: "Mensaje enviado, gracias por contactar con nosotros.",
                  timeout: 2000,
                  htmlAllowed: true,
                  onClose: function() {}
              };

              $.snackbar(options);

            }else if(e.id === 1){
              self.setState({ErrorMessage: "Error del servidor intentelo mas tarde"});

            }
        },
        error: function(e) {

          self.setState({ErrorMessage: "Error del servidor intentelo mas tarde"});
        }
    });

  }

  render(){


    return(
      <div className="col-md-4">
        <ContactError message={this.state.ErrorMessage} />
        <ContactForm newContact={this.props.newContact} onNewSubmit={this.onNewSubmit}/>
      </div>
    )

  }

}

ContactView.PropTypes = {

  newContact: React.PropTypes.object.isRequired

};

module.exports = ContactView;
