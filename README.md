# cp-patterns
Experimental Customer Portal Web Component Pattern Library

After downloading the repo, install docker and docker-compose (often bundled)

Within the source tree, run the following

docker-compose up

When it completes, open another terminal and run init.sh

sh ./init.sh

It will install the composer, npm and bower dependencies into the container and run grunt to generate the dist folder.

From that point forward, you can use psh.sh to get a shell into the container

./psh.sh
