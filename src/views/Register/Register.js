import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Register extends Component {

    state = {
        uname: [],
        user: {
            name: 'Username',
            password: 'Password',
            cpassword: 'Confirm Password'
        },
        message: '',
        f: true
    }

    registerUser = () => {
        console.log(this.state.user)
        fetch('http://localhost:4000/check_user?name=' + this.state.user.name.split(" ").join("%20") + '&password=' + this.state.user.password)
            .then(response => response.json())
            .then(response => this.setState({f: response.flag}))
            .then(this.redirectUser)
            .catch(err => console.error(err.toString()))
    }

    redirectUser = () => {
        if (this.state.f) {
            fetch('http://localhost:4000/add_user?name=' + this.state.user.name.split(" ").join("%20") + '&password=' + this.state.user.password)
                .then(response => response.json())
                .then(response => this.setState({message: response.msg}))
                .then(response => console.log(response))
                .then(this.alertmessage)
                .catch(err => console.error(err.toString()))
        } else {
            alert("Username already taken! Choose another username.")
        }
    }

    alertmessage = () => {
        alert(this.state.message)
    }

    render() {
        const user = this.state.user;
        return (
            <div className={'register'}>

                <input type="text" class={"log"} placeholder="Username"
                       onChange={ev => this.setState({user: {...user, name: ev.target.value}})}/><br/><br/>
                <input type="password" placeholder="Password" name="pass1" class={"log"}
                       onChange={ev => this.setState({user: {...user, password: ev.target.value}})}/><br/><br/>
                <input type="password" placeholder="Confirm Password" name="pass2" class={"log"}
                       onChange={ev => this.setState({user: {...user, cpassword: ev.target.value}})}/><br/>
                <button class="reg" onClick={this.registerUser}>Register</button>
                <Link to={'/login'}><p>Already have an account? <br/>Click here to login</p></Link>
            </div>
        );
    }
}

export default Register;