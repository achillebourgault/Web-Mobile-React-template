import { Form, Button, FormGroup, FormControl} from 'react-bootstrap';
import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import { isLoggedIn } from '../Helper Functions/UserFunction'

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {email: "", password: "", validated: false, error: false, userid: ""};
    }

    handleSubmit(e) {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false){
            e.stopPropagation();
        } else {
            /*
            fetch("http://localhost:8080/users/login", {
                method: "POST",
                body: JSON.stringify(
                    {
                        "email": this.state.email,
                        "password": this.state.password
                    },),
                headers: {
                    'X-User-Agent' : 'your app / 1.0.0',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                },

            })
                .then((response) => response.text())
                .then((quote) => {
                    console.log(quote)
                    const datas = JSON.parse(quote);
                    if (datas.status === "connected") {
                        this.setState({userid: datas.uuid})
                        this.props.history.push('/profile');
                    } else {
                        this.setState({error: true});
                    }
                });
             */
        }
        this.setState({validated: true});
    }

    render() {
        const errorMsg = (
            <div style={{color: "white"}}>
                Error: Fields are incorrect.
            </div>
        );
        if (isLoggedIn()) {
            return <Redirect to="/profile" />;
        }
        return (
            <div className="Login">
                <h1 style={{padding: 20, marginTop: 20, fontWeight: "500", color: "black"}}>
                    Login Template
                </h1>
                <Form style={{padding: "55px"}} noValidate validated={this.state.validated} onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup controlId="email" bsSize="large">
                        <FormControl
                            autoFocus
                            type="email"
                            required
                            value={this.state.email}
                            placeholder="Email"
                            onChange={e => this.setState({email: e.target.value})}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid email.
                        </Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <FormControl
                            type="password"
                            required
                            value={this.state.password}
                            placeholder="Password"
                            onChange={e => this.setState({password: e.target.value})}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid password.
                        </Form.Control.Feedback>
                    </FormGroup>
                    <Button block bsSize="large" type="submit">
                        Log in
                    </Button>
                </Form>
                {this.state.error? errorMsg : ""}
            </div>
        );
    }
}

export default withRouter(Login);
