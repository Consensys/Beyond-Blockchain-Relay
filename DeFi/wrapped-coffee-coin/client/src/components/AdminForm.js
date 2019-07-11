import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Container, Button } from "reactstrap";
import { ReactstrapInput } from "reactstrap-formik";

function Inputform(props) {
  console.log("TCL: Inputform -> props", props);
  const submitFn = props.onSubmitFn;

  console.log(
    "TCL: Inputform -> props.wrappedContractAddress",
    props.wrappedContractAddress
  );
  return (
    <div>
      <h1>Update Token Handler Settings:</h1>
      <p>Recommended Address: {props.wrappedContractAddress}</p>
      <Container style={{ paddingTop: "5px" }}>
        <Formik
          initialValues={{
            wrapperAddress: ""
          }}
          validate={values => {
            let errors = {};
            if (!values.wrapperAddress) {
              errors.wrapperAddress = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            submitFn(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                type="text"
                name="wrapperAddress"
                placeholder="ERC20 Token Address"
                component={ReactstrapInput}
              />
              <ErrorMessage name="wrapperAddress" component="div" />

              <Button type="submit" color="primary" disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
}

function AdminForm(props) {
  return (
    <Inputform
      onSubmitFn={props.updateHandlerERC20}
      wrappedContractAddress={props.wrappedContractAddress}
    />
  );
}

export default AdminForm;
