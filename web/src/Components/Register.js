import { Form, Button, FormGroup, FormControl } from 'react-bootstrap';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {email: "", password: "", validated: false, error: false};
    }

    handleSubmit(e) {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false){
            e.stopPropagation();
        }else{
            /*
            fetch("http://localhost:8080/users/create", {
                method: "POST",
                body: JSON.stringify(
                    {
                        "email": this.state.email,
                        "password": this.state.password
                    },),
                headers: {
                    'X-User-Agent' : 'area / 1.0.0 comment',
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
                        this.setState({userid: datas.uuid});
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
                Error: Email already exists or something went wrong.
            </div>
        );
        return (
            <div className="Login">
                <h1 style={{padding: 20, marginTop: 20, fontWeight: "500", color: "black"}}>
                    Register Template
                </h1>
                <Form style={{padding: "55px"}}  noValidate validated={this.state.validated} onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup controlId="email" bsSize="large">
                        <FormControl
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
                        Sign Up
                    </Button>
                </Form>
                {this.state.error? errorMsg : ""}
            </div>
        );
    }
}

export default withRouter(Register);
