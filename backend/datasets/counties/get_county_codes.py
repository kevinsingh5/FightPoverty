'''
Module that gets and outputs county codes and fight poverty scores into a tsv file.
'''
import sys
import csv
import json

# Add path to allow importing from same level directory, then disable pylint import warning
sys.path.insert(0, "../python_utils")
# pylint: disable=import-error, wrong-import-position, wrong-import-order
from mysql_utils import connect_to_mysql_db
from json_utils import read_json_file


# Connect to SQL db
(CNX, CUR) = connect_to_mysql_db(None)


CUR.execute("SELECT * FROM county")


COUNTIES = CUR.fetchall()

ALL_COUNTY_ARRAY = read_json_file('./counties.json')

with open('county_codes.tsv', 'w') as tsvfile:
    writer = csv.writer(tsvfile, delimiter='\t')

    writer.writerow(["id", "rate"])
    for county in COUNTIES:
        (county_id, county_name, county_state, poverty_per, poverty_pop, fp_mult) = county
        
        
        # Search through COUNTY_ARRAY for county in db
        fips_code = ''
        for fips_county in ALL_COUNTY_ARRAY:
            (fips_name, fips_per, fips_pop, not_used, fips_state, fips_county_code) = fips_county



            if fips_name == county_name and str(fips_pop) == str(poverty_pop):
                fips_code = fips_state + fips_county_code
                # print(fips_code, county_name, county_state)

                writer.writerow([fips_code, fp_mult])
                break
