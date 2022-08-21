import React, { useState } from 'react'
import { Button, Container, Grid, TextField, Box } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import { firebaseAuthentication } from '../config/firebase'
import SendIcon from '@mui/icons-material/Send';

const Login = () => {
    const history = useHistory()

    const [credential, setCredential] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = credential
        firebaseAuthentication.signInWithEmailAndPassword(email, password)
            .then(res => {
                console.log(res)
                if (res.user.emailVerified) {
                    history.push('/home')
                } else {
                    alert('Please, Verify your email!')
                    firebaseAuthentication.signOut()
                }
            })
            .catch(error => {
                alert(error.message)
            })
    }
    const handleChangeField = (e) => {
        setCredential((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <Container>
            <Grid container justify="center">
                <Grid xs="12" md="8" lg="4">
                    <Box
                        style={{
                            width: "auto",
                            padding: 20,
                            height: "auto",
                            borderRadius: 10,
                            boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
                            position: "absolute",
                            top: "50%", /* position the top  edge of the element at the middle of the parent */
                            left: "50%", /* position the left edge of the element at the middle of the parent */
                            transform: "translate(-50%, -80%)"
                        }}>
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit}>
                            <TextField fullWidth type="email" margin="dense" size="small" value={credential.email} onChange={handleChangeField} name="email" label="Email Address" required />
                            <TextField fullWidth type="password" margin="dense" size="small" value={credential.password} onChange={handleChangeField} name="password" label="Password" required />
                            <p><Link to="/forgot">Forgot your password?</Link></p><br />
                            <Button type="submit" fullWidth variant="contained" style={{
                                borderRadius: 10,
                                backgroundColor: "#7176FA",
                                color : "#FFFF",
                                padding: "6px 12px",
                                fontSize: "12px"
                            }} endIcon={<SendIcon />} >Log in</Button>
                        </form>
                        <p className="text-center">Don't have an account? <Link to="/signup">Sign Up</Link></p>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}


export default Login