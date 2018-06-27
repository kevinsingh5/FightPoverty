import requests
import json

file_name = raw_input('Enter file name: ')
file = open(file_name, 'w')
print("File succesfully created!")

get_request = raw_input('Enter http get request: ')
try:
    resp = requests.get(get_request)
    print("Successful api call")

    # json.dumps takes unicode JSON and converts to regular
    file.write(json.dumps(resp.json(), indent=4))
    print("Successfully written to file: " + file_name)

except:
    print("Failed!")

file.close()

