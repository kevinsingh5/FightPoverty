import json

# SQL query statement
sql_query = "INSERT INTO county (name, state) VALUES (%s, %s)"


# Constructs individual county tuple to be inserted into MySQL DB
def construct_sql_records (data, _) :
  array_of_tuples_to_insert = []
  
  # skip first element which has names of attributes
  data_iter = iter(data)
  data_iter.next()

  for item in data_iter :
    # Cut off county name from end
    county_name = item[0].rsplit(' ', 1)[0]

    # Get state name from json dict
    state_num = str(int(item[4]))
    with open("../States/states_by_num_dict.json") as f:
      states_dict = json.load(f)  
    state_name = states_dict[state_num]  

    tuple_to_insert = (county_name, state_name)

    array_of_tuples_to_insert.append(tuple_to_insert)
  
  return array_of_tuples_to_insert