import json


def get_state_name_from_num (state_num) :
  with open("../States/states_by_num_dict.json") as f:
    states_dict = json.load(f)  
  return states_dict[state_num]


def get_state_name_from_abbrev (state_abbrev) :
  with open("../States/states_by_abbrev_dict.json") as f:
    states_by_abbrev_dict = json.load(f)  
  state_name = ''
  if state_abbrev in states_by_abbrev_dict :
    state_name = states_by_abbrev_dict[state_abbrev]

  return state_name