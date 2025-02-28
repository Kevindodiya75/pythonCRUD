from CRUD.data.models.course_model import course_model

def get_all_course():
    return course_model.objects.all()

def get_course_by_id(course_id):
    return course_model.objects.get(id=course_id)

def create_course(coursename):
    
    if course_model.objects.exists():
        last_course = course_model.objects.all().order_by('-id').first()
        new_id = last_course.id + 1
    else:
        new_id = 1  
    return course_model.objects.create(id=new_id ,coursename=coursename)

def update_course(course_id, coursename):
    course = course_model.objects.get(id=course_id)
    course.coursename = coursename
    course.save()
    return course

def delete_course(course_id):
    course = course_model.objects.get(id=course_id)
    course.delete()
