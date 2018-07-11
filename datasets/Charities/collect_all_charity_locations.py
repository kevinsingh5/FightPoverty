import json
from pprint import pprint

# Grab charities from FoodBanks.json
with open("./FoodBanks.json") as f:
  charities = json.load(f)

# Grab charities from HomelessServices.json
with open("./HomelessServices.json") as f:
  charities += json.load(f)


# New json file
with open("./charity_locations.json", 'w') as json_file:
  zip_code_dict = {}

  for charity in charities :
    charity_address = charity['mailingAddress']        
    charity_zip = int(charity_address['postalCode'])
    charity_city = charity_address['city']
    charity_state = charity_address['stateOrProvince']

    zip_code_dict[charity_zip] = [ charity_city, charity_state ]

  json_file.write(json.dumps(zip_code_dict, indent=4, ensure_ascii=True))


