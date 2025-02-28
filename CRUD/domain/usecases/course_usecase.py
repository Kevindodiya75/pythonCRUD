from CRUD.domain.repositories.course_repository import (
    create_course,
    update_course,
    delete_course,
    get_all_course,
    get_course_by_id
)
from CRUD.domain.entities.course_entity import CourseEntity

def create_course_usecase(coursename):
    course = create_course(coursename)
    return CourseEntity(id=course.id, coursename=course.coursename)

def update_course_usecase(course_id, coursename):
    course = update_course(course_id, coursename)
    return CourseEntity(id=course.id, coursename=course.coursename)

def delete_course_usecase(course_id):
    delete_course(course_id)
    return True

def list_courses_usecase():
    courses = get_all_course()
    return [CourseEntity(id=course.id, coursename=course.coursename) for course in courses]

def get_course_usecase(course_id):
    course = get_course_by_id(course_id)
    return CourseEntity(id=course.id, coursename=course.coursename)
