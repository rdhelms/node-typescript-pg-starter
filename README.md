Tools Summary
============
* Core
    * Node
    * Express
* DX
    * TypeScript
    * TSLint
* Database
    * PostgreSQL
* ORM
    * Sequelize
* Authentication
    * Passport 
    * bcrypt
* Testing
    * Mocha
    * Chai
    * Istanbul/nyc
* Deployment
    * Heroku

Installation
============
`npm install`

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

Environment Variables
============

Create a root `.env` file with contents in the format VAR=VALUE in order to specify environment variables when running the app locally.

For example,
```
DATABASE_URL=connection_string_from_heroku
```

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