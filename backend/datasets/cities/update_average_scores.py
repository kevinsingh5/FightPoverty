'''
Module that gets the average Charity Navigator and Fight Poverty scores of charities
in each city.
'''
import sys

# Add path to allow importing from same level directory, then disable pylint import warning
sys.path.insert(0, "../python_utils")
# pylint: disable=import-error, wrong-import-position, wrong-import-order
from mysql_utils import connect_to_mysql_db


# Connect to SQL db
(CNX, CUR) = connect_to_mysql_db(None)


# Get average charity navigator score and fight poverty score of every city
CUR.execute("SELECT city_id, AVG(charity_navigator_score), AVG(fight_poverty_score) \
            FROM ( \
                    SELECT city.id AS city_id, charity_navigator_score, fight_poverty_score \
                    FROM city \
                    INNER JOIN charity \
                    ON charity.city_id = city.id \
            ) AS t \
            GROUP BY city_id"
            )  # pylint: disable=bad-continuation


CITIES = CUR.fetchall()


SQL_QUERY = "UPDATE city \
SET average_charity_navigator_score=%s, average_fight_poverty_score=%s \
WHERE id=%s"


ARRAY_OF_TUPLES_TO_INSERT = []


for city in CITIES:
    (city_id, average_charity_navigator_score, average_fight_poverty_score) = city

    # round to 2 decimals
    average_charity_navigator_score = float(
        "{0:.2f}".format(average_charity_navigator_score))
    average_fight_poverty_score = float(
        "{0:.2f}".format(average_fight_poverty_score))

    tuple_to_insert = (average_charity_navigator_score,
                       average_fight_poverty_score, city_id)
    ARRAY_OF_TUPLES_TO_INSERT.append(tuple_to_insert)


print('Inserting into db... expected time is ~45 seconds')
CUR.executemany(
    SQL_QUERY,
    ARRAY_OF_TUPLES_TO_INSERT
)
print('Done inserting')
CNX.commit()
