import json

def read_json_file (json_file_name) :
    json_file_name = json_file_name or raw_input('Read the following file: ')

    with open(json_file_name) as json_file:
        return json.load(json_file)


def write_json_file (json_file_name, data) :
    with open(json_file_name, 'w') as json_file:
        json_file.write(json.dumps(data, indent=4, ensure_ascii=True))