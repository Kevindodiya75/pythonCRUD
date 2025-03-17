import os
import unittest
import django

from tests.test_auth_views import (
    AuthModelTestCase,
    AuthRepositoryTestCase,
    AuthUsecaseTestCase,
    AuthApiTestCase,
)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "CRUD.tests")
django.setup()


def create_test_suite():
    test_suite = unittest.TestSuite()
    test_suite.addTest(unittest.makeSuite(AuthModelTestCase))
    test_suite.addTest(unittest.makeSuite(AuthRepositoryTestCase))
    test_suite.addTest(unittest.makeSuite(AuthUsecaseTestCase))
    test_suite.addTest(unittest.makeSuite(AuthApiTestCase))

    return test_suite


if __name__ == "__main__":
    runner = unittest.TextTestRunner(verbosity=2)
    test_suite = create_test_suite()
    runner.run(test_suite)
