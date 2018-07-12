from get_all_charities_from_jsons import get_all_charities_from_jsons
import sys


# Use this to insert charities into db AFTER inserted cities and counties
# Note: does not use Python module insert_into_MySQL_db.py because that batch inserts.
# Need to get county id and city id from db using charity's listed city/state

# What the module does:
# iterate over all charities in json files, 
# query the database for city+state combo to get city id and county id
# then add charity using all that info


# Add path to allow importing from same level directory, then disable pylint import warning
sys.path.insert(0, "../Python_Utils")
# pylint: disable=F0401
from MySQL_utils import connect_to_db, get_db_input, get_username_input, get_password_input, get_hostname_input
from state_utils import get_state_name_from_abbrev

# Connect to SQL db
(cnx, cur) = connect_to_db(get_db_input, get_username_input, get_password_input, get_hostname_input)


# Put all charities in an array
charities = get_all_charities_from_jsons()


# Will batch insert into SQL DB
array_of_tuples_to_insert = []

print('Getting all charities (expected completion time ~1 minute)...')
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
  state_name = get_state_name_from_abbrev(state_abbrev)
  

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

