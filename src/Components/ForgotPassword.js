import React, { useState } from 'react'
import { Button, Container, Grid, TextField, Box } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { firebaseAuthentication } from '../config/firebase'
import SendIcon from '@mui/icons-material/Send';

const ForgotPassword = () => {

    const [email, setEmail] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault();
        firebaseAuthentication.sendPasswordResetEmail(email)
            .then(() => {
                alert('Please check your email to change password')
                this.props.history.push('/login')
            })
            .catch(error => {
                alert(error.message)
            })
    }
    const handleChangeField = (e) => {
        setEmail(e.target.value)
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
                        <h2>Forgot Password</h2>
                        <form onSubmit={handleSubmit}>
                            <TextField fullWidth

                                style={{
                                    marginBottom: "20px"
                                }}
                                type="email" margin="dense" size="small" value={email} onChange={handleChangeField} name="email" label="Email Address" required />
                            <Button fullWidth type="submit" variant="contained" color="primary" endIcon={<SendIcon />}
                                style={{
                                    borderRadius: 10,
                                    backgroundColor: "#7176FA",
                                    color: "#FFFF",
                                    padding: "6px 12px",
                                    fontSize: "12px"
                                }}


                            >Reset Password</Button>
                        </form>
                        <p className="text-center">Have an account? <Link to="/login">Login</Link></p>
                    </Box>

                </Grid>
            </Grid>
        </Container>
    )

}

export default ForgotPassword