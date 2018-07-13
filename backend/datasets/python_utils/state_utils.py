'''
Utilties to get a state's name from either its number or abbreviation.
The data mapping states to number was provided by the US census.
'''
import os
# pylint: disable=relative-import
from json_utils import read_json_file

# File base to make sure to open files with correct path
BASE = os.path.dirname(os.path.abspath(__file__))


def get_state_name_from_dict(state_dict_json_file, state):
    '''
    Gets the state dict from the provided json file and returns
    the value corresponding to the provided state.
    '''
    state_dict = read_json_file(state_dict_json_file)
    state_name = ''
    if state in state_dict:
        state_name = state_dict[state]

    return state_name


def get_state_name_from_num(state_num):
    '''
    Takes in a state's number and returns the state's name
    '''
    states_by_num_file = "../states/states_by_num_dict.json"

    # Need absolute path to file
    states_by_num_file = os.path.join(BASE, states_by_num_file)

    return get_state_name_from_dict(states_by_num_file, state_num)


def get_state_name_from_abbrev(state_abbrev):
    '''
    Takes in a state's abbreviation and returns the state's name
    '''
    states_by_abbrev_file = "../states/states_by_abbrev_dict.json"

    # Need absolute path to file
    states_by_abbrev_file = os.path.join(BASE, states_by_abbrev_file)

    return get_state_name_from_dict(states_by_abbrev_file, state_abbrev)
