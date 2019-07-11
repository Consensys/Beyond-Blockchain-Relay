import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Container, Button } from "reactstrap";
import { ReactstrapInput } from "reactstrap-formik";


function Inputform(props) {
  const submitFn = props.onSubmitFn;
  return (
    <div>
      <h2>Wrap Coffee Token:</h2>
      <Container style={{ paddingTop: "5px" }}>
        <Formik
          initialValues={{
            address: "",
            tokenId: "",
          }}
          validate={values => {
            let errors = {};
            if (!values.address) {
              errors.address = "Required";
            }
            if (!parseInt(values.tokenId) || parseInt(values.tokenId) < 0) {
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
              <Button type="submit" color="primary" disabled={isSubmitting}>
                Wrap Coffee Token
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
}

function WrapCoffeeForm(props) {
  return <Inputform onSubmitFn={props.onWrapCoffee} />;
}

export default WrapCoffeeForm;
