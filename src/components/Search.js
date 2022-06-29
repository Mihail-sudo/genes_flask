import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Dropzone from './Dropzone'

const Search = ({getGenes}) => {

    const navigate = useNavigate()

    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
    } = useForm()

    const onSubmit = (data) => {
        getGenes(data.protein)
        navigate('answer')
    }

    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="form-group">
                <legend>Type proteins here</legend>
                <input {...register('protein')}/>
                <button className="btn" type="submit">Result</button>
            </fieldset>
        </form>
        <p className='searchPageElement'>OR</p>
        <Dropzone onSubmit={onSubmit}/>
        </div>
    )
}

export default Search
