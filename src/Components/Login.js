import React, {Component} from 'react'
import { Button, Container, Grid, TextField } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { firebaseAuthentication } from '../config/firebase'

export default class Login extends Component{
    state = {
        email:'',
        password: ''
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        const {email, password} = this.state
        firebaseAuthentication.signInWithEmailAndPassword(email, password)
        .then(res=>{
            console.log(res)
            if(res.user.emailVerified){
                this.props.history.push('/home')
            }else{
                alert('Please, Verify your email!')
                firebaseAuthentication.signOut()
            }
        })
        .catch(error=>{
            alert(error.message)
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
                        <h2>Login</h2>
                        <form onSubmit={this.handleSubmit}>
                            <TextField fullWidth type="email" margin="dense" size="small" value={email} onChange={this.handleChangeField} name="email" label="Email Address" required />
                            <TextField fullWidth type="password" margin="dense" size="small" value={password} onChange={this.handleChangeField} name="password" label="Password" required />
                            <p><Link to="/forgot">Forgot your password?</Link></p><br/>
                            <Button type="submit" fullWidth variant="contained" color="primary">Log in</Button>
                        </form>
                        <p className="text-center">Don't have an account? <Link to="/signup">Sign Up</Link></p>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}