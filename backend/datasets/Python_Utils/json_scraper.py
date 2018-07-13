'''
Scrapes json data from RESTful api and outputs to json file
'''
import requests
# pylint: disable=relative-import
from json_utils import write_json_file

JSON_FILE_NAME = raw_input('Enter file name: ')

GET_REQUEST = raw_input('Enter URL of http get request: ')
try:
    RESPONSE = requests.get(str(GET_REQUEST))
    print("Successful api call")

    print("Writing response to file")
    write_json_file(JSON_FILE_NAME, RESPONSE.json())
    print("Successfully written to file: " + JSON_FILE_NAME)

except requests.exceptions.Timeout:
    print('Timeout')
except requests.exceptions.TooManyRedirects:
    print('Try different URL next time')
except requests.exceptions.RequestException as exp:
    print exp
