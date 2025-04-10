import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../presentation/auth/login_form';
import { login } from '../domain/auth/auth';
import { BrowserRouter } from 'react-router-dom';

// Mock the login function from the auth module
jest.mock('../domain/auth/auth');

// Create a mock for useNavigate from react-router-dom
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate,
}));

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: jest.fn(key => store[key] || null),
        setItem: jest.fn((key, value) => {
            store[key] = value.toString();
        }),
        clear: jest.fn(() => {
            store = {};
        }),
        removeItem: jest.fn(key => {
            delete store[key];
        })
    };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('LoginForm Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorageMock.clear();
    });

    const setup = () =>
        render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );

    test('renders email and password fields with login button', () => {
        setup();

        expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    });

    test('calls login and navigates on successful submission', async () => {
        // Mock a successful login response
        const mockUserData = {
            id: 1,
            userrole: 'student'
        };
        login.mockResolvedValueOnce(mockUserData);

        setup();

        // Fill in the form fields
        fireEvent.change(screen.getByLabelText(/Email Address/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByLabelText(/Password/i), {
            target: { value: 'password123' },
        });

        // Click the login button
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        // Expect the button to be disabled (loading state)
        expect(screen.getByRole('button')).toBeDisabled();

        // Wait for the login function to be called and navigation to occur
        await waitFor(() => {
            expect(login).toHaveBeenCalledWith('test@example.com', 'password123');
            expect(mockedNavigate).toHaveBeenCalledWith("/students");
        });

        // Check that localStorage was set correctly
        expect(localStorageMock.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUserData));
        expect(localStorageMock.setItem).toHaveBeenCalledWith('user_id', '1');
        expect(localStorageMock.setItem).toHaveBeenCalledWith('userrole', 'student');

        // Check that the success message is shown
        expect(screen.getByText(/Login successful!/i)).toBeInTheDocument();
    });

    test('displays error message on login failure', async () => {
        // Mock a failed login response
        login.mockRejectedValueOnce(new Error('Invalid credentials'));
        setup();

        // Fill in the form fields with incorrect credentials
        fireEvent.change(screen.getByLabelText(/Email Address/i), {
            target: { value: 'wrong@example.com' },
        });
        fireEvent.change(screen.getByLabelText(/Password/i), {
            target: { value: 'wrongpass' },
        });

        // Click the login button
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        // Wait for the error message to appear
        await waitFor(() => {
            expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
        });

        // Ensure button is re-enabled after failed login
        expect(screen.getByRole('button')).not.toBeDisabled();
    });

    test('removes message when close icon is clicked', async () => {
        // Mock a successful login response
        login.mockResolvedValueOnce({ id: 1, userrole: 'student' });
        setup();

        // Fill in the form fields
        fireEvent.change(screen.getByLabelText(/Email Address/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByLabelText(/Password/i), {
            target: { value: 'password123' },
        });

        // Click the login button
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        // Wait for the success message to appear
        const successMessage = await screen.findByText(/Login successful!/i);
        expect(successMessage).toBeInTheDocument();

        // Find and click the close icon
        const closeIcons = screen.getAllByTestId('close-icon');
        fireEvent.click(closeIcons[0]);

        // Wait for the success message to be removed
        await waitFor(() => {
            expect(screen.queryByText(/Login successful!/i)).not.toBeInTheDocument();
        });
    });

    test('automatically removes messages after 5 seconds', async () => {
        // Mock a successful login response
        login.mockResolvedValueOnce({ id: 1, userrole: 'student' });

        jest.useFakeTimers();
        setup();

        // Fill in the form fields
        fireEvent.change(screen.getByLabelText(/Email Address/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByLabelText(/Password/i), {
            target: { value: 'password123' },
        });

        // Click the login button
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        // Wait for the success message to appear
        await screen.findByText(/Login successful!/i);

        // Fast-forward time
        jest.advanceTimersByTime(5000);

        // Expect message to be removed
        await waitFor(() => {
            expect(screen.queryByText(/Login successful!/i)).not.toBeInTheDocument();
        });

        jest.useRealTimers();
    });

    test('register link navigates to registration page', () => {
        setup();

        const registerLink = screen.getByText(/Create an Account/i);
        expect(registerLink).toHaveAttribute('href', '/register');
    });
});
