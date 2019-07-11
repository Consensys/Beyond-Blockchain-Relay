import React, { useState, useEffect } from 'react';
import '../App.css';

export default function SettingsIcon(props) {
  return (
    <a href="#" onClick={props.onClick} className="button">
      {props.name.length > 12 ?`${props.name.substr(0,12)}...` : props.name}<img src="https://img.icons8.com/ios/50/000000/settings.png" className="menu-settings-icon" />
    </a>
  );
}

