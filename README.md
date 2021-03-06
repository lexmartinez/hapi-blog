# hapi-blog
[![Build Status](https://img.shields.io/travis/lexmartinez/hapi-blog/master.svg?style=for-the-badge)](https://travis-ci.org/lexmartinez/hapi-blog)
[![GitHub license](https://img.shields.io/github/license/lexmartinez/hapi-blog.svg?style=for-the-badge)](https://github.com/lexmartinez/hapi-blog/blob/master/LICENSE.md)
[![Last version](https://img.shields.io/badge/version-v1.0.0-blue.svg?style=for-the-badge)](https://github.com/lexmartinez/hapi-blog/blob/master/CHANGELOG.md)
<br/><br/>
:octopus: A blogging engine API built on HapiJS <br/>

Simple, powerful, flexible blogging engine, created as HapiJS study case with with purpose to be my website/blog core engine.


### Quick start

```bash
# clone repo
$ git clone https://github.com/lexmartinez/hapi-blog

# change directory to cloned app
$ cd hapi-blog

# install the dependencies with npm
$ npm install

# start the server
$ npm start
```
go to [http://localhost:3000](http://localhost:3000) in your browser.

# Table of Contents

* [Dependencies](#dependencies)
* [Developing](#developing)
* [Environment](#environment)
* [Testing](#testing)
* [Deployment](#deployment)
* [License](#license)
    
 ## Dependencies
 
 What you need to run this app:
 * `node` and `npm` (Use [NVM](https://github.com/creationix/nvm))
 * Ensure you're running Node (`v7.x.x`+) and NPM (`4.x.x`+)
 
 ## Developing
 
 After you have installed all dependencies you can now start developing with:
 
 * `npm start`
 
 It will start a local server using `nodemon` which will watch, build (in-memory), and reload for you. The application can be checked at `http://localhost:3000`.
 
 ## Environment
 Environment variables must be configured into `.env` file located at project root

```
PORT=3000
DB_HOST=127.0.0.1
DB_NAME=blog
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_DIALECT=mysql
```````
> With the DB env variables configured, you can create all data schema with `sequelize.sync()` method see the [sequelize docs](http://docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html)
 ## Testing
 
 `hapi-blog` has an [ESLint](https://eslint.org/) integration for consistent code inspection, you can run that tool with command:
 
 * `npm test`
 
 ## Deployment
 
 This API is ready to be deployed to Heroku through TravisCI (using the .travis.yml file and Procfile) you just need to create the heroku app and setup the heroku key on travisCI
  
## License

This project is licensed under MIT License - see the [LICENSE.md](https://github.com/lexmartinez/hapi-blog/blob/master/LICENSE.md) file for details
