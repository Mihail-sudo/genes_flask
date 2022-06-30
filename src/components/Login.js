import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import {useNavigate} from 'react-router-dom'

const Login = ({onSignUp}) => {  
    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
        watch,
    } = useForm()

    const navigate = useNavigate()

    const onSubmit = (data) => {
        onSignUp(data, 'login')
        navigate('/')
    }

    const password = useRef({});
    password.current = watch("password", "");

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='authForm'>
            <fieldset className="form-group">
                <legend>Log In</legend>
                <input type='email' {...register('email', {
                    required: 'Please enter your email',
                })} placeholder='Email'/>
            </fieldset>
            <fieldset className="form-group">
                <input {...register('password', {
                    required: 'Please enter your password',
                })} placeholder='Password'/>
            </fieldset>
            <fieldset className="form-group">
            <div>
                {errors[Object.keys(errors)[0]] && <p>{errors[Object.keys(errors)[0]].message}</p>}
            </div>
                <button className="btn" type="submit">Log In</button>
            </fieldset>
        </form>
    )
}

export default Login
