'''
Provides useful json functions from json library to read and write json files.
'''
import json


def read_json_file(json_file_name):
    '''
    Read a json file and return its contents
    '''
    json_file_name = json_file_name or raw_input('Read the following json file: ')

    with open(json_file_name) as json_file:
        return json.load(json_file)


def write_json_file(json_file_name, data):
    '''
    Write a json file with indents of 4. Ensures all characters from json file
    are ASCII, otherwise fails.
    '''
    json_file_name = json_file_name or raw_input('Write to the following json file: ')

    with open(json_file_name, 'w') as json_file:
        json_file.write(json.dumps(data, indent=4, ensure_ascii=True))
