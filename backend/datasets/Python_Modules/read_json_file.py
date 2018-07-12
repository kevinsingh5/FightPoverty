import json
from pprint import pprint

file_name = raw_input('Read the following file: ')
with open(file_name) as f:
    data = json.load(f)

print_data = raw_input('Do you want to print all data (y/n)? ')
if print_data == 'y' :
    pprint(data)

print("Number of elements: " + str(len(data)))
