test:
	python -m pytest "src/tests" -p no:warnings --cov="src"

lint:
	flake8 src
	black src
	isort src