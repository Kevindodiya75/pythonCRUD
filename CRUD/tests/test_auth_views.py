import json
from unittest.mock import patch, MagicMock
from django.test import TestCase
from django.http import JsonResponse
from CRUD.data.models.auth_model import auth_model
from CRUD.domain.entities.user_entity import AuthEntity
from CRUD.domain.usecases.auth_usecase import (
    register_user,
    login_user,
    update_user_usecase,
    delete_user_usecase,
)
from CRUD.presentation.views.auth_view import login_api, register_api


class AuthModelTestCase(TestCase):
    def test_str_method(self):
        user = auth_model(email="test@example.com")
        self.assertEqual(str(user), "test@example.com")


class AuthRepositoryTestCase(TestCase):
    @patch("CRUD.data.repositories.auth_repository.auth_model.objects")
    def test_create_user(self, mock_objects):
        from CRUD.data.repositories.auth_repository import create_user

        mock_user = MagicMock()
        mock_user.id = 1
        mock_objects.all.return_value.order_by.return_value.first.return_value = (
            mock_user
        )
        mock_objects.exists.return_value = True
        mock_objects.create.return_value = mock_user

        result = create_user("test@example.com", "testuser", "password123", "admin")

        mock_objects.create.assert_called_once()
        self.assertEqual(result, mock_user)

    @patch("CRUD.data.repositories.auth_repository.auth_model.objects")
    def test_get_user_by_email_found(self, mock_objects):
        from CRUD.data.repositories.auth_repository import get_user_by_email

        # Setup mock
        mock_user = MagicMock()
        mock_objects.get.return_value = mock_user

        # Call function
        result = get_user_by_email("test@example.com")

        # Assertions
        mock_objects.get.assert_called_with(email="test@example.com")
        self.assertEqual(result, mock_user)

    @patch("CRUD.data.repositories.auth_repository.auth_model.objects")
    def test_get_user_by_email_not_found(self, mock_objects):
        from CRUD.data.repositories.auth_repository import get_user_by_email

        mock_objects.get.side_effect = auth_model.DoesNotExist

        result = get_user_by_email("nonexistent@example.com")

        self.assertIsNone(result)

    @patch("CRUD.data.repositories.auth_repository.auth_model.objects")
    def test_update_user(self, mock_objects):
        from CRUD.data.repositories.auth_repository import update_user

        # Setup mock
        mock_user = MagicMock()
        mock_objects.get.return_value = mock_user

        # Call function
        result = update_user(1, "updated@example.com", "newpassword", "user")

        # Assertions
        mock_objects.get.assert_called_with(id=1)
        self.assertEqual(mock_user.email, "updated@example.com")
        self.assertTrue(mock_user.save.called)
        self.assertEqual(result, mock_user)

    @patch("CRUD.data.repositories.auth_repository.auth_model.objects")
    def test_delete_user(self, mock_objects):
        from CRUD.data.repositories.auth_repository import delete_user

        # Setup mock
        mock_user = MagicMock()
        mock_objects.get.return_value = mock_user

        # Call function
        delete_user(1)

        # Assertions
        mock_objects.get.assert_called_with(id=1)
        self.assertTrue(mock_user.delete.called)


class AuthUsecaseTestCase(TestCase):
    @patch("CRUD.domain.usecases.auth_usecase.get_user_by_email")
    @patch("CRUD.domain.usecases.auth_usecase.create_user")
    def test_register_user_success(self, mock_create_user, mock_get_user_by_email):
        # Setup mock
        mock_get_user_by_email.return_value = None
        mock_user = MagicMock()
        mock_user.id = 1
        mock_user.email = "test@example.com"
        mock_user.username = "testuser"
        mock_user.password = "hashedpassword"
        mock_user.userrole = "admin"
        mock_create_user.return_value = mock_user

        # Call function
        result = register_user("test@example.com", "testuser", "password123", "admin")

        # Assertions
        self.assertIsInstance(result, AuthEntity)
        self.assertEqual(result.email, "test@example.com")
        self.assertEqual(result.userrole, "admin")

    @patch("CRUD.domain.usecases.auth_usecase.get_user_by_email")
    def test_register_user_existing_email(self, mock_get_user_by_email):
        mock_get_user_by_email.return_value = MagicMock()

        with self.assertRaises(Exception) as context:
            register_user("existing@example.com", "testuser", "password123", "admin")

        self.assertEqual(str(context.exception), "User with this email already exists.")

    @patch("CRUD.domain.usecases.auth_usecase.get_user_by_email")
    @patch("CRUD.domain.usecases.auth_usecase.check_password")
    def test_login_user_success(self, mock_check_password, mock_get_user_by_email):
        # Setup mock
        mock_user = MagicMock()
        mock_user.id = 1
        mock_user.email = "test@example.com"
        mock_user.username = "testuser"
        mock_user.password = "hashedpassword"
        mock_user.userrole = "admin"
        mock_get_user_by_email.return_value = mock_user
        mock_check_password.return_value = True

        # Call function
        result = login_user("test@example.com", "password123")

        # Assertions
        self.assertIsInstance(result, AuthEntity)
        self.assertEqual(result.email, "test@example.com")

    @patch("CRUD.domain.usecases.auth_usecase.get_user_by_email")
    @patch("CRUD.domain.usecases.auth_usecase.check_password")
    def test_login_user_invalid_credentials(
        self, mock_check_password, mock_get_user_by_email
    ):
        # Setup mock
        mock_user = MagicMock()
        mock_get_user_by_email.return_value = mock_user
        mock_check_password.return_value = False

        # Call function and check exception
        with self.assertRaises(Exception) as context:
            login_user("test@example.com", "wrongpassword")

        self.assertEqual(str(context.exception), "Invalid credentials.")

    @patch("CRUD.domain.usecases.auth_usecase.update_user")
    def test_update_user_usecase(self, mock_update_user):
        # Setup mock
        mock_user = MagicMock()
        mock_user.id = 1
        mock_user.email = "updated@example.com"
        mock_user.password = "hashedpassword"
        mock_user.userrole = "user"
        mock_update_user.return_value = mock_user

        # Call function
        result = update_user_usecase(1, "updated@example.com", "newpassword", "user")

        # Assertions
        self.assertIsInstance(result, AuthEntity)
        self.assertEqual(result.email, "updated@example.com")

    @patch("CRUD.domain.usecases.auth_usecase.delete_user")
    def test_delete_user_usecase(self, mock_delete_user):
        # Call function
        result = delete_user_usecase(1)

        # Assertions
        mock_delete_user.assert_called_with(1)
        self.assertTrue(result)


class AuthApiTestCase(TestCase):
    @patch("CRUD.presentation.api.auth_api.login_user")
    def test_login_api_success(self, mock_login_user):
        # Setup mock
        mock_user = MagicMock()
        mock_user.id = 1
        mock_user.email = "test@example.com"
        mock_user.username = "testuser"
        mock_user.userrole = "admin"
        mock_login_user.return_value = mock_user

        # Mock request
        request = MagicMock()
        request.method = "POST"
        request.body = json.dumps(
            {"email": "test@example.com", "password": "password123"}
        ).encode()

        # Call function
        response = login_api(request)

        # Assertions
        self.assertIsInstance(response, JsonResponse)
        self.assertEqual(response.status_code, 200)
        content = json.loads(response.content)
        self.assertEqual(content["email"], "test@example.com")

    @patch("CRUD.presentation.api.auth_api.login_user")
    def test_login_api_invalid_credentials(self, mock_login_user):
        # Setup mock
        mock_login_user.side_effect = Exception("Invalid credentials.")

        # Mock request
        request = MagicMock()
        request.method = "POST"
        request.body = json.dumps(
            {"email": "test@example.com", "password": "wrongpassword"}
        ).encode()

        # Call function
        response = login_api(request)

        # Assertions
        self.assertIsInstance(response, JsonResponse)
        self.assertEqual(response.status_code, 400)
        content = json.loads(response.content)
        self.assertEqual(content["error"], "Invalid credentials.")

    @patch("CRUD.presentation.api.auth_api.register_user")
    def test_register_api_success(self, mock_register_user):
        # Setup mock
        mock_user = MagicMock()
        mock_user.id = 1
        mock_user.email = "new@example.com"
        mock_user.username = "newuser"
        mock_user.userrole = "user"
        mock_register_user.return_value = mock_user

        # Mock request
        request = MagicMock()
        request.method = "POST"
        request.body = json.dumps(
            {
                "email": "new@example.com",
                "username": "newuser",
                "password": "password123",
                "role": "user",
            }
        ).encode()

        # Call function
        response = register_api(request)

        # Assertions
        self.assertIsInstance(response, JsonResponse)
        self.assertEqual(response.status_code, 201)
        content = json.loads(response.content)
        self.assertEqual(content["email"], "new@example.com")

    @patch("CRUD.presentation.api.auth_api.register_user")
    def test_register_api_existing_email(self, mock_register_user):
        # Setup mock
        mock_register_user.side_effect = Exception(
            "User with this email already exists."
        )

        # Mock request
        request = MagicMock()
        request.method = "POST"
        request.body = json.dumps(
            {
                "email": "existing@example.com",
                "username": "existinguser",
                "password": "password123",
                "role": "user",
            }
        ).encode()

        # Call function
        response = register_api(request)

        # Assertions
        self.assertIsInstance(response, JsonResponse)
        self.assertEqual(response.status_code, 400)
        content = json.loads(response.content)
        self.assertEqual(content["error"], "User with this email already exists.")
