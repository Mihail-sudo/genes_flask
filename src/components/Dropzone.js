import React from 'react'
import {useDropzone} from 'react-dropzone'

const Dropzone = ({onSubmit}) => {

    const {getRootProps, getInputProps} = useDropzone({
        onDrop: (files) => {
            const reader = new FileReader()
            reader.onload = () => {
                onSubmit({protein: reader.result})
            }
            reader.readAsText(files[0]);
        }
    })
    return (
        <div className='searchPageElement dropzone' {...getRootProps()}>
            <input {...getInputProps()}/>
            <p>Drop or select file</p>
        </div>
    )
}

export default Dropzone
