import React from "react";
import {connect} from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// react actions
import {login, register} from "redux/modules/auth";

import './Auth.scss';

const baseSchemaObj = {
  email: Yup.string().email('Invalid email').required('Email is Required'),
  password: Yup.string().required('Password is Required')
}

const loginSchema = Yup.object().shape(baseSchemaObj);

const registerSchema = Yup.object().shape({
  ...baseSchemaObj, 
  organisationName: Yup.string().required('Organisation Name is Required')});

function Auth({
  login, register, auth, history
}) {

  const {isLoading} = auth;

  return <div className="Auth">
    <div className="Login">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={(values, { setSubmitting }) => {
          login(values, () => {
            history.push('/');
          });
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form >
            <p className="form-title">Login</p>
            <div className="form-group">
              <label className="form-label">Email</label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="error-msg" />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <Field type="password" name="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="error-msg"/>
            </div>

            <button type="submit" className="form-button" disabled={!isValid || isLoading}>
              Login
           </button>
          </Form>
        )}
      </Formik>
    </div>
    <div className="vertical-line"></div>
    <div className="Register">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={registerSchema}
        onSubmit={(values) => {
          register(values);
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form >
          <p className="form-title">Register</p>
            <div className="form-group">
                <label className="form-label">Organisation Name</label>
                <Field type="text" name="organisationName" className="form-control" />
                <ErrorMessage name="organisationName" component="div" className="error-msg" />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="error-msg" />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <Field type="password" name="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="error-msg" />
            </div>

            <button type="submit" className="form-button" disabled={!isValid || isLoading}>
              Submit
           </button>
          </Form>
        )}
      </Formik>
    </div>
  </div>
};

export default connect(({
auth
}) => ({
auth
}), {
  login, 
  register
})(Auth);