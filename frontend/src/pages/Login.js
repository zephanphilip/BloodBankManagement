import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { Box, TextField, Button, Typography, Container } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                height: '85vh',
                overflow: 'hidden',
                flexDirection: 'row',
                '& img': {
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'cover',
                }
            }}
        >
            {/* Image section */}
            <Box
                sx={{
                    flex: 1,
                    background: `url('https://images.unsplash.com/photo-1638272467190-4ff6f773315c?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') no-repeat center center`,
                    backgroundSize: 'cover',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                {/* You can add an overlay here if you want to enhance readability of text */}
            </Box>
            {/* Login form section */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'background.paper',
                    height: '100vh',
                    padding: 0
                }}
            >
                <Container maxWidth="xs">
                    <Typography variant="h4" component="h1" gutterBottom>
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            required
                            fullWidth
                            label="Email"
                            type="email"
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            disabled={isLoading}
                        >
                            Login
                        </Button>
                        {error && (
                            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                                {error}
                            </Typography>
                        )}
                    </form>
                </Container>
            </Box>
        </Box>
    );
};

export default Login;


// import React,{useState} from 'react'
// import { useLogin } from '../hooks/useLogin'

// function Login() {

//     const[email, setEmail] = useState('')
//     const[password, setPassword] = useState('')
//     const{login, isLoading, error} = useLogin()

//     const handleSubmit = async (e)=>{
//         e.preventDefault();
//         await login(email, password)
//     }

//   return (
//     <form className='login' onSubmit={handleSubmit}>
//         <h3>Login</h3>
//         <input type='email' placeholder='Email' 
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//         />
//         <input type='password' placeholder='Password' 
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//         />
//         <button disabled={isLoading}>Login</button>
//         {error && <div className='error'>{error}</div>}

//     </form>
//   )
// }

// export default Login
