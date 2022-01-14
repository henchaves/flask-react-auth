import React from "react";
import { render, cleanup } from "@testing-library/react";

import LoginForm from "../LoginForm";

const props = {
  handleLoginFormSubmit: () => {
    return true
  }
}

afterEach(cleanup);

it("renders properly", () => {
  const { getByText } = render(<LoginForm />);
  expect(getByText("Log In")).toHaveClass("title");
});

it("renders with default props", () => {
  const { getByText, getByLabelText } = render(<LoginForm {...props} />);

  const emailInput = getByLabelText("Email");
  expect(emailInput).toHaveAttribute("type", "email");
  expect(emailInput).not.toHaveValue();

  const passwordInput = getByLabelText("Password");
  expect(passwordInput).toHaveAttribute("type", "password");
  expect(passwordInput).not.toHaveValue();

  const buttonInput = getByText("Submit");
  expect(buttonInput).toHaveValue("Submit");
});

it("renders", () => {
  const { asFragment } = render(<LoginForm />);
  expect(asFragment()).toMatchSnapshot();
});
