import React, {Component} from 'react'
import { Button, Container, Grid, TextField } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { firebaseAuthentication } from '../config/firebase'

export default class ForgotPassword extends Component{
    state = {
        email:'',
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        const {email} = this.state
        firebaseAuthentication.sendPasswordResetEmail(email)
        .then(()=>{
            alert('Please check your email to change password')
            this.props.history.push('/login')
        })
        .catch(error=>{
            alert(error.message)
        })
    }
    handleChangeField = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    render(){
        const {email} = this.state
        return(
            <Container>
                <Grid container justify="center">
                    <Grid xs="12" md="8" lg="4">
                        <h2>Forgot Password</h2>
                        <form onSubmit={this.handleSubmit}>
                            <TextField fullWidth type="email" margin="dense" size="small" value={email} onChange={this.handleChangeField} name="email" label="Email Address" required />
                            <Button fullWidth type="submit" variant="contained" color="primary">Reset Password</Button>
                        </form>
                        <p className="text-center">Have an account? <Link to="/login">Login</Link></p>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}