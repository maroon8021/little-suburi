up:
	docker compose up -d

start:
	docker compose start

stop:
	docker compose stop

in:
	docker exec -it -w /app prophet /bin/sh 

run:
	python app.py

notebook:
	jupyter notebook --port=8888 --ip=0.0.0.0 --allow-root --NotebookApp.token=''
install:
	pip install prophet plotly notebook 