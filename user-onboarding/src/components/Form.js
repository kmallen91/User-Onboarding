import React, {useState, useEffect} from "react"
import {withFormik, Form, Field } from "formik"
import * as Yup from "yup"
import axios from "axios"


const UserForm = ({values, touched, errors, status}) => {
    const [users, setUser] = useState([])
    useEffect(()=> {
        if (status) {
            setUser([...users, status])
        }
    }, [status])

    return (
        <div>
            <Form className="user-form">
                <label className="form"> Name: 
                    <Field className="name"
                        type="text"
                        name="name"
                        placeholder="Name"
                        />
                </label>
                {touched.name && errors.name && <p className="error">{errors.name}</p>}
                <label className="form"> Email: 
                    <Field className="email"
                        type="text"
                        name="email"
                        placeholder="Email"
                        />
                </label>
                {touched.email && errors.email && <p className="error">{errors.email}</p>}
                <label className="form"> Password: 
                    <Field className="password"
                        type="password"
                        name="password"
                        placeholder=""
                        />
                </label>
                {touched.password && errors.password && <p className="error">{errors.password}</p>}
                <label className="form"> Terms of Service 
                    <Field className="terms"
                        type="checkbox"
                        name="terms"
                        checked={values.checkbox}
                        
                        />
                </label>
                {touched.terms && errors.terms && <p className="error">{errors.terms}</p>}
                <button className="button form"> Submit </button>

                <div className="user-info">
                {users.map(user => (
                    <ul key={user.id}>
                        <li>Name: {user.name}</li>
                        <li>Email: {user.email}</li>
                        
                        
                    </ul>
                ))}
                </div>
            
            
            </Form>
        
        </div>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, terms}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false,
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please enter your name."),
        email: Yup.string().email().required("Please enter a valid email."),
        password: Yup.string().min(6, "Password must exceed 6 charaters.").required("Password is required."),
        terms: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions')

    }),

    handleSubmit(values, {setStatus, resetForm}) {
        resetForm('');
        axios
        .post('https://reqres.in/api/users', values)
        .then(res => {
            setStatus(res.data)
            console.log(res.data)
        })
        .catch(err => console.log(err.res))
    }


})(UserForm)

export default FormikUserForm