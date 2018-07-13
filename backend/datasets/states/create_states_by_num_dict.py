'''
Module used to create the states by number dictionary. Iterates over
all states scraped from US census to do this.
'''
import sys

# Add path to allow importing from same level directory, then disable pylint import warning
sys.path.insert(0, "../python_utils")
# pylint: disable=import-error, wrong-import-position, wrong-import-order
from json_utils import read_json_file, write_json_file


# Get all scraped states with numbers
STATES = read_json_file("./states.json")

# Dict will be writing to json file
STATES_BY_NUM_DICT_TO_WRITE = {}

# Skip first one
STATES_ITER = iter(STATES)
STATES_ITER.next()

for state in STATES_ITER:
    state_num = int(state[2])
    state_name = state[0]

    STATES_BY_NUM_DICT_TO_WRITE[state_num] = state_name

write_json_file("../states/states_by_num_dict.json",
                STATES_BY_NUM_DICT_TO_WRITE)
