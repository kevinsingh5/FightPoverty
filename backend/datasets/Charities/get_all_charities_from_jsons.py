import sys

# Add path to allow importing from same level directory, then disable pylint import warning
sys.path.insert(0, "../Python_Utils")
# pylint: disable=F0401
from json_utils import read_json_file

def get_all_charities_from_jsons () :
    # Grab charities from FoodBanks.json
    charities = read_json_file("./FoodBanks.json")

    # Grab charities from HomelessServices.json
    charities += read_json_file("./HomelessServices.json")

    return charities
