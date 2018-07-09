

sql_query_file_name = raw_input("Enter file name where SQL query is: ")

file = open(sql_query_file_name, "r")
print(file.read())


