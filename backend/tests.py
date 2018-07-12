import unittest
import datasets.Python_Utils.state_utils as state_utils
import datasets.Python_Utils.MySQL_utils as sql_utils
import mysql.connector

class TestPythonModules(unittest.TestCase):

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






if __name__ == '__main__':
    unittest.main()