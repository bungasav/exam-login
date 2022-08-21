import React, { useState } from 'react'
import { Button, Container, Grid, TextField, Box, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import { firebaseAuthentication } from '../config/firebase'
import SendIcon from '@mui/icons-material/Send';


const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const SignUp = () => {
    const [credential, setCredential] = useState({
        email: "",
        password: ""
    })
    const history = useHistory()

    const [modalConfig, setModalConfig] = React.useState({
        title: "",
        content: "",
        type: "",
        isShow: false
    });
    const handleOpen = ({ title, content, type }) => setModalConfig({
        title,
        content,
        type,
        isShow: true
    });
    const handleClose = () => {

        setModalConfig({
            title: "",
            content: "",
            type: "",
            isShow: false
        });
        modalConfig.type === "success" && history.push('/login');

    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = credential
        firebaseAuthentication.createUserWithEmailAndPassword(email, password)
            .then(res => {
                firebaseAuthentication.currentUser.sendEmailVerification()
                    .then(() => {
                        handleOpen({title:"Success Registration",content:"please check email for verification",type:"success"})
                    })
                    .catch((error) => {
                        handleOpen({title:"Failed Registration",content:error.message ,type:"failed"})
                    })
            })
            .catch(err => {
                handleOpen({title:"Failed Registration",content:err.message ,type:"failed"})

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
                        <h2>Sign Up</h2>
                        <form onSubmit={handleSubmit}>
                            <TextField fullWidth type="email" margin="dense" size="small" value={credential.email} onChange={handleChangeField} name="email" label="Email Address" required />
                            <TextField fullWidth type="password" margin="dense" size="small" value={credential.password} onChange={handleChangeField} name="password" label="Password" required />
                            <Button type="submit" fullWidth variant="contained"
                                style={{
                                    borderRadius: 10,
                                    backgroundColor: "#7176FA",
                                    color: "#FFFF",
                                    padding: "6px 12px",
                                    fontSize: "16px",
                                    marginTop: "16px"
                                }} endIcon={<SendIcon />}

                            >Sign Up</Button>
                        </form>
                        <p className="text-center">Have an account? <Link to="/login">Log in</Link></p>
                    </Box>

                </Grid>
            </Grid>

            <Dialog
                open={modalConfig.isShow}
                onClose={() => handleClose()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {modalConfig.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {modalConfig.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Oke</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default SignUp