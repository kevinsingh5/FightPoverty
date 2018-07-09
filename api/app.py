from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restless import APIManager


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db' # database url
db = SQLAlchemy(app)


### TABLES
class Charity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    mission_statement = db.Column(db.String(300), nullable=True)
    cause = db.Column(db.String(40), unique=False)

    city_id = db.Column(db.Integer, db.ForeignKey('city.id'), nullable=False)
    city = db.relationship('City', backref=db.backref('charities', lazy='dynamic'))

    county_id = db.Column(db.Integer, db.ForeignKey('county.id'), nullable=False)
    county = db.relationship('County', backref=db.backref('charities', lazy='dynamic'))

    state = db.Column(db.String(40), unique=False)
    zip_code = db.Column(db.Integer, unique=False)
    accountability_rating = db.Column(db.Float, unique=False)
    financial_rating = db.Column(db.Float, unique=False)
    fight_poverty_rating = db.Column(db.Float, unique=False)

    def __repr__(self):
        return 'User %r' % self.username


class City(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)

    county_id = db.Column(db.Integer, db.ForeignKey('county.id'), nullable=False)
    county = db.relationship('County', backref=db.backref('cities', lazy='dynamic'))


class County(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)


### END TABLES


### Flask-Restless API manager
manager = APIManager(app, flask_sqlalchemy_db=db)

# creates api at host:port/api/<name>
manager.create_api(Charity)
manager.create_api(City)
manager.create_api(County)


@app.route("/")
def hello():
    print(Charity.query.all())
    charities = Charity.query.all()

    result = ''
    for charity in charities:
        print(str(charity))
        result = result + str(charity) + ' '

    print(result)

    return result


try: 
    # Drop already created tables for testing purposes
    db.drop_all()

    # Create the database tables
    db.create_all()
except Exception as exp:
    print(exp)


added_test_cities = False
try:
    if not added_test_cities:
        # test add county
        county = County(name='Travis')
        db.session.add(county)
        db.session.commit()

        # test add city
        city = City(name='Austin', county_id=1)
        db.session.add(city)
        db.session.commit()

        # test add charity
        charity = Charity(
            name='West Regional Food Bank',
            mission_statement='Feed the hungry',
            cause='Human Services',
            city_id=1,
            county_id=1,
            state='West State',
            zip_code=11111,
            accountability_rating=9.3,
            financial_rating=6.2,
            fight_poverty_rating=8.3
        )
        db.session.add(charity)
        db.session.commit()

        added_test_cities = True

except Exception as exp:
    print('')
    print(exp)
    print('')


if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0')
    