import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import ProfileTile from './components/ProfileTile';
import MainRouter from './navigation/MainRouter';

function App() {
  return (
    <div className="container">
      <MainRouter/>
    </div>
  );
}

export default App;
