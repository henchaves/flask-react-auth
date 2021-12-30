import React from "react";
import { cleanup } from "@testing-library/react";

import Navbar from "../Navbar";

afterEach(cleanup);

const title = "Hello, World!"

it("renders a title", () => {
  const { getByText } = renderWithRouter(<Navbar title={title} />);
  expect(getByText(title)).toHaveClass("nav-title");
});

it("renders", () => {
  const { asFragment } = renderWithRouter(<Navbar title={title} />);
  expect(asFragment()).toMatchSnapshot();
})