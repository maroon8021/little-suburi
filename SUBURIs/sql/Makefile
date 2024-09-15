.PHONY: up-p
up-p:
	docker-compose up postgres -d

.PHONY: down-p
down-p:
	docker-compose down postgres

.PHONY: exec-p
exec-p:
	docker-compose exec postgres bash

.PHONY: up-m
up-m:
	docker-compose up -d mysql

.PHONY: down-m
down-m:
	docker-compose down mysql

.PHONY: exec-m
exec-m:
	docker-compose exec mysql bash
