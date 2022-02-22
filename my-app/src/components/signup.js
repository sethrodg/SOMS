import { Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LockOutlinedIcon from '@mui/icons-material/Lock';
import { Google } from '@mui/icons-material';
//import { Link, useNavigate } from "react-router-dom"
import "././signup.css"
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const paperStyle = { padding: 20, height: '70vh', width: 380, margin: "20px auto" }
  const btnstyle = { backgroundColor: '#F89286', margin: '8px 0px' }
  const textStyle = { margin: '8px 0px' }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
      if (loading) {
        // maybe trigger a loading screen
        return;
      }
      if (user) navigate("/home");
    }, [user, loading]);
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
};
  return (
    <Grid container style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={6} style={{ align: 'center' }}>
        <img src="utalogo.png"/>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper sx={{ borderRadius: 10 }} elevation={10} style={paperStyle}>
          <Grid align='center'>
            <h1>Welcome to SOMS</h1>
          </Grid>
          <div className='row'>
            <input
              type="text"
              className="register__textBox"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              style={textStyle}
              variant="outlined"
              fullWidth required
            />
            <input
              type="text"
              className="register__textBox"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail Address"
              style={textStyle}
              variant="outlined"
              fullWidth required
            />
            <input
              type="password"
              className="register__textBox"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={textStyle}
              variant="outlined"
              fullWidth required
            />
          </div>
          <FormControlLabel
            control={
              <Checkbox
                name='checkedB'
                color='primary'
              />
            }
            label="Remember me"
          />
          <Button type='Submit' color='primary' variant="contained" style={btnstyle} onClick={register} fullWidth>Register!</Button>
          <Button variant="outlined" startIcon={<Google />} onClick={signInWithGoogle}>Sign Up with Google</Button>
        </Paper>
      </Grid>
    </Grid>
  )
}
export default SignUp