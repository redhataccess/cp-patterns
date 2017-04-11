FROM php:7-apache

RUN a2enmod rewrite headers

# Install the PHP extensions we need
RUN apt-get update && apt-get install -y libpq-dev libxml2-dev \
	&& rm -rf /var/lib/apt/lists/* \
	&& docker-php-ext-install opcache mbstring zip

WORKDIR /var/www/html

# Install xdebug
RUN yes | pecl install xdebug
