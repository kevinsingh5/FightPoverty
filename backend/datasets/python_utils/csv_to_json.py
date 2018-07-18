'''
User can use this module to enter a CSV file name into STDIN and
convert that file into a json file.
'''
import csv
import json
import sys

CSV_FILE_NAME = raw_input('Enter CSV file name to convert to json: ')

# Open the CSV file to read it using csv module
with open(CSV_FILE_NAME) as csv_file:
    ROWS_IN_CSV = list(csv.reader(csv_file))

    DATA_TO_WRITE_TO_JSON = []

    # Ask if data in CSV needs to be changed before writing to json
    if raw_input('Do you want to change the data from the csv? (y/n)') == "y":
        # User must provide path to a module called change_data_from_csv
        # that has a function called change_data_from_csv
        sys.path.insert(0, raw_input(
            'Input path to module containing data manipulator: '))

        # pylint: disable=import-error
        from change_data_from_csv import change_data_from_csv

        DATA_TO_WRITE_TO_JSON = change_data_from_csv(ROWS_IN_CSV)
    else:
        DATA_TO_WRITE_TO_JSON = ROWS_IN_CSV

JSON_FILE_NAME = raw_input('Enter new json file name: ')

# Write the contents of the screened list into the json file
with open(JSON_FILE_NAME, 'w') as json_file:
    json_file.write(json.dumps(DATA_TO_WRITE_TO_JSON,
                               indent=4, ensure_ascii=True))
