'''
Scrapes json data from RESTful api and outputs to json file
'''
import requests
# pylint: disable=relative-import
from json_utils import write_json_file


def restful_api_scraper(request, json_file_name):
    '''
    Scrapes provided restful api into provided json file name
    '''
    try:
        response = requests.get(str(request))
        print("Successful api call")

        print("Writing response to file")
        write_json_file(json_file_name, response.json())
        print("Successfully written to file: " + json_file_name)

    except requests.exceptions.Timeout:
        print('Timeout')
    except requests.exceptions.TooManyRedirects:
        print('Try different URL next time')
    except requests.exceptions.RequestException as exp:
        print exp


if __name__ == "__main__":
    GET_REQUEST = raw_input('Enter URL of http get request: ')
    JSON_FILE_NAME = raw_input('Enter json file name to write to: ')
    restful_api_scraper(GET_REQUEST, JSON_FILE_NAME)
