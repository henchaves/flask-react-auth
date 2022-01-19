import React from "react";
import { cleanup, waitFor } from "@testing-library/react";

import Navbar from "../Navbar";

afterEach(cleanup);

describe("when unauthenticated", () => {
  it("renders the default props", async () => {
    const props = {
      title: "Hello, World!",
      handleLogout: () => {
        return true;
      },
      isAuthenticated: jest.fn().mockImplementation(() => false),
    };

    const { getByText, findByTestId } = renderWithRouter(<Navbar {...props} />);
    const title = getByText(props.title);
    expect(title).toHaveClass("nav-title");

    await waitFor(() => {
      expect(props.isAuthenticated).toHaveBeenCalledTimes(1);
    });

    expect((await findByTestId("nav-about")).innerHTML).toBe("About");
    expect((await findByTestId("nav-register")).innerHTML).toBe("Register");
    expect((await findByTestId("nav-login")).innerHTML).toBe("Log In");
  });

  it("renders", () => {
    const props = {
      title: "Hello, World!",
      handleLogout: () => {
        return true;
      },
      isAuthenticated: jest.fn().mockImplementation(() => false),
    };

    const { asFragment } = renderWithRouter(<Navbar {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("when authenticated", () => {
  it("renders the default props", async () => {
    const props = {
      title: "Hello, World!",
      handleLogout: () => {
        return true;
      },
      isAuthenticated: jest.fn().mockImplementation(() => true),
    };

    const { getByText, findByTestId } = renderWithRouter(<Navbar {...props} />);
    const title = getByText(props.title);
    expect(title).toHaveClass("nav-title");

    await waitFor(() => {
      expect(props.isAuthenticated).toHaveBeenCalledTimes(1);
    });

    expect((await findByTestId("nav-about")).innerHTML).toBe("About");
    expect((await findByTestId("nav-status")).innerHTML).toBe("User Status");
    expect((await findByTestId("nav-logout")).innerHTML).toBe("Log Out");
  });

  it("renders", () => {
    const props = {
      title: "Hello, World!",
      handleLogout: () => {
        return true;
      },
      isAuthenticated: jest.fn().mockImplementation(() => true),
    };

    const { asFragment } = renderWithRouter(<Navbar {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
