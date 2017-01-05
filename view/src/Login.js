import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ajax from './ajax';
import User from './User';
import Retribution from './Retribution';

class Login extends Component{
    constructor(){
        super();
        this.state = {
            signIn: false
        };
        let e = document.querySelector('.tab');
        e.style.display = "none";
    }
    handleClick = () => {
        let ele = document.querySelector('#loginform');
        let domData = ele.querySelectorAll('input');
        let query = Array.from(domData).map(domElem => `${domElem.name}=${domElem.value}`).join('&');
        let url = 'http://localhost/api/user/login?' + query
        ajax({
            url: url,
            type: 'GET',
            done: (json) => {
                let data = JSON.parse(json);
                if (data.length === 1){
                    this.setState({signIn: true});
                    let e = document.querySelector('.tab');
                    let loginform = document.querySelector('#loginform');
                    loginform.remove();
                    e.style.display = "block";
                    ReactDOM.render( <User key="User" /> ,document.getElementById('user'));
                    ReactDOM.render( <Retribution key="Retribution" /> ,document.getElementById('retribution'));
                }
            }
        });
    }

    render = () => {
        return <div id="loginform" key="loginform" >
            <div  className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" >
                <input type="text" name="loginname" key="loginname" className="mdl-textfield__input"/>
                <lable className="mdl-textfield__label">loginname: </lable>
            </div>
            <div  className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" >
                <input type="text" name="loginpassword" key="loginpassword" className="mdl-textfield__input"/>
                <lable className="mdl-textfield__label">loginpassword: </lable>
            </div>
                <button id="login_but" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" key="login" onClick={() => {this.handleClick(); return false;}}>Submit</button>
            </div>
    }
};

export default Login;