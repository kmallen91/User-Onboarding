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
        <div className="user-form">
            <Form>
                <label> Name:
                    <Field
                        type="text"
                        name="name"
                        placeholder="Name"
                        />
                </label>
                {touched.name && errors.name && <p>{errors.name}</p>}
                <label> Email:
                    <Field
                        type="text"
                        name="email"
                        placeholder="Email"
                        />
                </label>
                {touched.email && errors.email && <p>{errors.email}</p>}
                <label> Password:
                    <Field
                        type="password"
                        name="password"
                        placeholder=""
                        />
                </label>
                {touched.password && errors.password && <p>{errors.password}</p>}
                <label> Terms of Service
                    <Field
                        type="checkbox"
                        name="terms"
                        checked={values.checkbox}
                        
                        />
                </label>
                {touched.terms && errors.terms && <p>{errors.terms}</p>}
                <button className="button"> Submit </button>

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

    handleSubmit(values, {setStatus}) {
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