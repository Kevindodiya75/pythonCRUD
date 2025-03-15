import CRUD.data.repositories.course_repository as course_repo


def get_all_course():
    return course_repo.get_all_course()


def get_course_by_id(course_id):
    return course_repo.get_course_by_id(course_id)


def create_course(coursename):
    return course_repo.create_course(coursename)


def update_course(course_id, coursename):
    return course_repo.update_course(course_id, coursename)


def delete_course(course_id):
    return course_repo.delete_course(course_id)
