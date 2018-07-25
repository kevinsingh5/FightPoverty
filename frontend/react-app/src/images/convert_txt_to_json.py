import json


json_file_name = raw_input(
    'Read the following text file: ')

with open(json_file_name) as file:
    data = {}
    for line in file:
        # Key will be name of object

        # Get everything after last '/'
        image_name = line.rsplit('/', 1)[-1]

        # Split by periods
        object_name = image_name.split('.')

        # Get everything before the last period
        if len(object_name) == 2:
            object_name = object_name[0]
        else:
            new_object = ''
            i = 0
            while i < len(object_name) - 1:
                if i < len(object_name) - 2:
                    new_object += object_name[i] + '.'
                else:
                    # fencepost, final word
                    new_object += object_name[i]

                i += 1

            object_name = new_object

        # Value will be link
        data[object_name] = line[0 : len(line) - 1]

json_file_name = raw_input(
    'Write to the following json file: ')

with open(json_file_name, 'w') as json_file:
    json_file.write(json.dumps(data, indent=4, ensure_ascii=True))