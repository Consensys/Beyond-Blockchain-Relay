import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Container, Button } from "reactstrap";
import { ReactstrapInput } from "reactstrap-formik";

function Inputform(props) {
  const submitFn = props.onSubmitFn;
  const handlerAddress = props.handlerAddress;
  return (
    <div>
      <h1>Unwrap Approve:</h1>
      <h4>Coffee token Handler: {handlerAddress} </h4>
      <Container style={{ paddingTop: "5px" }}>
        <Formik
          initialValues={{
            amount: ""
          }}
          validate={values => {
            let errors = {};
            if (!parseInt(values.amount) || parseInt(values.amount) <= 0) {
              errors.tokenId = "Must be a positive value";
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
                type="number"
                name="amount"
                placeholder="Amount"
                component={ReactstrapInput}
              />
              <Button type="submit" color="primary" disabled={isSubmitting}>
                Approve
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
}

function ApproveForm(props) {
  return (
    <Inputform
      onSubmitFn={props.onApprove}
      handlerAddress={props.handlerAddress}
    />
  );
}

export default ApproveForm;
