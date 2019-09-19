import React from "react"
import {withFormik, Form, Field, setNestedObjectValues} from "formik"
import * as Yup from "yup"


const UserForm = ({values}) => {


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
                <label> Email:
                    <Field
                        type="text"
                        name="email"
                        placeholder="Email"
                        />
                </label>
                <label> Password:
                    <Field
                        type="password"
                        name="password"
                        placeholder=""
                        />
                </label>
                <label> Terms of Service
                    <Field
                        type="checkbox"
                        name="terms"
                        checked={values.checkbox}
                        
                        />
                </label>
                <button className="button"> Submit </button>

            
            
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
    }


})(UserForm)

export default FormikUserForm