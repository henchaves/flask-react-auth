import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as Yup from "yup";

import "./form.css";

const RegisterForm = (props) => {
  if (props.isAuthenticated()) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <h1 className="title is-1">Register</h1>
      <hr />
      <br />
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          props.handleRegisterFormSubmit(values);
          resetForm();
          setSubmitting(false);
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .required("Username is required.")
            .min(6, "Username must be greater than 5 characters."),
          email: Yup.string()
            .email("Enter a valid email.")
            .required("Email is required.")
            .min(6, "Email must be greater than 5 characters."),
          password: Yup.string()
            .required("Password is required.")
            .min(11, "Password must be greater than 10 characters."),
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
                <label htmlFor="input-username" className="label">
                  Username
                </label>
                <input
                  type="text"
                  id="input-username"
                  name="username"
                  className={
                    errors.username && touched.username
                      ? "input error"
                      : "input"
                  }
                  placeholder="Enter a username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.username && touched.username && (
                  <div className="input-feedback">{errors.username}</div>
                )}
              </div>
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

RegisterForm.propTypes = {
  handleRegisterFormSubmit: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.func.isRequired,
};

export default RegisterForm;
