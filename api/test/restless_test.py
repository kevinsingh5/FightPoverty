from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restless import APIManager

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)


# class Person(db.Model):
# 	id = db.Column(db.Integer, primary_key=True)
# 	name = db.Column(db.String(20))
# 	pets = db.relationship('Pet', backref='owner', lazy='dynamic')

# class Pet(db.Model):
# 	id = db.Column(db.Integer, primary_key=True)
# 	name = db.Column(db.String(20))
# 	owner_id = db.Column(db.Integer, db.ForeignKey('person.id'))

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return 'User %r' % self.username


manager = APIManager(app, flask_sqlalchemy_db=db)
manager.create_api(User)

@app.route("/")
def hello():
    print(User.query.all())
    users = User.query.all()

    result = ''
    for user in users:
        print(str(user))
        result = result + str(user) + ' '

    print(result)

    return result


try: 
    db.create_all()
    admin = User(username='adminuser', email='thesuperadmin@example.com')
    db.session.add(admin)
    db.session.commit()
except Exception as exp:
    print(exp)


if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0')
    