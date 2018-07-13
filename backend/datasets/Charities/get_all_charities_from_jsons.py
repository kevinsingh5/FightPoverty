'''
Reads all charities from json files and returns them in an array of objects
'''
import sys

# Add path to allow importing from same level directory, then disable pylint import warning
sys.path.insert(0, "../python_utils")
# pylint: disable=import-error, wrong-import-position, wrong-import-order
from json_utils import read_json_file


def get_all_charities_from_jsons():
    '''
    Uses json utils to read json files and place results in an array
    '''
    # Grab charities from FoodBanks.json
    charities = read_json_file("./FoodBanks.json")

    # Grab charities from HomelessServices.json
    charities += read_json_file("./HomelessServices.json")

    return charities
