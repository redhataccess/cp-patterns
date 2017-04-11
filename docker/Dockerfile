FROM php:7-apache

RUN a2enmod rewrite headers

# Install the PHP extensions we need
RUN apt-get update && apt-get install -y libpq-dev libxml2-dev \
	&& rm -rf /var/lib/apt/lists/* \
	&& docker-php-ext-install opcache mbstring zip

# Install composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php -r "if (hash_file('SHA384', 'composer-setup.php') === '669656bab3166a7aff8a7506b8cb2d1c292f042046c5a994c43155c0be6190fa0355160742ab2e1c88d40d5be660b410') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" \
    && php composer-setup.php --install-dir=/bin --filename=composer \
    && php -r "unlink('composer-setup.php');"

WORKDIR /var/www/html

# Install xdebug
RUN yes | pecl install xdebug
