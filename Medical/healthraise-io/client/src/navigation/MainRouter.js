import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../App.css';
import {
  Home,
  Profile,
  Settings,
  Individuals
} from '../screens';

export default function MainRouter() {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={Home} />
        <Route path="/u/:user" component={Profile} />
        <Route path="/settings" component={Settings} />
        <Route path="/individuals" component={Individuals} />
      </div>
    </Router>
  );
}

