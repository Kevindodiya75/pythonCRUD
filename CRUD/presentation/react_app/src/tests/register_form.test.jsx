import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterForm from "../presentation/auth/register_form";
import { register } from "../domain/auth/auth";
import { BrowserRouter } from "react-router-dom";

// Mock the register function from the auth module
jest.mock("../domain/auth/auth");

// Create a mock for useNavigate from react-router-dom
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedNavigate,
}));

describe("RegisterForm Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const setup = () =>
        render(
            <BrowserRouter>
                <RegisterForm />
            </BrowserRouter>
        );

    test("renders all form fields and register button", () => {
        setup();

        // Verify the presence of text input fields and the register button.
        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Email$/i)).toBeInTheDocument();
        // Query the role select by its rendered role "combobox"
        expect(screen.getByRole("combobox")).toBeInTheDocument();
        expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Register Now/i })).toBeInTheDocument();

        // Verify the presence of the login link
        expect(screen.getByText(/Login Here/i)).toBeInTheDocument();
    });

    test("calls register and navigates on successful registration", async () => {
        // Simulate a successful registration response
        register.mockResolvedValueOnce({});
        setup();

        // Fill in the form fields
        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: "testuser" } });
        fireEvent.change(screen.getByLabelText(/^Email$/i), { target: { value: "test@example.com" } });

        // For the role select, query by its role ("combobox")
        const roleSelect = screen.getByRole("combobox");
        fireEvent.mouseDown(roleSelect);
        // Wait for the "Student" option to appear and click it
        const studentOption = await screen.findByText(/Student/i);
        fireEvent.click(studentOption);

        fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: "password123" } });
        fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: "password123" } });

        // Click the register button
        fireEvent.click(screen.getByRole("button", { name: /Register Now/i }));

        // Wait for the register function to be called and navigation to occur
        await waitFor(() => {
            expect(register).toHaveBeenCalledWith(
                "testuser",
                "test@example.com",
                "student",
                "password123",
                "password123"
            );
            expect(mockedNavigate).toHaveBeenCalledWith("/login");
        });

        // Verify that the success message is shown
        expect(screen.getByText(/Registration successful!/i)).toBeInTheDocument();
    });

    test("displays error message on registration failure", async () => {
        // Simulate a registration failure
        register.mockRejectedValueOnce(new Error("Registration failed"));
        setup();

        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: "testuser" } });
        fireEvent.change(screen.getByLabelText(/^Email$/i), { target: { value: "test@example.com" } });

        const roleSelect = screen.getByRole("combobox");
        fireEvent.mouseDown(roleSelect);
        const teacherOption = await screen.findByText(/Teacher/i);
        fireEvent.click(teacherOption);

        fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: "password123" } });
        fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: "password123" } });

        fireEvent.click(screen.getByRole("button", { name: /Register Now/i }));

        // Wait for the error message to appear
        await waitFor(() => {
            expect(screen.getByText(/Registration failed/i)).toBeInTheDocument();
        });
    });
});
