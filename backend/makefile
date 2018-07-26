.DEFAULT_GOAL := all

FILES := tests.py 	\
		 main.py 	\

.pylintrc:
	pylint --disable=locally-disabled --disable=too-few-public-methods \
   	--disable=broad-except --disable=superfluous-parens --reports=no --generate-rcfile > $@


TestBackend.pyx: tests.py
	# make 	checkFormat	
	python	tests.py -b
	@echo 	"ALL BACKEND TESTS PASSING"


test: TestBackend.pyx


clean:
	rm -r  .pylintrc				      				|| :
	rm -rf *.pyc 						  				|| :
	rm -rf ./datasets/*.pyc 			  				|| :
	rm -rf ./datasets/charities/*.pyc     				|| :
	rm -rf ./datasets/cities/*.pyc		  				|| :
	rm -rf ./datasets/counties/*.pyc      				|| :
	rm -rf ./datasets/python_utils/*.pyc  				|| :
	rm -rf ./datasets/states/*.pyc 		  				|| :
	rm -rf ./datasets/zip_codes/*.pyc 	  				|| :
	rm -rf ./datasets/fight_poverty_algorithm/*.pyc		|| :
	rm -r  *.tmp						  				|| :
	rm -rf __pycache__  				  				|| :
	rm -rf .mypy_cache  				  				|| :


format:
	autopep8 -i 	main.py
	autopep8 -i 	tests.py
	autopep8 -i -r  ./datasets


checkFormat: .pylintrc
	-pylint   tests.py
	-pylint   main.py
	-pylint   ./datasets/charities/*.py
	-pylint   ./datasets/cities/*.py
	-pylint   ./datasets/counties/*.py
	-pylint	  ./datasets/python_utils/*.py
	-pylint   ./datasets/states/*.py
	-pylint   ./datasets/zip_codes/*.py
	-pylint	  ./datasets/fight_poverty_algorithm/*.py


run:
	python main.py


install:
	pip install -r requirements.txt


add: format test checkFormat clean
	cd ..
	git add .


rebuildDatabaseFromScratch:
	# for speed, enter credentials into ./datasets/python_utils/my_sql_utils.py
	cd ./datasets/zip_codes && python add_known_locations_to_db.py  && \
	cd ../charities 												&& \
	python add_charities_to_db.py 									&& \
	cd ../python_utils												&& \
	# use ./Counties and ./Counties/counties.json for next line
	python insert_into_mysql_db.py									&& \
	cd ../fight_poverty_algorithm									&& \
	python determine_fight_poverty_multipliers.py 					&& \
	python update_charity_fight_poverty_scores.py					&& \
	cd ../cities													&& \
	python update_average_scores.py
