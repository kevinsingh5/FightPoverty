import os
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_restless import APIManager
from flask_cors import CORS
from sqlalchemy import *
from sqlalchemy.orm import *



# db_name = os.environ.get("DB", "testdb")
# username = os.environ.get("USER", "root")
# password = os.environ.get("PASSWORD", "downing")
# hostname = os.environ.get("HOST", "mysql01")
# port = os.environ.get("PORT", "3306")


db_name = os.environ.get("RDS_DB_NAME", "testdb")
username = os.environ.get("RDS_USERNAME", "root")
password = os.environ.get("RDS_PASSWORD", "password")
hostname = os.environ.get("RDS_HOSTNAME", "testdbinstance.cydh8jzkegid.us-west-2.rds.amazonaws.com")


db_connection = ''
# if db_name and username and password and hostname and port:
    # Prod database
#    db_connection = 'mysql+mysqldb://' + username + ':' + password + '@' + hostname + ':' + port + '/' + db_name
if db_name and username and password and hostname:
    # Test database
    db_connection = 'mysql://' + username + ':' + password + '@' + hostname + '/' + db_name
else :
    # Local database
    db_connection = 'sqlite:///C:\\Windows\\Temp\\test.db'


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = db_connection
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)


### TABLES
class Charity(db.Model):
    __tablename__ = 'Charity'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), index=True, unique=True, nullable=False)
    mission_statement = db.Column(db.String(1250))
    cause = db.Column(db.String(50))

    city_id = db.Column(db.Integer, db.ForeignKey('City.id'), nullable=False)
    city = db.relationship('City', backref=db.backref('Charity', lazy='dynamic'))

    county_id = db.Column(db.Integer, db.ForeignKey('County.id'), nullable=False)
    county = db.relationship('County', backref=db.backref('Charity', lazy='dynamic'))

    zip_code = db.Column(db.Integer)
    address = db.Column(db.String(80))
    
    charity_navigator_accountability_score = db.Column(db.Float)
    charity_navigator_financial_score = db.Column(db.Float)
    charity_navigator_score = db.Column(db.Float)

    fight_poverty_score = db.Column(db.Float)

    def __repr__(self):
        return 'Charity name %r' % self.name


class City(db.Model):
    __tablename__ = 'City'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), index=True, nullable=False)

    state = db.Column(db.String(40))

    county_id = db.Column(db.Integer, db.ForeignKey('County.id'), nullable=False)
    county = db.relationship('County', backref=db.backref('City', lazy='dynamic'))

    __table_args__ = (
        # Must have unique city/state combo
        db.UniqueConstraint('name', 'state', name='city_state_index'), 
    )


class County(db.Model):
    __tablename__ = 'County'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), index=True, nullable=False)

    state = db.Column(db.String(40), nullable=False)

    county_poverty_percentage = db.Column(db.Float)
    county_poverty_population = db.Column(db.Integer)

    __table_args__ = (
        # Must have unique county/state combo
        db.UniqueConstraint('name', 'state', name='county_state_index'), 
    )

### END TABLES


### Flask-Restless API manager
manager = APIManager(app, flask_sqlalchemy_db=db)

# creates api at host:port/api/<name>
manager.create_api(Charity, results_per_page=9)
manager.create_api(City, results_per_page=9)
manager.create_api(County, results_per_page=9)


@app.route("/")
def hello():
    return "Welcome to the Fight Poverty API!"


try: 
    # Drop already created tables for testing purposes
    # db.drop_all()

    # Create the database tables
    db.create_all()
except Exception as exp:
    print('Failed to drop/create tables', exp)


@app.route("/charity/city", methods=['GET'])
def get_charity_by_city_name():
    # take input_body and run SQL query to get charity by city name

    # return result of SQL query
    print(request.args.get('name', '') + " fdfdfdff")
    return str(City.query.order_by(City.name).all())


if __name__ == "__main__":
    app.debug = False
    app.run(host='0.0.0.0')
    
