import json

# SQL query statement
sql_query = "INSERT INTO city (name, state, county_id) VALUES (%s, %s, %d)"


# Constructs individual county tuple to be inserted into MySQL DB
# EXPECTING FILE: ../Zip Codes/zip_codes_detailed.json
def construct_sql_records (data, cur) :
  array_of_tuples_to_insert = []
  city_county_states_inserted = {}
  
  # Skip first one containing header
  data_iter = iter(data)
  data_iter.next()
  
  # Data from zip_code_database.csv
  counter = 0
  for item in data_iter :
    if counter % 1000 == 0 :
      print('Done creating ' + str(counter) + ' entries')
    counter += 1

    city_name = item[1]
    county_name = item[3]

    # Get state name from state_abbrev json dict
    state_abbrev = item[2]
    with open("../States/states_by_abbrev_dict.json") as f:
      states_by_abbrev_dict = json.load(f)  
    state_name = ''
    if state_abbrev in states_by_abbrev_dict :
      state_name = states_by_abbrev_dict[state_abbrev]

    # must have city, state, and county
    if city_name and county_name and state_name :
      
      # Cut off word "county" from end of county if included
      county_len = len(county_name.split())
      if county_len > 1 and county_name.rsplit(' ', 1)[1] == "County" :
        county_name = county_name.rsplit(' ', 1)[0]

      # Make sure this city/state/county combo has not already been included
      city_county_state = city_name + county_name + state_name
      if not city_county_state in city_county_states_inserted :
        city_county_states_inserted[city_county_state] = True

        # Query for county ID using county name and state        
        sql_query = 'SELECT id FROM county WHERE name="' + county_name + '" AND state="' + state_name + '"'
        cur.execute(sql_query)

        resp = cur.fetchall()
        if len(resp) > 0 :
          county_id = resp[0][0]
          
          tuple_to_insert = (city_name, state_name, county_id)

          array_of_tuples_to_insert.append(tuple_to_insert)

        else :
          print('No county ID for ' + city_county_state)


  
  return array_of_tuples_to_insert