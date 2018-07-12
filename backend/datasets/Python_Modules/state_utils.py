import json
import os
import inspect

# File base to make sure to open files with correct path
BASE = os.path.dirname(os.path.abspath(__file__))


def get_state_name_from_dict (state, state_dict) :
  state_name = ''

  if state in state_dict :
    state_name = state_dict[state]

  return state_name


def get_state_dict (relative_path_to_dict) :
  with open(os.path.join(BASE, relative_path_to_dict)) as f:
    return json.load(f)


def get_state_name_from_num (state_num) :
  states_by_num_dict = get_state_dict("../States/states_by_num_dict.json")
  return get_state_name_from_dict(state_num, states_by_num_dict)


def get_state_name_from_abbrev (state_abbrev) :
  states_by_abbrev_dict = get_state_dict("../States/states_by_abbrev_dict.json") 
  return get_state_name_from_dict(state_abbrev, states_by_abbrev_dict)

