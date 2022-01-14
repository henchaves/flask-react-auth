import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as Yup from "yup";

import "./form.css";

const LoginForm = (props) => {
  if (props.isAuthenticated()) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <h1 className="title is-1">Log In</h1>
      <hr />
      <br />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          props.handleLoginFormSubmit(values);
          resetForm();
          setSubmitting(false);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Enter a valid email.")
            .required("Email is required."),
          password: Yup.string().required("Password is required."),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          } = props;

          return (
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="input-email" className="label">
                  Email
                </label>
                <input
                  type="email"
                  id="input-email"
                  name="email"
                  className={
                    errors.email && touched.email ? "input error" : "input"
                  }
                  placeholder="Enter an email address"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </div>
              <div className="field">
                <label htmlFor="input-password" className="label">
                  Password
                </label>
                <input
                  type="password"
                  id="input-password"
                  name="password"
                  className={
                    errors.password && touched.password
                      ? "input error"
                      : "input"
                  }
                  placeholder="Enter a password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </div>
              <input
                type="submit"
                className="button is-primary"
                value="Submit"
                disabled={isSubmitting}
              />
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

LoginForm.propTypes = {
  handleLoginFormSubmit: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.func.isRequired,
};

export default LoginForm;
