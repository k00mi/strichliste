start:
	node server.js

database:
	node createDatabase.js

run-unit-tests:
	NODE_ENV=test mocha --timeout 10000 --reporter dot $(shell find tests/unit -name "*.tests.js")

run-integration-tests	:
	NODE_ENV=test mocha --timeout 10000 --reporter dot $(shell find tests/integration -name "*.tests.js")

install-packages:
	npm i

test:
	npm prune
	@make run-unit-tests
	@make run-integration-tests

cover:
	NODE_ENV=test ./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha -- tests/unit/*.tests.js --timeout 10000 --reporter dot
	NODE_ENV=test ./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha -- tests/integration/*.tests.js --timeout 10000 --reporter dot

make travis:
	npm outdated --depth=0
	@make install-packages
	@make test
	@make cover

setup:
	@make install-packages
	@make test
	@make database
