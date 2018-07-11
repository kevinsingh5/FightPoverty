#### zip_codes_to_state.json query:

  `https://api.census.gov/data/2016/zbp?get=ST&for=zipcode:*`

#### zip_codes_detailed.json:

  - Downloaded csv file from this website for free:

  `https://www.unitedstateszipcodes.org/zip-code-database/`

  - Then used `../csv_to_json.py` to convert downloaded csv into json


#### add_known_locations_to_db.py

  - Run this to get counties and cities into db