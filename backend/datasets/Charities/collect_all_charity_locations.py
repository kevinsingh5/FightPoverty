'''
Collects all locations of charities into a dict with key=zip code
and value=[city, state]. Places this dict into the file ./charity_locations.json
'''
import sys
# pylint: disable=relative-import
from get_all_charities_from_jsons import get_all_charities_from_jsons

# Add path to allow importing from same level directory, then disable pylint import warning
sys.path.insert(0, "../Python_Utils")
# pylint: disable=import-error, wrong-import-position, wrong-import-order
from json_utils import write_json_file


CHARITIES = get_all_charities_from_jsons()

# collect all locations in dictionary where zip code is key and [city, state] are values
ZIP_CODE_DICT = {}

for charity in CHARITIES:
    charity_address = charity['mailingAddress']
    charity_zip = int(charity_address['postalCode'])
    charity_city = charity_address['city']
    charity_state = charity_address['stateOrProvince']

    ZIP_CODE_DICT[charity_zip] = [charity_city, charity_state]


# Create new json file called charity_locations.json
write_json_file("../Charities/charity_locations.json", ZIP_CODE_DICT)
