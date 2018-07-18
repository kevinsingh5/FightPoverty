import mysql.connector
from mysql.connector import errorcode


DEFAULT_DB = ''
DEFAULT_USERNAME = ''
DEFAULT_PASSWORD = ''
DEFAULT_HOSTNAME = ''


def get_db_input () :
    return DEFAULT_DB or raw_input("DB name: ")


def get_username_input () :
    return DEFAULT_USERNAME or raw_input("DB username: ")


def get_password_input () :
    return DEFAULT_PASSWORD or raw_input("DB password: ")


def get_hostname_input () :
    return DEFAULT_HOSTNAME or raw_input("DB hostname: ")


def get_db_credentials (get_db, get_username, get_password, get_hostname) :
    print("Enter credentials to connect to MySQL database...")
    db = get_db()
    username = get_username()
    password = get_password()
    hostname = get_hostname()

    return (db, username, password, hostname)


def connect_to_db (get_db, get_user_name, get_password, get_hostname) :
    (db, username, password, hostname) = get_db_credentials(get_db, get_user_name, get_password, get_hostname)
    
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

    return (cnx, cur)