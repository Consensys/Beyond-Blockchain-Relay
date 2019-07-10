import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Access from './Pages/Access/Access';
import Main from './Pages/Main/Main';


class App extends Component {
    public render() {
        return (
            <div>
                <Router>
                    <div>
                        <Route path="/" exact={true} component={Main} />
                        <Route path="/access/:patientdid" component={Access} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
