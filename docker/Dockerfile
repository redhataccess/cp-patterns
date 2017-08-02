FROM php:7.0-apache

RUN a2enmod rewrite headers

# Install the PHP extensions we need
RUN apt-get update \
 && apt-get install -y libpq-dev libxml2-dev \
 && rm -rf /var/lib/apt/lists/* \
 && docker-php-ext-install opcache mbstring zip

# Install npm / nodejs and bower
RUN apt-get update -yq \
 && apt-get install -yq curl git nano \
 && curl -sL https://deb.nodesource.com/setup_4.x | bash - \
 && apt-get install -yq nodejs build-essential \
 && rm -rf /var/lib/apt/lists/* \
 && npm install -g npm bower

# Install composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
 && php -r "if (hash_file('SHA384', 'composer-setup.php') === '669656bab3166a7aff8a7506b8cb2d1c292f042046c5a994c43155c0be6190fa0355160742ab2e1c88d40d5be660b410') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" \
 && php composer-setup.php --install-dir=/bin --filename=composer \
 && php -r "unlink('composer-setup.php');"

# Copy current source to docker container so that we can do some iterative
COPY . /var/www/html

WORKDIR /var/www/html

RUN composer install
RUN rm -rf node_modules
RUN npm --max_semi_space_size=1 --max_old_space_size=198 --max_executable_size=148 install -g grunt grunt-cli
RUN npm --max_semi_space_size=1 --max_old_space_size=198 --max_executable_size=148 install

# Install app dependencies - cannot do this at build time since the source is not there.
#RUN composer install --no-plugins --no-scripts  \
# && npm install \
# && bower install

#CMD bash -e "grunt watcher"

# Install xdebug
#RUN yes | pecl install xdebug
