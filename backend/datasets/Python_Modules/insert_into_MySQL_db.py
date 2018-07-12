import json
import mysql.connector
from mysql.connector import errorcode
import importlib
import sys
from MySQL_utils import connect_to_db, get_db_input, get_username_input, get_hostname_input, get_password_input


# First connect to SQL db
(cnx, cur) = connect_to_db(get_db_input, get_username_input, get_password_input, get_hostname_input)


# Get SQL query statement and record constructor
sys.path.insert(0, raw_input('Input path to SQL query statement and record constructor: '))
from sql_modules import sql_query, construct_sql_records


# Then get data will be inserting into SQL db from the json file
file_name = raw_input('Insert the following json file into SQL db: ')
with open(file_name) as f:
    data = json.load(f)


# Construct the query using SQL record constructor
array_of_tuples_to_insert = construct_sql_records(data, cur)


# Batch insert into db
print("Inserting into db...")
cur.executemany(
    sql_query,
    array_of_tuples_to_insert
)
cnx.commit()
print("Done inserting...")