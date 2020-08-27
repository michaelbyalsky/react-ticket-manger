import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router'

import './Join.css';

const Join = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [ifValid, setIfValid] = useState(false);

  const checkValidUser = (name, password) => {
    axios
    .get(`/api/users?name=${name}&password=${password}`)
    .then((response) => {
        console.log(response.data);
        if (response.data === true) {
            setIfValid(true)
        }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
      <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <h1 className="heading">Join</h1>
          <div><input placeholder="User name" className="joinInput" type="text" onChange={(e) => setName(e.target.value)} /></div>
          <div><input placeholder="Password" className="joinInput mt-20" type="text" onChange={(e) => setPassword(e.target.value)} /></div>
        <button onClick={() => checkValidUser(name, password)} className="button mt-20" type="submit">Sign in</button>
         {ifValid &&
         <Redirect to={`./main?name=${name}`}/>
        } 
        </div>
      </div>
    </>
  );
};

export default Join;
