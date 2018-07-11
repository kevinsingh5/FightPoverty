import json
import mysql.connector
from mysql.connector import errorcode
import importlib
import sys


# First connect to SQL db
print("Enter credentials to connect to MySQL database...")
db = raw_input("DB name: ")
username = raw_input("DB username: ")
password = raw_input("DB password: ")
hostname = raw_input("DB hostname: ")
cnx = ''
try:
    cnx = mysql.connector.connect(
        user=username, 
        password=password,
        host=hostname,
        database=db
    )
except Exception as exp:
    raise exp
cur = cnx.cursor()


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