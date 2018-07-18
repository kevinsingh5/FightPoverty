'''
Use this module to get county poverty percentage and county poverty population into
database AFTER already added the counties, cities, and charities.

- Gets all counties that are part of charities and store in dict
- Iterates over all counties in counties.json
- If DB has charity in that county, set county's poverty % and poverty population
'''
import sys

# Add path to allow importing from same level directory, then disable pylint import warning
sys.path.insert(0, "../python_utils")
# pylint: disable=import-error, wrong-import-position, wrong-import-order
from state_utils import get_state_name_from_num


SQL_QUERY = "UPDATE county \
SET county_poverty_percentage=%s, county_poverty_population=%s \
WHERE name=%s AND state=%s"


def construct_sql_records(data, cur):
    '''
    Expecting data from ./Counties.json which has all counties in US.
    Iterates over those counties and checks if the DB has that county
    in it. If so, updates poverty % and poverty population.
    '''
    array_of_tuples_to_insert = []

    # skip first element which has names of attributes
    data_iter = iter(data)
    data_iter.next()

    # FIRST GET ALL KNOWN COUNTIES. These are counties we have charities for
    cur.execute("SELECT id, name, state FROM county")
    known_counties = cur.fetchall()

    # Store result in dict for O(1) lookup
    known_counties_dict = {}
    for known_county in known_counties:
        county_state_combo = known_county[1] + known_county[2]
        known_counties_dict[county_state_combo] = known_county[0]

    # Iterate over all counties in counties.json. If county known, update its poverty %
    # and poverty population
    for item in data_iter:
        county_name = item[0]
        county_poverty_percentage = item[1]
        county_poverty_population = item[2]

        # Get state name from json dict
        state_num = str(int(item[4]))
        state_name = get_state_name_from_num(state_num)

        county_state_combo = county_name + state_name

        # Only need to insert if it's a county that a charity we know about is in
        if county_state_combo in known_counties_dict:
            tuple_to_insert = (county_poverty_percentage,
                               county_poverty_population, county_name, state_name)
            array_of_tuples_to_insert.append(tuple_to_insert)

    print('Expected completion time is ~30 seconds...')
    return array_of_tuples_to_insert
