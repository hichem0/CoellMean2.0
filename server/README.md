<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="http://kamilmysliwiec.com/public/nest-logo.png#1" alt="Nest Logo" /></a>
</p>


## Description

This repository is the server side of the Coell project.

It's made with the [Nest](https://docs.nestjs.com/v4/) framework `4.5` , a **TypeScript** framework for nodejs. 

It's using the folowing tools : 

- [Typeorm](http://typeorm.io/) orm for database access
- [class-validator](https://github.com/typestack/class-validator) for validating user input
- [class-transfomer](https://github.com/typestack/class-transformer) for transformation into classes
- [passportjs](http://www.passportjs.org/) for authentication
- [swagger](https://docs.nestjs.com/v4/recipes/swagger) for api documentation


It's currently using a posgresql database and can be configured in the `ormconfig.json` file.
If you need to run a posgresql with the good settings, you can run `docker-compose -f docker/postgresql.yml up -d `
## Installation

```bash
$ npm install
# or
$ yarn install

```

## Start

In normal mode : 
```bash
$ npm run start
# or
$ yarn start
```

In watch mode : 
```bash
$ npm run start:watch
# or
$ yarn start:watch
```

And by default, the app is listening on port `3001`.

## Utils

To view the documentation, go to `http://localhost:3001/docs` to see the generated docs.


There is a linter too.

```bash
$ npm run lint
# or
$ yarn lint
```

## People of the back

- Author - [Nicolas Beaussart](mailto:nic.beaussart@gmail.com)


## Organisation

There is some modules in the app : 
* `auth` contains the auth, guards and passport logic
* `app` contains the main subject of this project
