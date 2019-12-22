all:
	side

serve:
	cd build/ && python -m http.server

watch:
	while true; do \
		make; \
		inotifywait -qre close_write .; \
	done
