import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Container, Button } from "reactstrap";
import { ReactstrapInput } from "reactstrap-formik";

function Inputform(props) {
  const submitFn = props.onSubmitFn;
  return (
    <div>
      <h1>Add Cooperative to Token Handler:</h1>
      <Container style={{ paddingTop: "5px" }}>
        <Formik
          initialValues={{
            cooperativeAddress: "",
          }}
          validate={values => {
            let errors = {};
            if (!values.cooperativeAddress) {
              errors.address = "Required";
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
                name="cooperativeAddress"
                placeholder="Cooperative Address"
                component={ReactstrapInput}
              />
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

function AddCooperativeForm(props) {
  return <Inputform onSubmitFn={props.onCooperativeAdd} />;
}

export default AddCooperativeForm;
