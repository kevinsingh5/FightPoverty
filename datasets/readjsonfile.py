import json
from pprint import pprint

file_name = raw_input('Read the following file: ')
with open(file_name) as f:
    data = json.load(f)

pprint(data)
print("Number of elements: " + str(len(data)))
