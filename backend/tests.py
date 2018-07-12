import unittest
import datasets.Python_Utils.json_utils as json_utils
import os
import datasets.Python_Utils.state_utils as state_utils
import datasets.Python_Utils.MySQL_utils as sql_utils
import mysql.connector
import requests


class TestPythonUtils(unittest.TestCase):

    def test_json_utils(self):
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
        self.assertEqual(state_utils.get_state_name_from_abbrev('TX'), 'Texas')
        self.assertEqual(state_utils.get_state_name_from_abbrev('CA'), 'California')
        self.assertEqual(state_utils.get_state_name_from_abbrev('PR'), 'Puerto Rico Commonwealth')


    def test_state_name_from_num(self):
        self.assertEqual(state_utils.get_state_name_from_num('1'), 'Alabama')
        self.assertEqual(state_utils.get_state_name_from_num('34'), 'New Jersey')
        self.assertEqual(state_utils.get_state_name_from_num('18'), 'Indiana')

    
    def test_sql_utils(self):
        get_db_credentials_funcs = (lambda: "testdb", lambda: "root", lambda: "password", lambda: "testdbinstance.cydh8jzkegid.us-west-2.rds.amazonaws.com")
        expected_db_credentials = ("testdb", "root", "password", "testdbinstance.cydh8jzkegid.us-west-2.rds.amazonaws.com")

        self.assertEqual(sql_utils.get_db_credentials(*get_db_credentials_funcs), expected_db_credentials)

        (cnx, cur) = sql_utils.connect_to_db(*get_db_credentials_funcs)

        self.assertEqual(type(cnx) is mysql.connector.connection.MySQLConnection, True)
        self.assertEqual(type(cur) is mysql.connector.cursor.MySQLCursor, True)


    def test_flask_restless(self):
        flaskless_app_server = 'http://ec2-18-191-142-62.us-east-2.compute.amazonaws.com/'
        resp = requests.get(flaskless_app_server).content

        self.assertEqual(resp, 'Welcome to the Fight Poverty API')


if __name__ == '__main__':
    unittest.main()