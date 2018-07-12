import sys
from get_all_charities_from_jsons import get_all_charities_from_jsons

# Add path to allow importing from same level directory, then disable pylint import warning
sys.path.insert(0, "../Python_Utils")
# pylint: disable=F0401
from json_utils import write_json_file


charities = get_all_charities_from_jsons()

# collect all locations in dictionary where zip code is key and [city, state] are values
zip_code_dict = {}

for charity in charities :
  charity_address = charity['mailingAddress']        
  charity_zip = int(charity_address['postalCode'])
  charity_city = charity_address['city']
  charity_state = charity_address['stateOrProvince']

  zip_code_dict[charity_zip] = [charity_city, charity_state]


# Create new json file called charity_locations.json
write_json_file("../Charities/charity_locations.json", zip_code_dict)
