import React from "react";
import { cleanup } from "@testing-library/react";

import Navbar from "../Navbar";

afterEach(cleanup);

const props = {
  title: "Hello, World!",
  handleLogout: () => {
    return true;
  },
};

it("renders a title", () => {
  const { getByText } = renderWithRouter(<Navbar {...props} />);
  const title = getByText(props.title);
  expect(title).toHaveClass("nav-title");
});

it("renders", () => {
  const { asFragment } = renderWithRouter(<Navbar {...props} />);
  expect(asFragment()).toMatchSnapshot();
});
