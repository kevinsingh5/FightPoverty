import json
import mysql.connector
from mysql.connector import errorcode

# iterate over all charities in json files, 
# query the database for city+state combo to get city id, 
# and query the database for county+state combo to get county id



# # Connect to SQL db
# print("Enter credentials to connect to MySQL database...")
# db = raw_input("DB name: ")
# username = raw_input("DB username: ")
# password = raw_input("DB password: ")
# hostname = raw_input("DB hostname: ")
# cnx = ''
# try:
#     cnx = mysql.connector.connect(
#         user=username, 
#         password=password,
#         host=hostname,
#         database=db
#     )
# except Exception as exp:
#     raise exp
# cur = cnx.cursor()


# Get all zip codes from json file
with open("../Zip Codes/zip_codes_detailed.json") as f:
  all_zip_codes = json.load(f)


# Get zip codes we have charities for
with open("../Charities/charity_locations.json") as f:
  known_zip_codes = json.load(f)


# # If we have already added a city/state to DB, do not need to add county or city again
# known_city_states = {}
# known_county_states = {}


# # If we know about this zip code, add its county and city to SQL db

# Skip first one
all_zip_iter = iter(all_zip_codes)
all_zip_iter.next()

known_cities = {}

for zip_code in known_zip_codes.keys() :
  city = known_zip_codes[zip_code][0]
  if city not in known_cities :
    known_cities[city] = True

print(len(known_cities.keys()))

# for zip_code in all_zip_iter :
#   actual_zip = str(int(zip_code[0]))

  
#   if actual_zip in known_zip_codes :
#     city = zip_code[1]
#     state_abbrev = zip_code[2]
#     county = zip_code[3]



#     # Make sure city/state matches up with city in known_zip_codes
#     charity_city = known_zip_codes[actual_zip][0]
#     charity_state = known_zip_codes[actual_zip][1]

#     if city != charity_city :
#       print(city, charity_city)



#     # Make sure this city/state has not been added already
#     # city_state_combo = city + state_abbrev
#     # if city_state_combo not in known_city_states :
#     #   known_city_states[city_state_combo] = True


#     #   # Get state name from abbrev
#     #   with open("../States/states_by_abbrev_dict.json") as f:
#     #     states_by_abbrev_dict = json.load(f)  
#     #   state_name = ''
#     #   if state_abbrev in states_by_abbrev_dict :
#     #     state_name = states_by_abbrev_dict[state_abbrev]



#       # Add county/state
#       # county_id = 0
#       # county_state_combo = county + state_abbrev
#       # if county_state_combo not in known_county_states :
#       #   insert_county_state_query = 'INSERT INTO county (name, state) VALUES ("' + county + '", "' + state_name + '")' 
#       #   cur.execute(insert_county_state_query)
#       #   county_id = cur.lastrowid
#       #   known_county_states[county_state_combo] = county_id
#       # else :
#       #   county_id = known_county_states[county_state_combo]
    

#       # Add city/state using county id
# #       insert_city_state_query = 'INSERT INTO city (name, state, county_id) VALUES ("' + city + '", "' + state_name + '", ' + str(county_id) + ')' 
# #       cur.execute(insert_city_state_query)

# # cnx.commit()