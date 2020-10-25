import { Button } from '@material-ui/core';
import React from 'react';
import './cssfiles/loginstyle.css';
import discordlogo from './images/discord.svg';
import { auth, provider } from "./Firebase";

function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(error => {
            alert(error.message);
        });
    }

    return (
        <div className="login">
            <img src={discordlogo} alt="" />
            <Button onClick={signIn}>Login to discord</Button>
        </div>
    )
}

export default Login
