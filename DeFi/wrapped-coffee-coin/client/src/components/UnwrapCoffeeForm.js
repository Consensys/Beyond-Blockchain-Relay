import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Container, Button } from "reactstrap";
import { ReactstrapInput } from "reactstrap-formik";


function Inputform(props) {
  const submitFn = props.onSubmitFn;
  return (
    <div>
      <h2>Unwrap Coffee Token:</h2>
      <Container style={{ paddingTop: "5px" }}>
        <Formik
          initialValues={{
            address: "",
            tokenId: 0,
            amount: 0,
          }}
          validate={values => {
            let errors = {};
            if (!values.address) {
              errors.address = "Required";
            }
            if (!parseInt(values.tokenId) || parseInt(values.tokenId) < 0) {
              errors.tokenId = "Must be a positive value";
            }
            if (!parseInt(values.amount) || parseInt(values.amount) <= 0) {
              errors.amount = "Must be a positive value";
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
                name="address"
                placeholder="Producer Address"
                component={ReactstrapInput}
              />
              <Field
                type="number"
                name="tokenId"
                placeholder="Token Id"
                component={ReactstrapInput}
              />
              <Field
                type="number"
                name="amount"
                placeholder="Amount"
                component={ReactstrapInput}
              />
              <Button type="submit" color="primary" disabled={isSubmitting}>
                Unwrap Coffee Token
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
}

function UnwrapCoffeeForm(props) {
  return <Inputform onSubmitFn={props.onUnwrapCoffee} />;
}

export default UnwrapCoffeeForm;