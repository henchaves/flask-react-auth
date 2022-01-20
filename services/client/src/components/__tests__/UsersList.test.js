import React from "react";
import { render, cleanup } from "@testing-library/react";

import UsersList from "../UsersList";

afterEach(cleanup);

const users = [
  {
    email: "hermanmu@gmail.com",
    id: 1,
    username: "michael",
  },
  {
    email: "michael@mherman.org",
    id: 2,
    username: "michaelherman",
  },
];

describe("when authenticated", () => {
  const props = {
    users,
    removeUser: () => {
      return true;
    },
    isAuthenticated: () => {
      return true;
    },
  };

  it("renders a username", () => {
    const { getByText } = render(<UsersList {...props} />);
    expect(getByText("michael")).toHaveClass("username");
    expect(getByText("michaelherman")).toHaveClass("username");
  });

  it("renders", () => {
    const { asFragment } = render(<UsersList {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("when unauthenticated", () => {
  const props = {
    users,
    removeUser: () => {
      return true;
    },
    isAuthenticated: () => {
      return false;
    },
  };

  it("renders a username", () => {
    const { getByText } = render(<UsersList {...props} />);
    expect(getByText("michael")).toHaveClass("username");
    expect(getByText("michaelherman")).toHaveClass("username");
  });

  it("renders", () => {
    const { asFragment } = render(<UsersList {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
