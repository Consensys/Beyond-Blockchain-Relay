import React from 'react';

export default class SettingsPage extends React.Component {
  state = {

  }

  render() {
    return (
        <div>
          {this.props.renderNavbar('settings')}
          <div className="page-wrapper">
            <h1 className="title-text--bold">Settings</h1>
            <h2 className="medium-text">Nothing to see here, yet! Get back to testing our app, please!</h2>
          </div>
        </div>
    );
  }
}
