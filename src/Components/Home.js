import React, {Component} from 'react'
import { Button, Container } from '@material-ui/core'
import { firebaseAuthentication } from '../config/firebase'

export default class Home extends Component{
    componentDidMount(){
        firebaseAuthentication.onAuthStateChanged((user)=>{
            if(!user){
                this.props.history.push('/login')
            }
        })
    }
    handleLogOut = () =>{
        firebaseAuthentication.signOut()
    }
    render(){
        return(
            <Container>
                <h2>Hello this is Login App from 2301957950 - Bunga Pramesti Savitri</h2>
                    <form>
                        <Button onClick={this.handleLogOut} variant="contained" color="primary">Logout</Button>
                    </form>
            </Container>
        )
    }
}