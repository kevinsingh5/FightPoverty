import json
import StringIO

with open("./states.json") as f:
  states = json.load(f)


# Write the contents of the zip_codes list into the json file
with open("states_by_num_dict.json", 'w') as json_file:
  
  json_file.write("{\n")

  # skip first record denoting attributes
  states_iter = iter(states)
  states_iter.next()

  last_elem_in_states = states[len(states) - 1]

  for state in states_iter:
    state_num = int(state[2])
    state_name = state[0]

    # Example: "01": "Alabama",
    key_value_pair = '  "' + str(state_num) + '": "' + str(state_name) + '"'
    if state is not last_elem_in_states :
      key_value_pair += ","
    key_value_pair += "\n"

    json_file.write(key_value_pair)
  
  json_file.write("}")
