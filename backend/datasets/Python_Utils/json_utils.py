import json
# from pprint import pprint

def read_json_file (json_file_name) :
    json_file_name = json_file_name or raw_input('Read the following file: ')

    with open(json_file_name) as json_file:
        return json.load(json_file)

# file_name = raw_input('Read the following file: ')
# with open(file_name) as f:
#     data = json.load(f)

# print_data = raw_input('Do you want to print all data (y/n)? ')
# if print_data == 'y' :
#     pprint(data)

# print("Number of elements: " + str(len(data)))

def write_json_file (json_file_name, data) :
    with open(json_file_name, 'w') as json_file:
        json_file.write(json.dumps(data, indent=4, ensure_ascii=True))