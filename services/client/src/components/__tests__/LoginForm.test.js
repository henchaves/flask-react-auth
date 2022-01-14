import React from "react";
import { cleanup } from "@testing-library/react";

import LoginForm from "../LoginForm";

const props = {
  handleLoginFormSubmit: () => {
    return true;
  },
  isAuthenticated: () => {
    return false;
  },
};

afterEach(cleanup);

it("renders properly", () => {
  const { getByText } = renderWithRouter(<LoginForm {...props} />);
  expect(getByText("Log In")).toHaveClass("title");
});

it("renders with default props", () => {
  const { getByText, getByLabelText } = renderWithRouter(
    <LoginForm {...props} />
  );

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
  const { asFragment } = renderWithRouter(<LoginForm {...props} />);
  expect(asFragment()).toMatchSnapshot();
});
