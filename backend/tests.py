'''
Module to run tests on Python modules used to set up backend
'''

import os
import unittest
import mysql.connector
import requests

# pylint: disable=relative-import
import datasets.Python_Utils.json_utils as json_utils
import datasets.Python_Utils.state_utils as state_utils
import datasets.Python_Utils.mysql_utils as sql_utils


class TestPythonUtils(unittest.TestCase):
    '''
    Unit testing all Python utils used to set up backend
    '''
    def test_json_scraper(self):
        print("test")

    def test_json_utils(self):
        '''
        Testing write_json_file and read_json_file by writing
        temp_dict to temp_test_file and reading file
        '''
        test_dict = {"test_key": "test_val"}
        temp_test_file = "./temp_json_test_file.json"

        # Write test_dict to temp_test_file
        json_utils.write_json_file(temp_test_file, test_dict)

        # Read temp_json_test_file.json to get dict
        dict_in_temp_test_file = json_utils.read_json_file(temp_test_file)

        # Make sure json reader returns original test_dict from file
        self.assertEqual(dict_in_temp_test_file, test_dict)

        # Clean up and delete temp test file
        os.remove(temp_test_file)

    def test_state_name_from_abbrev(self):
        '''
        Testing util that gets a state's name from its abbreviation
        '''
        texas = state_utils.get_state_name_from_abbrev('TX')
        self.assertEqual(texas, 'Texas')

        california = state_utils.get_state_name_from_abbrev('CA')
        self.assertEqual(california, 'California')

        puerto_rico = state_utils.get_state_name_from_abbrev('PR')
        self.assertEqual(puerto_rico, 'Puerto Rico Commonwealth')

    def test_state_name_from_num(self):
        '''
        Testing util that gets a state's name from its number
        '''
        alabama = state_utils.get_state_name_from_num('1')
        self.assertEqual(alabama, 'Alabama')

        new_jersey = state_utils.get_state_name_from_num('34')
        self.assertEqual(new_jersey, 'New Jersey')

        indiana = state_utils.get_state_name_from_num('18')
        self.assertEqual(indiana, 'Indiana')

    def test_sql_utils(self):
        '''
        Testing utils used to interact with sql database
        '''
        db_credentials = (
            "testdb",
            "root",
            "password",
            "testdbinstance.cydh8jzkegid.us-west-2.rds.amazonaws.com"
        )

        (cnx, cur) = sql_utils.connect_to_mysql_db(db_credentials)

        # Checks if connected properly
        self.assertTrue(isinstance(
            cnx, mysql.connector.connection.MySQLConnection
        ))

        self.assertTrue(isinstance(cur, mysql.connector.cursor.MySQLCursor))

    def test_flask_restless(self):
        '''
        Testing flask restless app is returning expected value
        '''
        flaskless_app_server = 'http://ec2-18-191-142-62.us-east-2.compute.amazonaws.com/'
        resp = requests.get(flaskless_app_server).content

        self.assertEqual(resp, 'Welcome to the Fight Poverty API!')


if __name__ == '__main__':
    unittest.main()
