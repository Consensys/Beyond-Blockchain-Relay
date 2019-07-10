import React, {Component} from 'react';

import Main from './Main.jsx';

export default class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="site-wrapper">
        <Main/>
      </div>
    );
  }

  componentWillMount() {

  }

}
