import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LoginForm from '../presentation/auth/login_form';
import { login } from '../domain/auth/auth';

// Mock the dependencies
jest.mock('../domain/auth/auth', () => ({
    login: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('LoginForm Component', () => {
    // Reset mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    // Test rendering of the login form
    test('renders login form correctly', () => {
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );

        // Check if main elements are present
        expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
        expect(screen.getByText(/create an account/i)).toBeInTheDocument();
    });

    // Test successful login flow
    test('handles successful login', async () => {
        // Mock successful login response
        const mockUserData = {
            id: '123',
            userrole: 'student',
            name: 'Test User'
        };
        login.mockImplementation(() => new Promise(resolve => {
            setTimeout(() => resolve(mockUserData), 100);
        }));

        render(
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/students" element={<div>Students Dashboard</div>} />
                </Routes>
            </MemoryRouter>
        );

        // Fill out login form
        fireEvent.change(screen.getByLabelText(/email address/i), {
            target: { value: 'test@example.com' }
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'password123' }
        });

        // Submit form
        const loginButton = screen.getByRole('button', { name: /login/i });
        fireEvent.click(loginButton);

        // Verify button is disabled during submission
        expect(loginButton).toBeDisabled();

        // Wait for success message and check localStorage
        await waitFor(() => {
            expect(screen.getByText(/login successful!/i)).toBeInTheDocument();
            expect(localStorage.getItem('user')).toBe(JSON.stringify(mockUserData));
            expect(localStorage.getItem('user_id')).toBe('123');
            expect(localStorage.getItem('userrole')).toBe('student');
        });
    });

    // Test login failure
    test('handles login failure', async () => {
        // Mock login failure
        const errorMessage = 'Invalid credentials';
        login.mockRejectedValue(new Error(errorMessage));

        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );

        // Fill out login form
        fireEvent.change(screen.getByLabelText(/email address/i), {
            target: { value: 'test@example.com' }
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'wrongpassword' }
        });

        // Submit form
        const loginButton = screen.getByRole('button', { name: /login/i });
        fireEvent.click(loginButton);

        // Verify button is disabled during submission
        expect(loginButton).toBeDisabled();

        // Wait for error message
        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
            // Button should be re-enabled after error
            expect(loginButton).not.toBeDisabled();
        });
    });

    // Test loading state
    test('shows loading indicator during login submission', async () => {
        // Create a promise that resolves slowly to simulate network delay
        const slowLoginPromise = () => new Promise(resolve => {
            setTimeout(() => resolve({ id: '123', userrole: 'student' }), 1000);
        });
        login.mockImplementation(slowLoginPromise);

        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );

        // Fill out login form
        fireEvent.change(screen.getByLabelText(/email address/i), {
            target: { value: 'test@example.com' }
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'password123' }
        });

        // Submit form
        const loginButton = screen.getByRole('button', { name: /login/i });
        fireEvent.click(loginButton);

        // Check for loading indicator and disabled button
        expect(loginButton).toBeDisabled();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
});
