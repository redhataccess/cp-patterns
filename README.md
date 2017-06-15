# cp-patterns
Experimental Customer Portal Web Component Pattern Library.

## Developing Patterns and Components

### Setup
After downloading the repo, install [Docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/install/) (often bundled).

Within the source tree, run the following:

```
$ docker-compose up
```

By default, the container will listen on [localhost](http://localhost:8080/) port **8080**. If you would like to change that, set the **PK_LISTEN_PORT** environment variable.
```
$ PK_LISTEN_PORT=9993
$ docker-compose up
```

When it completes, open another terminal and run `init.sh`

```
$ sh ./init.sh
```

It will automatically install the Composer, NPM and Bower dependencies into the container and run Grunt to generate the dist folder.

From that point forward, you can use `psh.sh` to get a shell into the container:

```
$ ./psh.sh
```