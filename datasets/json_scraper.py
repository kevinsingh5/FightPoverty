import requests
import json

file_name = raw_input('Enter file name: ')
file = open(file_name, 'w')
print("File succesfully created!")

get_request = raw_input('Enter http get request: ')
try:
    resp = requests.get(str(get_request))
    print("Successful api call")

    print("Writing response to file")
    
    # json.dumps takes unicode JSON and converts to regular JSON
    file.write(json.dumps(resp.json(), indent=4))
    print("Successfully written to file: " + file_name)

except requests.exceptions.Timeout:
    print('Timeout')
except requests.exceptions.TooManyRedirects:
    print('Try different URL')
except requests.exceptions.RequestException as e:
    print e

file.close()

