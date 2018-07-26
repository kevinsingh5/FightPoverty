'''
Module that iterates over all charities in the FightPoverty database and
multiplies the chartiy's charity_navigator_score by the county
the charity resides in's fight_poverty_multiplier.
'''
import sys

# Add path to allow importing from same level directory, then disable pylint import warning
sys.path.insert(0, "../python_utils")
# pylint: disable=import-error, wrong-import-position, wrong-import-order
from mysql_utils import connect_to_mysql_db


# Connect to SQL db
(CNX, CUR) = connect_to_mysql_db(None)


# Get all charities and their respective county's fight_poverty_multiplier
CUR.execute("SELECT charity.id, charity_navigator_score, fight_poverty_multiplier \
            FROM county \
            INNER JOIN charity \
            ON charity.county_id = county.id"
            ) 

CHARITIES = CUR.fetchall()


SQL_QUERY = "UPDATE charity \
SET fight_poverty_score=%s \
WHERE id=%s"


ARRAY_OF_TUPLES_TO_INSERT = []


for charity in CHARITIES:
    (charity_id, charity_navigator_score, fight_poverty_multiplier) = charity

    fight_poverty_score = charity_navigator_score * fight_poverty_multiplier

    # Max out at 100
    if fight_poverty_score >= 100:
        fight_poverty_score = 100

    # round to 2 decimals
    fight_poverty_score = float("{0:.2f}".format(fight_poverty_score))

    tuple_to_insert = (fight_poverty_score, charity_id)
    ARRAY_OF_TUPLES_TO_INSERT.append(tuple_to_insert)


print('Inserting into db (expected time is ~45 seconds)...')
CUR.executemany(
    SQL_QUERY,
    ARRAY_OF_TUPLES_TO_INSERT
)
print('Done inserting')
CNX.commit()
