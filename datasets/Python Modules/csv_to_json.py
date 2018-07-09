import csv
import json

csv_file_name = raw_input('Enter CSV file name to convert to json: ')

# Open the CSV file to read it using csv module
with open(csv_file_name) as csv_file:
    reader = csv.DictReader(csv_file)
    zip_codes = list(reader)

file_name = raw_input('Enter new json file name: ')

# Write the contents of the zip_codes list into the json file
with open(file_name, 'w') as json_file:
    json_file.write(json.dumps(zip_codes, indent=4, ensure_ascii=False))
