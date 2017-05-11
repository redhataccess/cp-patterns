#!/bin/sh

docker exec -it patternkit composer install
docker exec -it patternkit rm -rf node_modules
docker exec -it patternkit npm install -g
docker exec -it patternkit bower install --allow-root
