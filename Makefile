.DEFAULT_GOAL := all

all:

status:
	git status

log:
	git log

log-graph:
	git log --graph

deploy:
	git checkout deployment
	git merge origin/master
	git push origin deployment
	git checkout master
	@echo "deployment successful!"

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



