import React, { useState, useEffect } from 'react';
import { useFirebase } from "react-redux-firebase";

import { Form, Segment, Button, Grid, Message } from  "semantic-ui-react";
import styles from "./login.module.css";
import {Link} from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
    const firebase = useFirebase();
    const { register, errors, handleSubmit, setValue } = useForm();

    const [fbErrors, setFbErrors] = useState([]);
    const [submitting, setSubmitting] = useState (false);

    useEffect(() =>
    {
        register({name:"email"} , {required:true});
        register({name: "password"} , {required:true, minLenght:6});

    }, []);


    const onSubmit = ({email, password}, e) => {
        setSubmitting(true);
        setFbErrors([]);

        firebase.login({
            email, password
        })
        .then((data) =>{
        })
        .catch((error)=> {
            setFbErrors([{ message:error.message}]);
        })
        .finally(()=>{
            setSubmitting(false);
        })
    };

    const displayErrors = () =>
    fbErrors.map((error,index) => <p key={index}>{error.message}</p>);


    return (
       <Grid 
       textAlign="center" 
       verticalAlign="middle" 
       className={styles.container}
       >
            <Grid.Column style={{maxWidth: 450}}>
                <h1 className={styles.formHeader}>
                    Chatify
                    <span>.io</span>
                </h1>        
                <Form size="large"
                className={styles.form} onSubmit={handleSubmit (onSubmit)}
                >
                    <Segment>
                        <Form.Input 
                        fluid 
                        icon="mail" 
                        iconPosition="left" 
                        name="email" 
                        onChange={(event, {name, value}) => {
                            setValue(name,value);
                        }}
                        placeholder="Email Adresi" 
                        type="email" 
                        error = {errors.email ? true : false}
                        />
                        <Form.Input 
                        fluid 
                        icon="lock" 
                        iconPosition="left" 
                        name="password" 
                        onChange={(event, {name, value}) => {
                            setValue(name,value);
                        }}
                        placeholder="??ifre" 
                        type="password" 
                        error = {errors.email ? true : false}
                        />
                        <Button color="purple" fluid size="large" disabled={ submitting }>
                            Giri?? Yap
                        </Button>
                    </Segment>

                </Form>
                {
                    fbErrors.length>0 && ( 
                        <Message error> {displayErrors()}</Message>
                    )
                }
                <Message>
                    Yeni misin ? <Link to="/signup">Hesap Olu??tur</Link>
                </Message>
            </Grid.Column>   
       </Grid>
    )
}

export default Login
