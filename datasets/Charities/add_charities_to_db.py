import json
import mysql.connector
from mysql.connector import errorcode

# iterate over all charities in json files, 
# query the database for city+state combo to get city id and county id


# Connect to SQL db
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

charities = []

# Grab charities from FoodBanks.json
with open("./FoodBanks.json") as f:
  charities = json.load(f)

# Grab charities from HomelessServices.json
with open("./HomelessServices.json") as f:
  charities += json.load(f)


array_of_tuples_to_insert = []


print('Getting all charities...')
for charity in charities :
  name = charity['charityName']
  mission_statement = charity['mission']
  cause = charity['cause']['causeName']

  accountability_score = charity['currentRating']['accountabilityRating']['score']
  financial_score = charity['currentRating']['financialRating']['score']
  charity_navigator_score = charity['currentRating']['score']
  
  # Temporarily before ranking set
  fight_poverty_score = charity_navigator_score

  charity_mailing_address = charity['mailingAddress']
  zip_code = str(int(charity_mailing_address['postalCode']))
  address = charity_mailing_address['streetAddress1']
  city = charity_mailing_address['city']
  
  state_abbrev = charity_mailing_address['stateOrProvince']
  state_name = ''
  with open("../States/states_by_abbrev_dict.json") as f:
    states_by_abbrev_dict = json.load(f)  
  state_name = ''
  if state_abbrev in states_by_abbrev_dict :
    state_name = states_by_abbrev_dict[state_abbrev]
  

  # Get county id and city id from database
  find_city_and_county_ids = 'SELECT county_id, id FROM city WHERE name="' + city + '" AND state="' + state_name + '"'
  cur.execute(find_city_and_county_ids)

  resp = cur.fetchall()
  
  county_id = resp[0][0]
  city_id = resp[0][1]
  
  tuple_to_insert = (
    name, 
    mission_statement, 
    cause, 
    accountability_score, 
    financial_score, 
    charity_navigator_score, 
    fight_poverty_score, 
    zip_code, 
    address, 
    county_id, 
    city_id
  )

  array_of_tuples_to_insert.append(tuple_to_insert)
  
print("Inserting into db...")
cur.executemany(
  "INSERT INTO charity ( \
    name, \
    mission_statement, \
    cause, \
    charity_navigator_accountability_score, \
    charity_navigator_financial_score, \
    charity_navigator_score, \
    fight_poverty_score, \
    zip_code, \
    address, \
    county_id, \
    city_id \
  ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
  array_of_tuples_to_insert
)
cnx.commit()
print("Done inserting...")

