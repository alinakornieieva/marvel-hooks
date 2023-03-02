import { useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import './FindChar.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { NavLink } from 'react-router-dom';

const FindChar = () => {
    const [charByName, setCharByName] = useState(null)
    const {error, fetching, getCharByName, clearError} = useMarvelService()
    const updateChar = (name) => {
        clearError()
        getCharByName(name).then(onCharLoaded)
    }
    const onCharLoaded = (char) => {
        setCharByName(char)
    }
    const results = !charByName ? null : charByName.length > 0 ? 
    <div><NavLink to={`/characters/${charByName[0].id}`}><button type='button' className='btn-2'>TO PAGE</button></NavLink></div> : 
    <div>Page wasn`t found</div>
    return(
        <div className="find-char">
            <div className='find-char-title'>Or find a character by name:</div>
            <Formik
            initialValues={{character: ''}}
            validationSchema={Yup.object({
                character: Yup.string().required('This field is required')
            })}
            onSubmit={({character})=> updateChar(character)}
            >
                <Form className='form'>
                    <Field className='input' type="text" name="character" id="character" placeholder="Enter name"/>
                    <ErrorMessage name='character' component='div'/>
                    <button className="btn-1" type="submit">FIND</button>
                    {results}
                </Form>
            </Formik>
        </div>
    )
}

export default FindChar