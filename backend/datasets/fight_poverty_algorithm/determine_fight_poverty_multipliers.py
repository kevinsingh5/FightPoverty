'''
Module that sets all charities' Fight Poverty scores. We analyzed the data
in Excel (see './Algorithm Analysis.xlsx') to determine a multiplier
of Charity Navigator's score based on how poor the county the charity
operates in is. The poorer the county, the higher the multiplier.
'''
import sys


def determine_poverty_percentage_multiplier(poverty_percentage):
    '''
    Assessed all data to come up with reasonable multipliers.
    '''
    assert poverty_percentage is not None

    multiplier = 0.0

    if poverty_percentage > 21.5:
        multiplier = 1.25
    elif poverty_percentage > 18 and poverty_percentage <= 21.5:
        multiplier = 1.2
    elif poverty_percentage > 16.5 and poverty_percentage <= 18:
        multiplier = 1.15
    elif poverty_percentage > 15.5 and poverty_percentage <= 16.5:
        multiplier = 1.1
    elif poverty_percentage > 14.5 and poverty_percentage <= 15.5:
        multiplier = 1.05
    elif poverty_percentage > 13.25 and poverty_percentage <= 14.5:
        multiplier = 1
    elif poverty_percentage > 11.5 and poverty_percentage <= 13.25:
        multiplier = 0.95
    elif poverty_percentage > 10.75 and poverty_percentage <= 11.5:
        multiplier = 0.9
    elif poverty_percentage > 9.5 and poverty_percentage <= 10.75:
        multiplier = 0.85
    elif poverty_percentage > 7.75 and poverty_percentage <= 9.5:
        multiplier = 0.8
    else:
        multiplier = 0.75

    return multiplier


def determine_poverty_population_multiplier(poverty_population):
    '''
    Assessed all data to come up with reasonable multipliers.
    '''
    assert poverty_population is not None

    multiplier = 0.0

    if poverty_population > 200000:
        multiplier = 1.25
    elif poverty_population > 125000 and poverty_population <= 200000:
        multiplier = 1.2
    elif poverty_population > 90000 and poverty_population <= 125000:
        multiplier = 1.15
    elif poverty_population > 65000 and poverty_population <= 90000:
        multiplier = 1.1
    elif poverty_population > 52500 and poverty_population <= 65000:
        multiplier = 1.05
    elif poverty_population > 42000 and poverty_population <= 52500:
        multiplier = 1
    elif poverty_population > 30000 and poverty_population <= 42000:
        multiplier = 0.95
    elif poverty_population > 21000 and poverty_population <= 30000:
        multiplier = 0.9
    elif poverty_population > 16000 and poverty_population <= 21000:
        multiplier = 0.85
    elif poverty_population > 10000 and poverty_population <= 16000:
        multiplier = 0.8
    else:
        multiplier = 0.75

    return multiplier


def determine_charity_navigator_multiplier(poverty_percentage, poverty_population):
    '''
    Gets average of the poverty percentage multiplier and population multiplier
    '''
    percentage_multiplier = determine_poverty_percentage_multiplier(
        poverty_percentage
    )
    
    population_multiplier = determine_poverty_population_multiplier(
        poverty_population
    )

    return (percentage_multiplier + population_multiplier) / 2


# Add path to allow importing from same level directory, then disable pylint import warning
sys.path.insert(0, "../python_utils")
# pylint: disable=import-error, wrong-import-position, wrong-import-order
from mysql_utils import connect_to_mysql_db


# Connect to SQL db
(CNX, CUR) = connect_to_mysql_db(None)


# FIRST GET ALL KNOWN COUNTIES. These are counties we have charities for
CUR.execute(
    "SELECT id, county_poverty_percentage, county_poverty_population FROM county")
KNOWN_COUNTIES = CUR.fetchall()


SQL_QUERY = "UPDATE county \
SET fight_poverty_multiplier=%s \
WHERE id=%s"


ARRAY_OF_TUPLES_TO_INSERT = []


# Iterate over counties determining fight poverty score and updating db
for known_county in KNOWN_COUNTIES:
    county_id = known_county[0]
    poverty_percentage = known_county[1]
    poverty_population = known_county[2]

    # Default is 1 if no poverty stats
    fight_poverty_multiplier = 1.0

    if poverty_percentage and poverty_population:
        fight_poverty_multiplier = determine_charity_navigator_multiplier(
            poverty_percentage,
            poverty_population
        )

    tuple_to_insert = (fight_poverty_multiplier, county_id)
    ARRAY_OF_TUPLES_TO_INSERT.append(tuple_to_insert)


print('Inserting into db... expected time is ~30 seconds')
CUR.executemany(
    SQL_QUERY,
    ARRAY_OF_TUPLES_TO_INSERT
)
print('Done inserting')
CNX.commit()
