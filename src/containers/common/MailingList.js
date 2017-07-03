import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import '../../assets/styles/components/common/MailingList.scss';
import * as uiActions from '../../actions/uiActions';
import * as mailchimpActions from '../../actions/mailchimpActions';
import {blue600} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Confetti from 'react-confetti'
import TextInput from './form/TextInput';
import RaisedButton from 'material-ui/RaisedButton';

class MailingList extends React.Component{
  constructor(props, context){
    super(props, context);
    this.state = {
      email: "",
      message: '',
      submitted: false
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.displayForm = this.displayForm.bind(this);
    this.submitNewMember = this.submitNewMember.bind(this);
  }

  componentWillMount(){
    // GET SUBSCRIBERS HERE
    this.props.mailchimpActions.requestMailchimpSubscribers();
    // this.setState()
  }

  submitNewMember(){
    if(this.state.email){
      this.props.mailchimpActions.requestAddMailchimpSubscriber(this.state.email, 'Footer').then(
        this.setState({email: "", submitted: true, message: "YAY! Thanks for joining!"})
      );
    }else{
      this.setState({message: "Please enter a valid email address"})
    }
  }

  displayTitle(title){
    if(title){
      return(
        <h3 className="mailListTitle">{title}</h3>
      )
    }else{
      return ""
    }
  }

  displayBody(body){
    if(body){
      return(
        <h3>{body}</h3>
      )
    }else{
      return ""
    }
  }

  displayFormMessages(message){
    if(message){
      return(
        <div className="row">
          <div className="col-12">
            <p className='form-errors'>{message}</p>
          </div>
        </div>
      )
    }else{
      return null
    }
  }

  onChangeEmail(event){
    this.setState({email: event.target.value});
  }

  displayForm(formPlaceholder, buttonText){
    return(
      <MuiThemeProvider muiTheme={getMuiTheme({ palette: {
          primary1Color: blue600
        }})}>

      <div className="mailingListForm">
        {this.displayFormMessages(this.state.message)}
        <div className="row">
          <div className="col-sm-12 col-md-8">
            <TextField
              type='email'
              onChange={this.onChangeEmail}
              value={this.state.email}
              floatingLabelText="You rock"
            />
          </div>
          <div className="col-sm-12 col-md-4">
            <RaisedButton  label={buttonText} primary={true}
            className='btn-primary h-100' style={{height: '100%'}} onClick={this.submitNewMember}/>

          </div>
        </div>
      </div>
    </MuiThemeProvider>

    );
  }

  displayConfetti(){
    if(this.state.submitted){
      return(
        <div id="mailingConfetti" style={{
            position: 'fixed',
            top: '-10px',
            left: '0px',
            width: '100%',
            height: '100%',
            zIndex: '-1',
            border: 'none'
          }}>
          <Confetti
            numberOfPieces={100}
            gravity={.04}
            opacity={.5}/>
        </div>
      )
    }else{
      return null
    }
  }
  render(){
    return(
      <div className="MailingList">
        {this.displayConfetti()}
        <div className="row">
          <div className="col-sm-12">
            {this.displayTitle(this.props.header)}
            {this.displayBody(this.props.body)}
          </div>
        </div>
        <div className="row">
          <div className="col">
            {this.displayForm('Your email address...', 'Join ' + this.props.subscribers + ' Awesome People')}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    ui: state.ui,
    subscribers: state.subscribers,
    header: ownProps.header,
    body: ownProps.body
  };
}

function mapDispatchToProps(dispatch){
  return{
    ui_actions: bindActionCreators(uiActions, dispatch),
    mailchimpActions: bindActionCreators(mailchimpActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MailingList);
