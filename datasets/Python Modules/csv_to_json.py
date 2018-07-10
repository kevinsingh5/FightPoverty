import csv
import json
import sys

csv_file_name = raw_input('Enter CSV file name to convert to json: ')

# Open the CSV file to read it using csv module
with open(csv_file_name) as csv_file:
    rows = list(csv.reader(csv_file))

    data_to_write_to_json = []

    # If data in CSV needs to be changed before writing to json
    change_data = raw_input('Do you want to change the data from the csv? (y/n)')
    if change_data == "y" :
        sys.path.insert(0, raw_input('Input path to module containing data manipulator: '))
        from change_data_from_csv import change_data_from_csv

        data_to_write_to_json = change_data_from_csv(rows)
    else :
        data_to_write_to_json = rows

    

    



file_name = raw_input('Enter new json file name: ')

# Write the contents of the screened list into the json file
with open(file_name, 'w') as json_file:
    json_file.write(json.dumps(data_to_write_to_json, indent=4, ensure_ascii=True))
