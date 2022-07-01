import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import {useNavigate} from 'react-router-dom'

const SignUp = ({onSignUp}) => {  
    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
        watch,
    } = useForm()

    const navigate = useNavigate()

    const onSubmit = (data, e) => {
        e.preventDefault()
        onSignUp(data, 'register')
        navigate('/')
    }

    const password = useRef({});
    password.current = watch("password", "");

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='authForm'>
            <fieldset className="form-group">
                <legend>Sign Up</legend>
                <input {...register('username', {
                    required: 'Please enter your username',
                    minLength: {
                        value: 2,
                        message: 'Username must contain 2 or more symbols'
                    },
                    maxLength: {
                        value: 20,
                        message: 'Username must be 20 or less symbols'
                    }
                })} placeholder='Username'/>
            </fieldset>
            <fieldset className="form-group">
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
                <input {...register('confirm_password', {
                    required: 'Please confirm your password',
                    validate: value =>
                        value === password.current || "The passwords do not match"
                })} placeholder='Confirm password'/>
            </fieldset>
            <fieldset className="form-group">
            <div>
                {errors[Object.keys(errors)[0]] && <p>{errors[Object.keys(errors)[0]].message}</p>}
            </div>
                <button className="btn" type="submit">Sign Up</button>
            </fieldset>
        </form>
    )
}

export default SignUp
