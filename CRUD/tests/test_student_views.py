import json
from django.test import TestCase, Client
from CRUD.data.models.auth_model import auth_model
from CRUD.data.models.course_model import course_model
from CRUD.data.models.student_model import student_model
from unittest.mock import patch


class StudentViewsTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.auth_user = auth_model.objects.create(id=1, email="test@example.com")
        self.course = course_model.objects.create(id=1, coursename="Test Course")
        self.student = student_model.objects.create(
            id=1,
            name="kevin dodiya",
            email="kevin@example.com",
            course=self.course,
            created_by=self.auth_user,
        )

    def test_get_all_students_api(self):
        response = self.client.get(
            "/api/students/getall/", {"user_id": self.auth_user.id}
        )
        self.assertEqual(response.status_code, 200)
        json_data = response.json()
        self.assertIn("students", json_data)
        self.assertGreaterEqual(len(json_data["students"]), 1)

    @patch("CRUD.data.models.student_model.student_model.objects.get")
    def test_get_student_api(self, mock_get):
        mock_get.return_value = self.student
        response = self.client.get(f"/api/students/get/{self.student.id}/")
        self.assertEqual(response.status_code, 200)
        json_data = response.json()
        self.assertEqual(json_data["id"], self.student.id)
        self.assertEqual(json_data["name"], self.student.name)

    def test_add_student_api(self):
        payload = {
            "name": "kevin dodiya",
            "email": "kevin@example.com",
            "course": self.course.id,
            "created_by": self.auth_user.id,
        }
        response = self.client.post(
            "/api/students/add/",
            data=json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)
        json_data = response.json()
        self.assertEqual(json_data["name"], "kevin dodiya")
        self.assertEqual(json_data["email"], "kevin@example.com")
        self.assertEqual(json_data["course"], self.course.coursename)

    def test_update_student_api(self):
        payload = {
            "name": "kevin Updated",
            "email": "kevin_updated@example.com",
            "course": self.course.id,
        }
        response = self.client.put(
            f"/api/students/update/{self.student.id}/",
            data=json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        json_data = response.json()
        self.assertEqual(json_data["name"], "kevin Updated")
        self.assertEqual(json_data["email"], "kevin_updated@example.com")

    def test_delete_student_api(self):
        response = self.client.delete(f"/api/students/delete/{self.student.id}/")
        self.assertEqual(response.status_code, 200)
        json_data = response.json()
        self.assertEqual(json_data.get("message"), "Student deleted successfully")
        with self.assertRaises(student_model.DoesNotExist):
            student_model.objects.get(id=self.student.id)
