.PHONY: reproduce build up down logs clean

reproduce: build up

build:
	docker-compose build

up:
	docker-compose up -d
	@echo "API available at http://localhost:8000"
	@echo "Docs available at http://localhost:8000/docs"

down:
	docker-compose down

logs:
	docker-compose logs -f

clean: down
	docker-compose rm -f
	docker rmi knitibot-repro-api 2>/dev/null || true

