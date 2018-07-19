'''
Flask APPlication serving a RESTful api to a MySQL database
'''
import os
from flask import Flask

# pylint: disable=import-error
from flask_sqlalchemy import SQLAlchemy
from flask_restless import APIManager
from flask_cors import CORS


DB_NAME = os.environ.get("DB", None)
USER_NAME = os.environ.get("USER_NAME", None)
PASSWORD = os.environ.get("PASSWORD", None)
HOSTNAME = os.environ.get("HOST", None)
PORT = os.environ.get("PORT", None)
EXPOSE_ON_PORT = os.environ.get("EXPOSE_ON_PORT", "5000")


# Production database
DB_NAME = os.environ.get("DB", "testdb")
USER_NAME = os.environ.get("USER_NAME", "root")
PASSWORD = os.environ.get("PASSWORD", "downing")
HOSTNAME = os.environ.get(
    "HOST", "ec2-18-191-142-62.us-east-2.compute.amazonaws.com")
PORT = os.environ.get("PORT", "3306")


# Test database
# DB_NAME = "testdb"
# USER_NAME = "root"
# PASSWORD = "password"
# HOSTNAME = "fptestdbinstance.cydh8jzkegid.us-west-2.rds.amazonaws.com"
# PORT = None


print('Attempting to connect with the following credentials: ')
print('DB_NAME: ' + DB_NAME)
print('USER_NAME: ' + USER_NAME)
print('PASSWORD: ' + PASSWORD)
print('HOST: ' + HOSTNAME)
print('PORT: ' + PORT)
DB_CONNECTION = ''
if DB_NAME and USER_NAME and PASSWORD and HOSTNAME and PORT:
    # Prod database
    DB_CONNECTION = 'mysql://' + USER_NAME + ':' + \
        PASSWORD + '@' + HOSTNAME + ':' + PORT + '/' + DB_NAME
elif DB_NAME and USER_NAME and PASSWORD and HOSTNAME:
    # Test database
    DB_CONNECTION = 'mysql://' + USER_NAME + ':' + \
        PASSWORD + '@' + HOSTNAME + '/' + DB_NAME
else:
    # Local database
    DB_CONNECTION = 'sqlite:////tmp/test.DB'


APP = Flask(__name__)
CORS(APP)
APP.config['SQLALCHEMY_DATABASE_URI'] = DB_CONNECTION
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
DB = SQLAlchemy(APP)


# TABLES
class Charity(DB.Model):
    '''
    Charity table for FightPoverty DB. Contains all info on charity
    and links to county and city charity is in
    '''
    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.String(80), index=True, unique=True, nullable=False)
    mission_statement = DB.Column(DB.String(1250))
    cause = DB.Column(DB.String(50))

    city_id = DB.Column(DB.Integer, DB.ForeignKey('city.id'), nullable=False)
    city = DB.relationship(
        'City', backref=DB.backref('charities', lazy='dynamic'))

    county_id = DB.Column(DB.Integer, DB.ForeignKey(
        'county.id'), nullable=False)
    county = DB.relationship(
        'County', backref=DB.backref('charities', lazy='dynamic'))

    zip_code = DB.Column(DB.Integer)
    address = DB.Column(DB.String(80))

    charity_navigator_accountability_score = DB.Column(DB.Float)
    charity_navigator_financial_score = DB.Column(DB.Float)
    charity_navigator_score = DB.Column(DB.Float)

    fight_poverty_score = DB.Column(DB.Float)

    def __repr__(self):
        return 'Charity name %r' % self.name


class City(DB.Model):
    '''
    City table for FightPoverty DB. Contains all info on cities and links
    to the county the city is in.
    '''
    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.String(80), index=True, nullable=False)

    state = DB.Column(DB.String(40))

    county_id = DB.Column(DB.Integer, DB.ForeignKey(
        'county.id'), nullable=False)
    county = DB.relationship(
        'County', backref=DB.backref('cities', lazy='dynamic'))

    __table_args__ = (
        # Must have unique city/state combo
        DB.UniqueConstraint('name', 'state', name='city_state_index'),
    )


class County(DB.Model):
    '''
    County table for FightPoverty DB. Contains all info on counties.
    '''
    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.String(80), index=True, nullable=False)

    state = DB.Column(DB.String(40), nullable=False)

    county_poverty_percentage = DB.Column(DB.Float)
    county_poverty_population = DB.Column(DB.Integer)

    # Multiplier between 0.75 and 1.25 to multiply charity's charity_navigator_score
    # based on county it resides in's poverty stats
    fight_poverty_multiplier = DB.Column(DB.Float)

    __table_args__ = (
        # Must have unique county/state combo
        DB.UniqueConstraint('name', 'state', name='county_state_index'),
    )

# END TABLES


# Flask-Restless API manager
MANAGER = APIManager(APP, flask_sqlalchemy_db=DB)

# creates api at host:port/api/<name>
MANAGER.create_api(Charity, results_per_page=9)
MANAGER.create_api(City, results_per_page=9)
MANAGER.create_api(County, results_per_page=9)


@APP.route("/")
def hello():
    '''
    Welcome message to Fight poverty API
    '''
    return "Welcome to the Fight Poverty API!"


try:
    # Drop already created tables for testing purposes
    # DB.drop_all()

    # Create the database tables
    DB.create_all()
except Exception as exp:
    print('Failed to drop/create tables', exp)


if __name__ == "__main__":
    APP.debug = False
    APP.run(host='0.0.0.0', port=EXPOSE_ON_PORT)
