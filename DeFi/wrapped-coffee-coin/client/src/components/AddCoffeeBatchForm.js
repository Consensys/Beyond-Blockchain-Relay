import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Container, Button } from "reactstrap";
import { ReactstrapInput } from "reactstrap-formik";

function Inputform(props) {
  const submitFn = props.onSubmitFn;
  return (
    <div>
      <h1>Add Coffee Batch:</h1>
      <Container style={{ paddingTop: "5px" }}>
        <Formik
          initialValues={{
            producer: "",
            address: "",
            amount: 0,
            description: ""
          }}
          validate={values => {
            let errors = {};
            if (!values.address) {
              errors.address = "Required";
            }
            if (!values.producer) {
              errors.producer = "Required";
            }
            if (!values.description) {
              errors.description = "Required";
            }
            if (!parseInt(values.amount) || parseInt(values.amount) <= 0) {
              errors.amunt = "Must be a positive value";
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
                name="producer"
                placeholder=" Producer Name"
                component={ReactstrapInput}
              />
              <Field
                type="text"
                name="address"
                placeholder="Producer Address"
                component={ReactstrapInput}
              />
              <Field
                type="number"
                name="amount"
                placeholder="Amount"
                component={ReactstrapInput}
              />
              <Field
                type="text"
                name="description"
                placeholder="Coffee Description"
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

function AddCoffeeBatchForm(props) {
  return <Inputform onSubmitFn={props.onCoffeeBatchAdd} />;
}

export default AddCoffeeBatchForm;
