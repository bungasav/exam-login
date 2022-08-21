import React, {Component} from 'react'
import { Button, Container, Grid, TextField } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { firebaseAuthentication } from '../config/firebase'

export default class SignUp extends Component{
    state = {
        email:'',
        password: ''
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        const {email, password} = this.state
        firebaseAuthentication.createUserWithEmailAndPassword(email, password)
        .then(res=>{
            firebaseAuthentication.currentUser.sendEmailVerification()
            .then(()=>{
                alert('Please verify your email!');
                this.props.history.push('/login');
            })
            .catch((error)=>{
                alert(error.message)
            })
        })
        .catch(err=>{
            alert(err.message)
        })
    }
    handleChangeField = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    render(){
        const {email, password} = this.state
        return(
            <Container>
                <Grid container justify="center">
                    <Grid xs="12" md="8" lg="4">
                        <h2>Sign Up</h2>
                        <form onSubmit={this.handleSubmit}>
                            <TextField fullWidth type="email" margin="dense" size="small" value={email} onChange={this.handleChangeField} name="email" label="Email Address" required />
                            <TextField fullWidth type="password" margin="dense" size="small" value={password} onChange={this.handleChangeField} name="password" label="Password" required />
                            <Button type="submit" fullWidth variant="contained" color="primary">Sign Up</Button>
                        </form>
                        <p className="text-center">Have an account? <Link to="/login">Log in</Link></p>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}