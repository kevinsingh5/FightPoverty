import sys

# Use this to get counties and cities into database
# Note: does not use Python module insert_into_MySQL_db.py because that batch inserts.
# Need to add county first then use county id to add city immediately after and cannot
# do that with a batch insertion.

# What this module does:
# Iterate over entire zip_codes_detailed.json
# If zip code is in ../Charities/charity_locations.json, add county and its state to the SQL database
# Then use that added county's id to add the city/state to the SQL database


# Add path to allow importing from same level directory, then disable pylint import warning
sys.path.insert(0, "../Python_Utils")
# pylint: disable=F0401
from MySQL_utils import connect_to_db, get_db_input, get_username_input, get_password_input, get_hostname_input
from state_utils import get_state_name_from_abbrev
from json_utils import read_json_file


# Connect to SQL db
(cnx, cur) = connect_to_db(get_db_input, get_username_input, get_password_input, get_hostname_input)


# Get all zip codes from json file
all_zip_codes = read_json_file("./zip_codes_detailed.json")


# Get zip codes we have charities for
known_zip_codes = read_json_file("../Charities/charity_locations.json")


# If we know about this zip code, will add its county and city to SQL db
# If we have already added a city/state to DB, do not need to add county or city again
known_city_states = {}
known_county_states = {}


# Skip first one
all_zip_iter = iter(all_zip_codes)
all_zip_iter.next()


print('Expected completion time is ~2 minutes...')
for zip_code in all_zip_iter :
  actual_zip = str(int(zip_code[0]))
  
  if actual_zip in known_zip_codes :
    # city = zip_code[1]    
    # Using known_zip_codes instead because it comes from charity database. 
    # Charity db is preferred because will be searching database by city/state using charity's listed city/state
    city = known_zip_codes[actual_zip][0]
    state_abbrev = zip_code[2]
    county = zip_code[3]


    # Make sure this city/state has not been added already
    city_state_combo = city + state_abbrev
    if city_state_combo not in known_city_states :
      known_city_states[city_state_combo] = True


      # Get state name from abbrev
      state_name = get_state_name_from_abbrev(state_abbrev)


      # Add county/state
      county_id = 0
      county_state_combo = county + state_abbrev


      # Do not need to add county again if already added
      if county_state_combo not in known_county_states :
        insert_county_state_query = 'INSERT INTO county (name, state) VALUES ("' + county + '", "' + state_name + '")' 
        cur.execute(insert_county_state_query)
        county_id = cur.lastrowid
        known_county_states[county_state_combo] = county_id
      else :
        county_id = known_county_states[county_state_combo]
    

      # Add city/state using county id
      insert_city_state_query = 'INSERT INTO city (name, state, county_id) VALUES ("' + city + '", "' + state_name + '", ' + str(county_id) + ')' 
      cur.execute(insert_city_state_query)

cnx.commit()