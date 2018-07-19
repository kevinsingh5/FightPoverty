.DEFAULT_GOAL := all

all:

status:
	@echo "status for 'fightpoverty.online':"
	curl -I fightpoverty.online
	@echo
	@echo "status for 'www.fightpoverty.online:'"
	curl -I www.fightpoverty.online
	@echo
	@echo "status for 'api.fightpoverty.online:'"
	curl -I api.fightpoverty.online

log:
	git log

log-graph:
	git log --graph

deploy:
	git checkout deployment
	git pull
	# git merge origin/master
	git merge master
	git push # origin deployment
	git checkout master
	@echo "***deployment successful!***"

pull:
	git status
	@echo "pulling from online repo..."
	git pull
	git status
	@echo "pull successful!"

push: 
	git add *
	git commit -m "default makefile commit"
	git push origin master
	@echo "push successful!"



