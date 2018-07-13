.DEFAULT_GOAL := all

FILES := tests.py 	\
		 main.py 	\

.pylintrc:
	pylint --disable=locally-disabled --disable=too-few-public-methods \
   	--disable=broad-except --disable=superfluous-parens --reports=no --generate-rcfile > $@


TestBackend.pyx: tests.py main.py .pylintrc
	-pylint   tests.py
	-pylint   main.py
	-pylint   ./datasets/Charities/add_charities_to_db.py
	-pylint   ./datasets/Charities/collect_all_charity_locations.py
	-pylint	  ./datasets/Charities/get_all_charities_from_jsons.py
	-pylint   ./datasets/Counties/sql_modules.py
	-pylint	  ./datasets/Python_Utils/csv_to_json.py
	-pylint   ./datasets/Python_Utils/insert_into_mysql_db.py
	-pylint   ./datasets/Python_Utils/json_scraper.py
	-pylint   ./datasets/Python_Utils/json_utils.py
	-pylint   ./datasets/Python_Utils/mysql_utils.py
	-pylint   ./datasets/Python_Utils/state_utils.py
	-pylint   ./datasets/States/create_states_by_num_dict.py
	-pylint   ./datasets/Zip_Codes/add_known_locations_to_db.py
	-pylint   ./datasets/Zip_Codes/change_data_from_csv.py	
	python 	  tests.py -b


test: TestBackend.pyx


clean:
	rm -r  .pylintrc
	rm -r  *.pyc
	rm -r  *.tmp
	rm -rf __pycache__
	rm -rf .mypy_cache


format:
	autopep8 -i main.py
	autopep8 -i tests.py
	autopep8 -i -r ./datasets


run:
	python main.py


install:
	pip install -r requirements.txt
