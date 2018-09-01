Tools Summary
============
* Core
    * [Node](https://nodejs.org/api/)
    * [Express](https://expressjs.com/)
* DX
    * [TypeScript](https://www.typescriptlang.org/docs/home.html)
    * [TSLint](https://palantir.github.io/tslint/rules/)
* Database
    * [PostgreSQL](https://www.postgresql.org/)
* ORM
    * [Sequelize](http://docs.sequelizejs.com/)
* Authentication
    * [Passport](http://www.passportjs.org/docs/) 
    * [bcrypt](https://www.npmjs.com/package/bcrypt)
* Testing
    * [Mocha](https://mochajs.org/)
    * [Chai](http://www.chaijs.com/api/bdd/)
    * [Istanbul/nyc](https://www.npmjs.com/package/nyc)
* Deployment
    * [Heroku](https://heroku.com/)

Prerequisites
============
Install Node, PostgreSQL, and all [dependencies for bcrypt](https://www.npmjs.com/package/bcrypt#dependencies)

Run the following to create the test and dev databases, replacing `app_name` with the name of your app:
```
createdb app_name_test;
createdb app_name_dev;
```

Installation
============
`npm install`

Environment Variables
============

Create a root `.env` file with contents in the format VAR=VALUE in order to specify environment variables when running the app locally.

For example,
```
TEST_DATABASE_URL=postgres://localhost/app_name_test
DATABASE_URL=postgres://localhost/app_name_dev
NODE_ENV=development
```

Building the App
============
`npm run build`

#### Build and watch for changes
`npm run build-watch`

Linting
============
`npm run lint`

Testing
============
`npm test`

#### Generate Test Coverage
`npm run coverage`

#### View Test Coverage
`npm run view-coverage`

Starting the App
============

`npm start`

To run the linter, delete the `dist` folder, compile the app, and start the server:\
`npm restart`

Deploying the App
============
[Provisioning the Heroku Postgres addon](https://devcenter.heroku.com/articles/heroku-postgresql#provisioning-heroku-postgres) [[Info](https://elements.heroku.com/addons/heroku-postgresql)] 


For help deplying a Node.js app to heroku:\
[Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)