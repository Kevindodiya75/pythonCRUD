import { login, register } from "../domain/auth/auth";
import { loginApi, registerApi } from "../data/auth/auth_api";

jest.mock("../data/auth/auth_api", () => ({
  loginApi: jest.fn(),
  registerApi: jest.fn(),
}));

describe("Auth Functions", () => {
  describe("login", () => {
    test("throws error if email is missing", async () => {
      await expect(login("", "password123")).rejects.toThrow(
        "Email and password are required."
      );
    });

    test("throws error if password is missing", async () => {
      await expect(login("user@example.com", "")).rejects.toThrow(
        "Email and password are required."
      );
    });

    test("calls loginApi and returns result when email and password are provided", async () => {
      const fakeResponse = { token: "abc123" };
      loginApi.mockResolvedValueOnce(fakeResponse);

      const result = await login("user@example.com", "password123");
      expect(loginApi).toHaveBeenCalledWith("user@example.com", "password123");
      expect(result).toEqual(fakeResponse);
    });
  });

  describe("register", () => {
    test("throws error if passwords do not match", async () => {
      await expect(
        register("username", "user@example.com", "student", "pass1", "pass2")
      ).rejects.toThrow("Passwords do not match");
    });

    test("calls registerApi and returns result when passwords match", async () => {
      const fakeResponse = { id: 1, username: "username" };
      registerApi.mockResolvedValueOnce(fakeResponse);

      const result = await register(
        "username",
        "user@example.com",
        "student",
        "password",
        "password"
      );
      expect(registerApi).toHaveBeenCalledWith(
        "username",
        "user@example.com",
        "student",
        "password"
      );
      expect(result).toEqual(fakeResponse);
    });
  });
});
