import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Container, Button } from "reactstrap";
import { ReactstrapInput } from "reactstrap-formik";

function Inputform(props) {
  const submitFn = props.onSubmitFn;
  const handlerAddress = props.handlerAddress;
  return (
    <div>
      <h1>Wrap Approve:</h1>
      <h4>Coffee token Handler: {handlerAddress} </h4>
      <Container style={{ paddingTop: "5px" }}>
        <Formik
          initialValues={{
            tokenId: "",
          }}
          validate={values => {
            let errors = {};
            if (!parseInt(values.tokenId) || parseInt(values.tokenId) < 0) {
              errors.tokenId = "Must be zero or a positive value";
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
                name="tokenId"
                placeholder="Token Id"
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
  return <Inputform onSubmitFn={props.onApprove}  handlerAddress={props.handlerAddress} />;
}

export default ApproveForm;
