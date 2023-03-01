import './FindChar.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'

const FindChar = () => {
    return(
        <div className="find-char">
            <div className='find-char-title'>Or find a character by name:</div>
            <Formik
            initialValues={{character: ''}}
            validationSchema={Yup.object({
                character: Yup.string().required('This field is required')
            })}
            onSubmit={(values)=> console.log(values)}
            >
                <Form className='form'>
                    <Field className='input' type="text" name="character" id="character" placeholder="Enter name"/>
                    <ErrorMessage name='character' component='div'/>
                    <button className="btn-1" type="submit">FIND</button>
                </Form>
            </Formik>
        </div>
    )
}

export default FindChar