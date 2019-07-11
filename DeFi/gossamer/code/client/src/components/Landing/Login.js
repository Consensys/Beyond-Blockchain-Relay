import React from 'react';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import schemas from '../../actions/validationSchemas';

export default class Login extends React.Component {
  signupAndStoreUserData = async (values) => {
    // Need to catch if there is an error with signup
    await this.props.auth.signup(values.email, values.password, values.name);
    const postData = values;
    const postObj = {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await fetch('/createAccount', postObj);
  }

  login = values => this.props.auth.login(values.email, values.password);

  render() {
    return (
      <div className="login-wrapper">

      <div className="test-auth-form">
        <h1 className="big-text--bold">Create an account</h1>
        <Formik
          validationSchema={schemas.signup} validateOnChange={true} validateOnBlur={true}
          initialValues={{
            email: '',
            password: '',
            name: '',
          }}
          onSubmit={(values) => {
            this.signupAndStoreUserData(values);
          }} >

      { ({ isSubmitting }) => (
        <Form>
          <div className="col-3 input-effect landing-page-input">
            <Field name="name" type="text" className="effect-20" placeholder="First name"/>
            <label>First name</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
          <ErrorMessage name="name">
            {errorMessage => <div className="error-text">{errorMessage}</div>}
          </ErrorMessage>

          <div className="col-3 input-effect landing-page-input">
            <Field name="email" type="email" className="effect-20" placeholder="Your email" />
            <label>Your email</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
          <ErrorMessage name="email" >
            {errorMessage => <div className="error-text">{errorMessage}</div>}
          </ErrorMessage>

          <div className="col-3 input-effect landing-page-input">
            <Field name="password" type="password" className="effect-20" placeholder="Choose a password"/>
            <label>Your password</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
          <ErrorMessage name="password">
            {errorMessage => <div className="error-text">{errorMessage}</div>}
          </ErrorMessage>
          <button className="button" type="submit">Submit</button>
        </Form>
      )}
      </Formik>
    </div>
    <div className="test-auth-form">
          <h1 className="big-text--bold">Log in</h1>
          <Formik
            validationSchema={schemas.login}
            validateOnChange={true}
            validateOnBlur={true}
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={(values) => { this.login(values); }}
          >

          { ({ isSubmitting }) => (
            <Form>
              <div className="col-3 input-effect landing-page-input">
                <Field name="email" type="email" className="effect-20" autoComplete="username" placeholder="Your email" />
                <label>Your email</label>
                  <span className="focus-border">
                    <i></i>
                  </span>
              </div>
              <ErrorMessage name="email" >
                {errorMessage => <div className="error-text">{errorMessage}</div>}
              </ErrorMessage>

              <div className="col-3 input-effect landing-page-input">
                <Field name="password" type="password" className="effect-20" autoComplete="current-password" placeholder="Your password"/>
                <label>Your password</label>
                  <span className="focus-border">
                    <i></i>
                  </span>
              </div>
              <ErrorMessage name="password">
                {errorMessage => <div className="error-text">{errorMessage}</div>}
              </ErrorMessage>
              <button className="button" type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>

      </div>
    );
  }
}
