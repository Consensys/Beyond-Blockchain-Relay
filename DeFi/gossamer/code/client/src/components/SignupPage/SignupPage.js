import React from 'react';

export default class SignupPage extends React.Component {
  state = {
    loggedIn: true,
  }


  handleInputChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
        <div>
          <h1>Register</h1>
          <h2>{this.state.loggedIn}</h2>
        </div>
    );
  }
}
