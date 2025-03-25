import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

// Mock the LoginForm component
jest.mock("../presentation/auth/login_form", () => {
  return function MockLoginForm() {
    return <div data-testid="login-form">Mocked Login Form</div>;
  };
});

describe("App Component", () => {
  test("renders the app without crashing and displays the login form", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );

    // Check if the mocked login form is rendered
    const loginForm = screen.getByTestId("login-form");
    expect(loginForm).toBeInTheDocument();
  });
});
