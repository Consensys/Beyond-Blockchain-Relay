import React from 'react';

class ErrorCatcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errorOccurred: false };
  }

  componentDidCatch(error, info) {
    this.setState({
      errorOccurred: true,
    });
    console.log('Error', error, info);
  }

  render() {
    return this.state.errorOccurred ? <h1>Something went wrong!</h1> : this.props.children;
  }
}

export default ErrorCatcher;
