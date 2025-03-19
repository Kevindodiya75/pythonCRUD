import json
import unittest
from unittest.mock import patch, MagicMock
from django.test import TestCase, Client
from django.http import JsonResponse
from CRUD.domain.entities.teacher_entity import TeacherEntity


class TeacherAPITests(TestCase):
    def setUp(self):
        # Set up test client
        self.client = Client()

        # Create a mock teacher entity for testing
        self.mock_teacher = TeacherEntity(
            id=1,
            name="John Doe",
            email="john.doe@example.com",
            subject="Mathematics",
            created_by="admin",
        )

        # Teacher data for POST/PUT requests
        self.teacher_data = {
            "name": "Jane Smith",
            "email": "jane.smith@example.com",
            "subject": "Science",
            "created_by": "admin",
        }

    # Fixed patch path to match actual module name (teacher_view not teacher_views)
    @patch("CRUD.presentation.views.teacher_view.list_all_teachers_usecase")
    def test_get_all_teachers_success(self, mock_list_all):
        # Configure mock to return a list of mock teachers
        mock_list_all.return_value = [self.mock_teacher]

        # Updated URL to match actual endpoint
        response = self.client.get("/api/teachers/getall/")

        # Check if the usecase was called
        mock_list_all.assert_called_once()

        # Verify response
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content)
        self.assertIn("teachers", response_data)
        self.assertEqual(len(response_data["teachers"]), 1)
        self.assertEqual(response_data["teachers"][0]["name"], "John Doe")

    @patch("CRUD.presentation.views.teacher_view.list_all_teachers_usecase")
    def test_get_all_teachers_exception(self, mock_list_all):
        # Configure mock to raise an exception
        mock_list_all.side_effect = Exception("Database error")

        # Updated URL to match actual endpoint
        response = self.client.get("/api/teachers/getall/")

        # Verify error response
        self.assertEqual(response.status_code, 400)
        response_data = json.loads(response.content)
        self.assertIn("error", response_data)

    def test_get_all_teachers_wrong_method(self):
        # Make POST request to GET endpoint - using the actual URL
        response = self.client.post("/api/teachers/getall/")

        # Verify method not allowed response
        self.assertEqual(response.status_code, 405)

    @patch("CRUD.presentation.views.teacher_view.get_teacher_usecase")
    def test_get_teacher_success(self, mock_get_teacher):
        # Configure mock to return a teacher
        mock_get_teacher.return_value = self.mock_teacher

        # Updated URL to match actual endpoint
        response = self.client.get("/api/teachers/get/1/")

        # Check if the usecase was called with correct ID
        mock_get_teacher.assert_called_once_with(1)

        # Verify response
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content)
        self.assertEqual(response_data["name"], "John Doe")
        self.assertEqual(response_data["subject"], "Mathematics")

    @patch("CRUD.presentation.views.teacher_view.get_teacher_usecase")
    def test_get_teacher_not_found(self, mock_get_teacher):
        # Configure mock to raise an exception
        mock_get_teacher.side_effect = Exception("Teacher not found")

        # Updated URL to match actual endpoint
        response = self.client.get("/api/teachers/get/999/")

        # Verify error response
        self.assertEqual(response.status_code, 404)
        response_data = json.loads(response.content)
        self.assertIn("error", response_data)

    @patch("CRUD.presentation.views.teacher_view.create_teacher_usecase")
    def test_add_teacher_success(self, mock_create_teacher):
        # Configure mock to return a teacher
        mock_create_teacher.return_value = self.mock_teacher

        # Updated URL to match actual endpoint
        response = self.client.post(
            "/api/teachers/add/",
            data=json.dumps(self.teacher_data),
            content_type="application/json",
        )

        # Check if the usecase was called with correct parameters
        mock_create_teacher.assert_called_once_with(
            self.teacher_data["name"],
            self.teacher_data["email"],
            self.teacher_data["subject"],
            self.teacher_data["created_by"],
        )

        # Verify response
        self.assertEqual(response.status_code, 201)
        response_data = json.loads(response.content)
        self.assertEqual(response_data["name"], "John Doe")  # The mock returns John Doe

    def test_add_teacher_missing_fields(self):
        # Create incomplete data
        incomplete_data = {
            "name": "Jane Smith",
            # Missing email, subject and created_by
        }

        # Updated URL to match actual endpoint
        response = self.client.post(
            "/api/teachers/add/",
            data=json.dumps(incomplete_data),
            content_type="application/json",
        )

        # Verify error response
        self.assertEqual(
            response.status_code, 400
        )  # Adjust based on your actual implementation

    @patch("CRUD.presentation.views.teacher_view.update_teacher_usecase")
    def test_update_teacher_success(self, mock_update_teacher):
        # Configure mock to return an updated teacher
        updated_teacher = TeacherEntity(
            id=1,
            name="Jane Smith",
            email="jane.smith@example.com",
            subject="Science",
            created_by="admin",
        )
        mock_update_teacher.return_value = updated_teacher

        # Updated URL to match actual endpoint
        response = self.client.put(
            "/api/teachers/update/1/",
            data=json.dumps(self.teacher_data),
            content_type="application/json",
        )

        # Check if the usecase was called with correct parameters
        mock_update_teacher.assert_called_once_with(
            1,
            self.teacher_data["name"],
            self.teacher_data["email"],
            self.teacher_data["subject"],
        )

        # Verify response
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content)
        self.assertEqual(response_data["name"], "Jane Smith")
        self.assertEqual(response_data["subject"], "Science")

    @patch("CRUD.presentation.views.teacher_view.update_teacher_usecase")
    def test_update_teacher_error(self, mock_update_teacher):
        # Configure mock to raise an exception
        mock_update_teacher.side_effect = Exception("Teacher not found")

        # Updated URL to match actual endpoint
        response = self.client.put(
            "/api/teachers/update/999/",
            data=json.dumps(self.teacher_data),
            content_type="application/json",
        )

        # Verify error response
        self.assertEqual(response.status_code, 400)
        response_data = json.loads(response.content)
        self.assertIn("error", response_data)

    @patch("CRUD.presentation.views.teacher_view.delete_teacher_usecase")
    def test_delete_teacher_success(self, mock_delete_teacher):
        # Updated URL to match actual endpoint
        response = self.client.delete("/api/teachers/delete/1/")

        # Check if the usecase was called with correct ID
        mock_delete_teacher.assert_called_once_with(1)

        # Verify response
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content)
        self.assertIn("message", response_data)
        self.assertEqual(response_data["message"], "Teacher deleted successfully")

    @patch("CRUD.presentation.views.teacher_view.delete_teacher_usecase")
    def test_delete_teacher_error(self, mock_delete_teacher):
        # Configure mock to raise an exception
        mock_delete_teacher.side_effect = Exception("Teacher not found")

        # Updated URL to match actual endpoint
        response = self.client.delete("/api/teachers/delete/999/")

        # Verify error response
        self.assertEqual(response.status_code, 400)
        response_data = json.loads(response.content)
        self.assertIn("error", response_data)


if __name__ == "__main__":
    unittest.main()
