import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, } from 'formik';
import FormControls from './FormControls/FormControls';
import styles from './Auth.module.css'
import TextWrapper from '../UI/TextWrapper/TextWrapper';
import { NavLink } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { sendSignUpData } from '../../services';


function SignUp(props) {

    let history = useHistory()

    const signUpData = {
        name: '',
        email: '',
        password: ''
    }

    const signUpValidation = Yup.object({
        name: Yup.string().required('Please enter your name'),
        email: Yup.string().email('Enter valid email address').required('Please enter email'),
        password: Yup.string().min(6, 'Password must be 6-10 character long').max(10, 'Password must be 6-10 character long').required('Please enter password')
    })

    const signUpSubmit = async (data, { resetForm }) => {
        resetForm(signUpData);
        try {
            const responseData = await sendSignUpData(data);
            localStorage.setItem('token', responseData.data.createUser.token);
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <React.Fragment>
            <div className={styles.FormTitle} >
                <TextWrapper textLabel="Create Account" isFlexStart={false} />
            </div>
            <Formik initialValues={signUpData} validationSchema={signUpValidation} onSubmit={signUpSubmit} >
                {
                    (formik) => {
                        return (
                            <Form className={styles.AuthForm}>
                                <FormControls type='name' isError={formik.errors.name} isTouched={formik.touched.name} />
                                <FormControls type='email' isError={formik.errors.email} isTouched={formik.touched.email} />
                                <FormControls type='password' isError={formik.errors.password} isTouched={formik.touched.password} />
                                <button type='submit'>
                                    <TextWrapper textLabel="Sign up with Email" />
                                </button>
                            </Form>
                        )
                    }
                }
            </Formik>
            <div className={styles.BlockLine}></div>
            <div className={styles.ChangeAuthPage}>
                <div>
                    <TextWrapper textLabel="Already signed up?" isFlexStart={true} />
                </div>
                <NavLink exact activeClassName={styles.ActiveLink} to='/signin'>
                    <div className={styles.ChangeAuthPageValue}>
                        <TextWrapper textLabel="Go To login" isFlexStart={true} />
                    </div>
                </NavLink>
            </div>
        </React.Fragment>
    );
}

export default SignUp;