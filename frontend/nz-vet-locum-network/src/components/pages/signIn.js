import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { CustomContext } from '../../context/context';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';



const theme = createTheme();

export default function SignIn() {

    //doctor's authentication check, will be used in the doctor's profile pages through context.
    const { authenticated, setAuthenticated, setCurrentUserInfo } = useContext(CustomContext)

    const [error, setError] = useState(null)
    const navigate = useNavigate()

    //On submit will post to the server to sign in
    const handleSubmit = (event) => {

        event.preventDefault();

        setError(null)

        const data = new FormData(event.currentTarget);

        axios.post('http://localhost:4000/doctors/login', data, {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }

        }).then(response => {
            setAuthenticated(true);
            setCurrentUserInfo(response.data.currentUserInfo)
            navigate("/doctor-profile")
            // console.log(response.data.authenticated)
            console.log(response.data.currentUserInfo)
        })
            .catch((error) => setError(error.response.data.msg))
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                        {error ? <h1>{error.toString()}</h1> : null}

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}