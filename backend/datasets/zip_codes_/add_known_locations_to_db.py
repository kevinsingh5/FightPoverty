'''
Use this to get counties and cities into database.
Note: does not use ../python_utils/insert_into_mysql_db.py because that batch inserts.
Need to add county first then use county id to add city immediately after and cannot
do that with a batch insertion.

What this module does:
    - Iterates over entire zip_codes_detailed.json
    - If zip code is in ../charities/charity_locations.json, add county and state to SQL database
    - Then use that added county's id to add the city/state to the SQL database
'''
import sys


# Add path to allow importing from same level directory, then disable pylint import warning
sys.path.insert(0, "../python_utils")
# pylint: disable=import-error, wrong-import-position, wrong-import-order
from mysql_utils import connect_to_mysql_db
from state_utils import get_state_name_from_abbrev
from json_utils import read_json_file


# Connect to SQL db
(CNX, CUR) = connect_to_mysql_db(None)


# Get all zip codes from json file
ALL_ZIP_CODES = read_json_file("./zip_codes_detailed.json")


# Get zip codes we have charities for
KNOWN_ZIP_CODES = read_json_file("../charities/charity_locations.json")


# If we know about this zip code, will add its county and city to SQL db
# If we have already added a city/state to DB, do not need to add county or city again
KNOWN_CITY_STATES = {}
KNOWN_COUNTY_STATES = {}


# Skip first one
ALL_ZIP_ITER = iter(ALL_ZIP_CODES)
ALL_ZIP_ITER.next()


print('Expected completion time is ~2 minutes...')
for zip_code in ALL_ZIP_ITER:
    actual_zip = str(int(zip_code[0]))

    if actual_zip in KNOWN_ZIP_CODES:
        # city = zip_code[1]
        # Using KNOWN_ZIP_CODES instead because it comes from charity database.
        # Charity db is preferred because will be searching database by city/state
        # using charity's listed city/state
        city = KNOWN_ZIP_CODES[actual_zip][0]
        state_abbrev = zip_code[2]
        county = zip_code[3]

        # Make sure this city/state has not been added already
        city_state_combo = city + state_abbrev
        if city_state_combo not in KNOWN_CITY_STATES:
            KNOWN_CITY_STATES[city_state_combo] = True

            # Get state name from abbrev
            state_name = get_state_name_from_abbrev(state_abbrev)

            # Add county/state
            county_id = 0
            county_state_combo = county + state_abbrev

            # Do not need to add county again if already added
            if county_state_combo not in KNOWN_COUNTY_STATES:
                insert_county_state_query = 'INSERT INTO county (name, state) VALUES ("' + \
                    county + '", "' + state_name + '")'
                CUR.execute(insert_county_state_query)
                county_id = CUR.lastrowid
                KNOWN_COUNTY_STATES[county_state_combo] = county_id
            else:
                county_id = KNOWN_COUNTY_STATES[county_state_combo]

            # Add city/state using county id
            insert_city_state_query = 'INSERT INTO city (name, state, county_id) VALUES ("' + \
                city + '", "' + state_name + '", ' + str(county_id) + ')'
            CUR.execute(insert_city_state_query)

CNX.commit()
