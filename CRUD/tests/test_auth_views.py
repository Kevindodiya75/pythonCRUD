import unittest
import json
from unittest import mock
from django.test import TestCase
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password, check_password

from CRUD.data.models.auth_model import auth_model
from CRUD.data.repositories.auth_repository import (
    create_user,
    get_user_by_email,
    update_user,
    delete_user,
)
from CRUD.domain.entities.user_entity import AuthEntity
from CRUD.domain.repositories.auth_repository import (
    get_user_by_email as domain_get_user,
    create_user as domain_create_user,
    update_user as domain_update_user,
    delete_user as domain_delete_user,
)
from CRUD.domain.usecases.auth_usecase import (
    register_user,
    login_user,
    update_user_usecase,
    delete_user_usecase,
)
from CRUD.presentation.views.auth_view import login_api, register_api


# Rest of your test cases remain the same up to AuthControllerTestCase


class AuthControllerTestCase(TestCase):
    @mock.patch("CRUD.presentation.views.auth_view.login_user")  # Updated path
    def test_login_api_success(self, mock_login_user):
        """Test successful login API endpoint"""
        # Setup mock
        mock_user = AuthEntity(
            id=1,
            email="test@example.com",
            username="testuser",
            password="hashed_password",
            userrole="user",
        )
        mock_login_user.return_value = mock_user

        # Create mock request
        request = mock.MagicMock()
        request.method = "POST"
        request.body = '{"email":"test@example.com","password":"password123"}'

        # Call the function
        response = login_api(request)

        # Assertions
        self.assertIsInstance(response, JsonResponse)
        self.assertEqual(response.status_code, 200)

        # Parse the response content
        content = json.loads(response.content.decode("utf-8"))
        self.assertEqual(content["id"], 1)
        self.assertEqual(content["email"], "test@example.com")
        self.assertEqual(content["username"], "testuser")
        self.assertEqual(content["userrole"], "user")

    @mock.patch("CRUD.presentation.views.auth_view.login_user")  # Updated path
    def test_login_api_invalid_credentials(self, mock_login_user):
        """Test login API with invalid credentials"""
        # Setup mock
        mock_login_user.side_effect = Exception("Invalid credentials.")

        # Create mock request
        request = mock.MagicMock()
        request.method = "POST"
        request.body = '{"email":"test@example.com","password":"wrongpassword"}'

        # Call the function
        response = login_api(request)

        # Assertions
        self.assertIsInstance(response, JsonResponse)
        self.assertEqual(response.status_code, 400)

        # Parse the response content
        content = json.loads(response.content.decode("utf-8"))
        self.assertEqual(content["error"], "Invalid credentials.")

    def test_login_api_wrong_method(self):
        """Test login API with wrong HTTP method"""
        # Create mock request
        request = mock.MagicMock()
        request.method = "GET"

        # Call the function
        response = login_api(request)

        # Assertions
        self.assertIsInstance(response, JsonResponse)
        self.assertEqual(response.status_code, 405)

    @mock.patch("CRUD.presentation.views.auth_view.register_user")  # Updated path
    def test_register_api_success(self, mock_register_user):
        """Test successful register API endpoint"""
        # Setup mock
        mock_user = AuthEntity(
            id=1,
            email="new@example.com",
            username="newuser",
            password="hashed_password",
            userrole="user",
        )
        mock_register_user.return_value = mock_user

        # Create mock request
        request = mock.MagicMock()
        request.method = "POST"
        request.body = '{"email":"new@example.com","username":"newuser","password":"password123","role":"user"}'

        # Call the function
        response = register_api(request)

        # Assertions
        self.assertIsInstance(response, JsonResponse)
        self.assertEqual(response.status_code, 201)

        # Parse the response content
        content = json.loads(response.content.decode("utf-8"))
        self.assertEqual(content["id"], 1)
        self.assertEqual(content["email"], "new@example.com")
        self.assertEqual(content["username"], "newuser")
        self.assertEqual(content["userrole"], "user")

    @mock.patch("CRUD.presentation.views.auth_view.register_user")  # Updated path
    def test_register_api_user_exists(self, mock_register_user):
        """Test register API when user already exists"""
        # Setup mock
        mock_register_user.side_effect = Exception(
            "User with this email already exists."
        )

        # Create mock request
        request = mock.MagicMock()
        request.method = "POST"
        request.body = '{"email":"existing@example.com","username":"existinguser","password":"password123","role":"user"}'

        # Call the function
        response = register_api(request)

        # Assertions
        self.assertIsInstance(response, JsonResponse)
        self.assertEqual(response.status_code, 400)

        # Parse the response content
        content = json.loads(response.content.decode("utf-8"))
        self.assertEqual(content["error"], "User with this email already exists.")

    def test_register_api_wrong_method(self):
        """Test register API with wrong HTTP method"""
        # Create mock request
        request = mock.MagicMock()
        request.method = "GET"

        # Call the function
        response = register_api(request)

        # Assertions
        self.assertIsInstance(response, JsonResponse)
        self.assertEqual(response.status_code, 405)
