import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App Component", () => {
  test("renders without crashing", () => {
    render(<App />);
  });

  test("redirects from / to /login and renders login page", () => {
    // Set the browser history to "/" before rendering
    window.history.pushState({}, "Test page", "/");
    render(<App />);
    // Expect the login form to be rendered (e.g., "Welcome Back" heading)
    const welcomeHeading = screen.getByText(/Welcome Back/i);
    expect(welcomeHeading).toBeInTheDocument();
  });

  test("renders register page when navigating to /register", () => {
    // Set the browser history to "/register" before rendering
    window.history.pushState({}, "Test page", "/register");
    render(<App />);
    // Verify that the register form renders with the heading "Create Account"
    const registerHeading = screen.getByText(/Create Account/i);
    expect(registerHeading).toBeInTheDocument();
    // Verify the presence of the login link ("Login Here")
    const loginLink = screen.getByText(/Login Here/i);
    expect(loginLink).toBeInTheDocument();
  });
});
