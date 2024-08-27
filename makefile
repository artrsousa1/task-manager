build:
	docker compose -f docker/compose.yml up --build

start:
	docker compose -f docker/compose.yml up

stop:
	docker compose -f docker/compose.yml down
	
stop-v:
	docker compose -f docker/compose.yml down -v