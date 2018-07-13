'''
Helps batch insert data into a mysql db. The user of this module is expected to
provide the SQL statement, as well as a function that constructs
the values that will be inserted into the database.
'''
import sys
# pylint: disable=relative-import
from mysql_utils import connect_to_mysql_db
from json_utils import read_json_file


# Connect to SQL db
(CNX, CUR) = connect_to_mysql_db(None)


# Get SQL query statement and record constructor
# Add path to allow importing from same level directory, then disable pylint import warning
sys.path.insert(0, raw_input(
    'Input path to SQL query statement and record constructor: '))
# pylint: disable=import-error, wrong-import-position, wrong-import-order
from sql_modules import SQL_QUERY, construct_sql_records


# Then get data will be inserting into SQL db from the json file
JSON_FILE_NAME = raw_input('Insert the following json file into SQL db: ')
DATA = read_json_file(JSON_FILE_NAME)


# Construct the query using SQL record constructor
ARRAY_OF_TUPLES_TO_INSERT = construct_sql_records(DATA, CUR)


# Batch insert into db
print("Inserting into db...")
CUR.executemany(
    SQL_QUERY,
    ARRAY_OF_TUPLES_TO_INSERT
)
CNX.commit()
print("Done inserting...")
