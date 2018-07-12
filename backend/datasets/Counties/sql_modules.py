import json


# Use this module to get county poverty percentage and county poverty population into
# database AFTER already added the counties, cities, and charities


# Get all counties that are part of charities and store in dict
# Iterate over all counties in counties.json
# If county is known, update its stuff


# SQL query statement
# sql_query = "INSERT INTO county (name, state, county_poverty_percentage, county_poverty_population) \
# VALUES (%s, %s, %s, %s) ON DUPLICATE KEY \
#   UPDATE \
#     county_poverty_percentage=values(county_poverty_percentage), \
#     county_poverty_population=values(county_poverty_population)"

sql_query = "UPDATE county \
SET county_poverty_percentage=%s, county_poverty_population=%s \
WHERE name=%s AND state=%s"


# EXPECTING FILE: ./Counties.json
def construct_sql_records (data, cur) :
  array_of_tuples_to_insert = []
  
  # skip first element which has names of attributes
  data_iter = iter(data)
  data_iter.next()


  # FIRST GET ALL KNOWN COUNTIES. These are counties we have charities for
  cur.execute("SELECT id, name, state FROM county");
  known_counties = cur.fetchall()

  # Store result in dict for O(1) lookup
  known_counties_dict = {}
  for known_county in known_counties :
    county_state_combo = known_county[1] + known_county[2]
    known_counties_dict[county_state_combo] = known_county[0]


  # Iterate over all counties in counties.json. If county known, update its stuff
  for item in data_iter :
    county_name = item[0]
    county_poverty_percentage = item[1]
    county_poverty_population = item[2]

    # Get state name from json dict
    state_num = str(int(item[4]))
    with open("../States/states_by_num_dict.json") as f:
      states_dict = json.load(f)  
    state_name = states_dict[state_num]

    county_state_combo = county_name + state_name

    # Only need to insert if it's a county that a charity we know about is in
    if county_state_combo in known_counties_dict :
      tuple_to_insert = (county_poverty_percentage, county_poverty_population, county_name, state_name)
      array_of_tuples_to_insert.append(tuple_to_insert)


  print('Expected completion time is ~30 seconds...')
  return array_of_tuples_to_insert