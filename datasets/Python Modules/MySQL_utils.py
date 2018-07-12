import mysql.connector
from mysql.connector import errorcode


def get_db_credentials () :
  db = raw_input("DB name: ")
  username = raw_input("DB username: ")
  password = raw_input("DB password: ")
  hostname = raw_input("DB hostname: ")

  return (db, username, password, hostname)


def connect_to_db (db_credentials) :
  cnx = ''
  (db, username, password, hostname) = db_credentials
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

  return (cnx, cur)