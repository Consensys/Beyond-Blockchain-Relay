import React, { useState, useEffect } from 'react';
import '../App.css';

export default function ProfileTile(props) {
  return (
    <div className="tile">
      <div className="tile-profile">
        <div className="tile-profile-icon">
          <img width="100%"/>
        </div>
        <div className="tile-votes">
          <div className="triangle"></div>
          <div className="votes">
            <a href="#">&#9650; {props.upvote || '325'}</a>
            <a href="#">&#9660; {props.downvote || '35'}</a>
          </div>
        </div>
      </div>
      <div className="tile-description">
        <div className="tile-header">
          <h2>{props.name}</h2>
          <span className="tile-header-raised">{props.raised} ETH raised</span>
        </div>
        <p>{props.description}</p>
        <a href="#" className="button-sponsor">Sponsor</a>
      </div>
    </div>
  );
}

