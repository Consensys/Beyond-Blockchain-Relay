import React, { useState, useEffect } from 'react';
import '../App.css';
import {
  ProfileTile,
  SettingsButton
} from '../components';
import { Link } from "react-router-dom";
import config from '../config';
import Web3 from 'web3';

// sources:
// https://www.insidephilanthropy.com/health-philanthropy/medical-research.html
// https://thon.org/research-spotlight/

function App() {
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
    if (users.name) {
      setName(users.name);
      setAuthenticated(true);
    } else {
      var users = signUp(newAddress);
    }

    const payload = await handleSignatureStamp(users.address, users.nonce);
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
            authenticated ? <Link to="/settings"><SettingsButton name={ethereum.selectedAddress} /></Link>
            : <a href="#" className="button" onClick={handleLogin}>Login with Metamask</a>
          }
        </div>
      </div>
      <div className="content">
        <ProfileTile name={"Louis Simpson"}
          description = { `Louis Simpson and his wife Kimberly Querrey recently gave $92 million to support a new 12-story research hub at Northwestern which will provide space for research into neurodegenerative disorders, as well as cancer, heart disease and genetics.
            ` }
          goal="na"
          upvote="512"
          downvote="0"
          raised='0'
        />
        <ProfileTile name="John Doe"
          description = { `Seeking funding for expensive back surgery. Was recently layed off a job. Fell down the stairs going to help my kid set up his new Playstation 4. I've been feeling numbness and pain across my arms since, for the past 4 months.` }
          goal="20"
          raised='2.67'
          upvote="33"
          downvote="0"
        />
        <ProfileTile name="Stacey Gray"
          description = { `Recently discovered I developed stage 1 cancer. I don't know what to do. I recently started my own business, so I do not have a company providing healthcare for me. In serious need.` }
          goal="10"
          raised='0.5'
          upvote="12"
          downvote="0"
        />
        <ProfileTile name="Malcom George" description = { `Recently my puppy Joy had to be taken to the vet. She's fine now, but I had to pay 2k for the surgery. Looking for help, as this was an unexpected event.` }
          goal="7"
          raised='4.01'
          upvote="245"
          downvote="2"
        />
        <ProfileTile name="Katie X" description = { `Need money for spring break.` }
          goal="7"
          raised='0'
          upvote="2"
          downvote="3243"
        />
      </div>
    </div>
  );
}

export default App;
