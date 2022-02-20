import { Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import { Google } from '@mui/icons-material';
const Login = () => {

    const paperStyle = { padding: 20, height: '70vh', width: 400, margin: "20px auto" }
    const btnstyle = { backgroundColor: '#F89286', margin: '8px 0px' }
    const textStyle = { margin: '8px 0px' }
    //const imgStyle={width:'100%', height: '100%', objectFit: 'cover'}
    return (
        <Grid container style={{ minHeight: '100vh' }}>
            <Grid item xs={12} sm={6} style={{ align: 'center' }}>
                <img src="" />
                <img src="" />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Paper sx={{ borderRadius: 10 }} elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <h1>Welcome to SOMS</h1>
                    </Grid>
                    <Typography>
                        Username
                    </Typography>
                    <TextField placeholder='Enter Username' style={textStyle} variant="outlined" fullWidth required />
                    <Typography>
                        Password
                    </Typography>

                    <TextField placeholder='Enter Password' type="password" variant="outlined" fullWidth required />
                    <Typography>
                        <Link align='right' href='#'>
                            Forgot Password
                        </Link>
                    </Typography>
                    <Button type='Submit' color='primary' variant="contained" style={btnstyle} fullWidth>Log In</Button>
                    <hr></hr>
                    <Typography> Don't have an account yet?
                        <div class="signupbutton">
                            <Link href='signup'>
                                <Button variant="outlined">Sign Up</Button>
                            </Link>
                        </div>
                    </Typography>
                    <Button variant="outlined" startIcon={<Google />} >Continue with Google</Button>
                </Paper>
            </Grid>
        </Grid>
    )
}
export default Login