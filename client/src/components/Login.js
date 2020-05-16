import React from "react";
import { axiosWithAuth } from '../Axios/axiosWithAuth';
import {TextField, Button} from '@material-ui/core';
import styled from 'styled-components';


const LoginStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #fff;
    padding: 2rem;
    border-radius: 15px;
    -webkit-box-shadow: 0px 10px 40px -4px rgba(255, 255, 255, 1);
    -moz-box-shadow: 0px 10px 40px -4px rgba(255, 255, 255, 1);
    box-shadow: 0px 10px 40px -4px rgba(255, 255, 255, 1);

    h1 {
      text-transform: uppercase;
      font-weight: 900;
      border-bottom: 1px solid black;
      padding: 3px;
    }

    h3 {
      text-transform: uppercase;
      margin-bottom: -5px;
    }
  }
  `;

class Login extends React.Component {
  state = {
    credentials: {
      username: '',
      password: ''
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", this.state.credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        this.props.history.push("/protected");
      })
      .catch(err => {
        console.log("Err is: ", err);
      });
  };

  render() {
    return (
      <LoginStyles>
        <div className='container'>
          <h1>Welcome to the Bubble App!</h1>
          <h3>Sign In</h3>
          <form onSubmit={this.login}>
          <div>
            <TextField
              id="outlined-basic"
              onChange={this.handleChange}
              value={this.state.credentials.username}
              type="text"
              name="username"
              label="Username"
              variant="outlined"
            />
            </div>
            <div>
            <TextField
              id="outlined-basic"
              onChange={this.handleChange}
              value={this.state.credentials.password}
              type="password"
              name="password"
              label="Password"
              variant="outlined"
            />
            </div>
            <div>
            <Button variant="contained" color="primary" type="submit">Login</Button>
            </div>
          </form>
        </div>
      </LoginStyles>
    );
  }
}

export default Login;
