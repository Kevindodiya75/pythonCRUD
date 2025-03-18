import json
from django.test import TestCase, Client
from CRUD.data.models.course_model import course_model
from CRUD.data.models.auth_model import auth_model
from unittest.mock import patch


class CourseViewsTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.auth_user = auth_model.objects.create(id=1, email="test@example.com")
        self.course = course_model.objects.create(id=1, coursename="Test Course")
        self.course2 = course_model.objects.create(id=2, coursename="Another Course")

    def test_list_courses_api(self):
        response = self.client.get("/api/courses/getall/")
        self.assertEqual(response.status_code, 200)
        json_data = response.json()
        self.assertGreaterEqual(len(json_data), 2)
        course_names = [course["coursename"] for course in json_data]
        self.assertIn("Test Course", course_names)
        self.assertIn("Another Course", course_names)

    @patch("CRUD.data.models.course_model.course_model.objects.get")
    def test_get_course_api(self, mock_get):
        mock_get.return_value = self.course
        response = self.client.get(f"/api/courses/{self.course.id}/")
        self.assertEqual(response.status_code, 200)
        json_data = response.json()
        self.assertEqual(json_data["id"], self.course.id)
        self.assertEqual(json_data["coursename"], self.course.coursename)

    def test_add_course_api(self):
        payload = {"coursename": "New Test Course"}
        response = self.client.post(
            "/api/courses/add/",
            data=json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)
        json_data = response.json()
        self.assertEqual(json_data["coursename"], "New Test Course")

        new_course = course_model.objects.get(coursename="New Test Course")
        self.assertIsNotNone(new_course)

    def test_add_course_api_missing_name(self):
        payload = {}
        response = self.client.post(
            "/api/courses/add/",
            data=json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        json_data = response.json()
        self.assertIn("error", json_data)
        self.assertEqual(json_data["error"], "Course name is required.")

    def test_update_course_api(self):
        payload = {"coursename": "Updated Course Name"}
        response = self.client.put(
            f"/api/courses/update/{self.course.id}/",
            data=json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        json_data = response.json()
        self.assertEqual(json_data["id"], self.course.id)
        self.assertEqual(json_data["coursename"], "Updated Course Name")

        updated_course = course_model.objects.get(id=self.course.id)
        self.assertEqual(updated_course.coursename, "Updated Course Name")

    def test_update_course_api_missing_name(self):
        payload = {}  
        response = self.client.put(
            f"/api/courses/update/{self.course.id}/",
            data=json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        json_data = response.json()
        self.assertIn("error", json_data)
        self.assertEqual(json_data["error"], "Course name is required.")

    def test_delete_course_api(self):
        response = self.client.delete(f"/api/courses/delete/{self.course.id}/")
        self.assertEqual(response.status_code, 200)
        json_data = response.json()
        self.assertEqual(json_data.get("message"), "Course deleted successfully.")

        with self.assertRaises(course_model.DoesNotExist):
            course_model.objects.get(id=self.course.id)

    def test_delete_nonexistent_course_api(self):
        non_existent_id = 9999
        response = self.client.delete(f"/api/courses/delete/{non_existent_id}/")
        self.assertEqual(response.status_code, 404)
        content = response.content.decode()
        self.assertIn("Course not found", content)
