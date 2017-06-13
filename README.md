# cp-patterns
Experimental Customer Portal Web Component Pattern Library.

## Setup
After downloading the repo, install [Docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/install/) (often bundled).

Within the source tree, run the following:

```
docker-compose up
```

When it completes, open another terminal and run `init.sh`

```
sh ./init.sh
```

It will automatically install the Composer, NPM and Bower dependencies into the container and run Grunt to generate the dist folder.

From that point forward, you can use `psh.sh` to get a shell into the container:

```
./psh.sh
```