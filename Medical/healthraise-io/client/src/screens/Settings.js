import React, { useState, useEffect } from 'react';
import '../App.css';
import {
  ProfileTile,
  SettingsButton
} from '../components';
import { Link } from "react-router-dom";
import config from '../config';
import Web3 from 'web3';

export default function Settings(props) {
  const [ethereum, setEthereum] = useState({});
  const [address, setAddress] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [name, setName] = useState('');
  const [web3, setWeb3] = useState({});

  const handleLogin = async () => {
    if (!ethereum.selectedAddress || !window.web3.eth.accounts[0]) {
      try {
        // Request account access if needed

        const result = await ethereum.enable();
        console.log(result);

        // We don't know window.web3 version, so we use our own instance of Web3
        // with the injected provider given by MetaMask
        setWeb3(new Web3(ethereum));
      } catch (error) {
        window.alert('MetaMask authentication required.');
        return;
      }
    }

    var newAddress = await ethereum.selectedAddress;
    setAddress(newAddress);
    const res = await fetch(`${config.API_ADDR}/api/users?address=${newAddress}`, {
      method: 'GET'
    });
    var users = await res.json();
    console.log(users);
    if (users.name) {
      setName(users.name);
      setAuthenticated(true);
    } else {
      var users = signUp(newAddress);
    }

    const payload = await handleSignatureStamp(users.address, users.nonce);
    console.log(payload);
    const result = await authenticate(payload);
  }

  const handleSignatureStamp = async (address, nonce) => {
    return new Promise(function(resolve, reject) {
      try {
        //const signature = eth.personal_sign(fromAddress, hexEncodedUtf8Message)
        const signature = window.web3.personal.sign(
          `I'm signing a one-time login with stamp: ${nonce}`,
          address,
          function (err, result) {
            if (err) return console.error(err)
            console.log('PERSONAL SIGNED:' + result);
            resolve({ address, signature: result });
          }
        );
      } catch (err) {
        console.log(err);
        throw new Error('You need to sign the message to be able to log in.');
      }
    })
  }

  const signUp = async (address) => {
    console.log('ran');
    const res = await fetch(`${config.API_ADDR}/api/users`, {
      body: JSON.stringify({ address }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });
    const json = await res.json();
    setName(address);
    setAuthenticated(true);
    return json;
  }

  const authenticate = async (payload) => {
    const res = await fetch(`${config.API_ADDR}/api/auth`, {
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });
    const json = await res.json();
    return json;
  }

  useEffect(()=>{
    const ethereum = window.ethereum;
    setEthereum(ethereum);
    setWeb3(new Web3(ethereum));
  },[])

  return (
    <div className="container">
      <div className="nav">
        <div className="nav-menu">
          <h1>Healthraise</h1>
          <ul>
           <li><Link to="/">Organizations</Link></li>
           <li><Link to="/individuals">Individuals</Link></li>
          </ul>
        </div>

        <div className="nav-user">
          {
            authenticated || ethereum.selectedAddress ? <Link to="/settings"><SettingsButton name={ethereum.selectedAddress} /></Link>
            : <a href="#" className="button" onClick={handleLogin}>Login with Metamask</a>
          }
        </div>
      </div>
      <div className="content">
        <div className="profile">
          <div className="tile-profile">
            <div className="tile-profile-icon">
              <img width="100%"/>
            </div>
            <div className="tile-votes">
              <div className="triangle"></div>
              <div className="votes">
                <a href="#">&#9650; {'0'}</a>
                <a href="#">&#9660; {'0'}</a>
              </div>
            </div>
          </div>
          <div className="tile-description">
            <div className="tile-header">
              <h2>{ethereum.selectedAddress}</h2>
              <span className="tile-header-raised">0 ETH raised</span>
            </div>

            <p>Your Bio Here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
