import sys

# Add path to allow importing from same level directory, then disable pylint import warning
sys.path.insert(0, "../Python_Utils")
# pylint: disable=F0401
from json_utils import read_json_file, write_json_file


# Get all scraped states with numbers
states = read_json_file("./states.json")

# Dict will be writing to json file
states_by_num_dict_to_write = {}

# Skip first one
states_iter = iter(states)
states_iter.next()

for state in states_iter:
  state_num = int(state[2])
  state_name = state[0]

  states_by_num_dict_to_write[state_num] = state_name

write_json_file("../States/states_by_num_dict.json", states_by_num_dict_to_write)
