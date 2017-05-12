#!/bin/sh

docker exec -it patternkit composer install
docker exec -it patternkit rm -rf node_modules
docker exec -it patternkit npm install -g grunt grunt-cli
docker exec -it patternkit npm install
docker exec -it patternkit rm -rf bower_components
docker exec -it patternkit bower install --allow-root
docker exec -it patternkit grunt
