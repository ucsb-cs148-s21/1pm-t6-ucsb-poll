import React from "react";
import { render} from "@testing-library/react";
import AppNavigationBar from "../../components/NavigationBar.js";
import { useAuth0 } from "@auth0/auth0-react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import useSWR from "swr";
jest.mock("@auth0/auth0-react");
jest.mock("swr");

describe("App navigation bar tests", () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      user: {email: "test@gmail.com"},
      isAuthenticated: true,
      //logout: jest.fn(),
      //loginWithRedirect: jest.fn(),
    });
    useSWR.mockReturnValue({
      data: {
        role: "member"
      }
    });
  });


  test("should render admin links when admin", () => {
    useSWR.mockReturnValue({
      data: {
        role: "admin"
      }
    });
    const { getByText } = render(
      <Router history={createMemoryHistory()}>
        <AppNavigationBar />
      </Router>
    );
    expect(getByText("Admin")).toBeInTheDocument();
  });

  test("should not render admin links when not admin", () => {
    useSWR.mockReturnValue({
      data: {
        role: "member"
      }
    });
    const { queryByText } = render(
      <Router history={createMemoryHistory()}>
        <AppNavigationBar />
      </Router>
    );
    expect(queryByText("Admin")).toBe(null);
  });

  

 
});