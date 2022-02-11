import React from 'react';
const Login= () =>{
    return (
        <div class="Background">
            <div class="loginpage">
                <div class="login">
                    <h1>Login</h1>
                    <form>
                        <input type="text" placeholder="Username"></input>
                        <input type="password" placeholder="Password"></input>
                        <button type="submit">Login</button>
                    </form>
                </div>
                <div class="signup">
                    <h1>Sign Up</h1>
                    <form>
                        <input type="text" placeholder="Username"></input>
                        <input type="password" placeholder="Password"></input>
                        <input type="password" placeholder="Confirm Password"></input>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
  }
  export default Login;