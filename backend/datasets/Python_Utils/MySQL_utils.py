'''
Provides function to connect to my sql database with credentials.
'''
import mysql.connector


DEFAULT_DB = ''
DEFAULT_USERNAME = ''
DEFAULT_PASSWORD = ''
DEFAULT_HOSTNAME = ''


def get_db_credentials():
    '''
    Function to get credentials to connect to a MySQL database.
    If no defaults set, gets user input.
    '''
    print("Enter credentials to connect to MySQL database...")
    db_name = DEFAULT_DB or raw_input("DB name: ")
    username = DEFAULT_USERNAME or raw_input("DB username: ")
    password = DEFAULT_PASSWORD or raw_input("DB password: ")
    hostname = DEFAULT_HOSTNAME or raw_input("DB hostname: ")

    return (db_name, username, password, hostname)


def connect_to_mysql_db(db_credentials):
    '''
    Function to connect to a MySQL database. Gets credentials
    if none passed to function.
    '''
    if db_credentials is None:
        db_credentials = get_db_credentials()

    (db_name, username, password, hostname) = db_credentials

    cnx = ''
    try:
        cnx = mysql.connector.connect(
            user=username,
            password=password,
            host=hostname,
            database=db_name
        )
    except Exception as exp:
        raise exp
    cur = cnx.cursor()

    return (cnx, cur)
