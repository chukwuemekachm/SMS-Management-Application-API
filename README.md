# SMS-Management-Application-API

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=popout-square&logo=javascript&logoColor=yellow)

[![CircleCI](https://circleci.com/gh/chukwuemekachm/SMS-Management-Application-API.svg?style=svg)](https://circleci.com/gh/chukwuemekachm/SMS-Management-Application-API) [![Coverage Status](https://coveralls.io/repos/github/chukwuemekachm/SMS-Management-Application-API/badge.svg?branch=develop)](https://coveralls.io/github/chukwuemekachm/SMS-Management-Application-API?branch=develop)

SMS-Management-Application-API is a mini REST API built with nest for my `D1` ➣ `D2` assessment to model the following relationships:

- All sms sent by a Contact should be linked to them
- All sms sent to a Contact should be linked to them
- Deleting a contact removes the messages they sent and references to messages they received.

## Getting Started
To setup **SMS-Management-Application-API**, the following should be installed on your machine.

- [Node.js](https://nodejs.org/en/download/current/) 8 and above
- [Postgres](https://www.postgresql.org/)
- [Git](https://git-scm.com/downloads)

### Installation

If you have all the prerequisites you can use the steps below to setup **SMS-Management-Application-API** locally.

##### Clone visand
- Open your terminal and `cd` to the directory where you will like to download **SMS-Management-Application-API**, then run
```sh
git clone https://github.com/chukwuemekachm/SMS-Management-Application-API.git
```
- Change to the **SMS-Management-Application-API** directory
```sh
cd SMS-Management-Application-API
```

##### Setup database
This section assumes your local PostgreSQL installation has a `postgres` user without password
- Run the command below to create a database
```sh
yarn create:db
```
- Run the command below to to populate the database
```sh
yarn migrate:db
```

##### Create and update the env variables
- Run the command below to create a `.env` file from the sample provided
```bash
touch .env
cp .env.sample .env
```
- Now update the environmental variables with the variables you want to use for your **SMS-Management-Application-API** installation.

##### Install Dependencies
- Run the command below to install `node` dependencies
```bash
yarn install
```

### Usage
- To start up your newly installed **SMS-Management-Application-API** run
```sh
yarn start
```

### Running Tests
- To run the automated tests on your newly installed **SMS-Management-Application-API** run
```sh
yarn test
```

### API Docs
- [Postman](https://documenter.getpostman.com/view/3397523/S1TVYdfr?version=latest)

## Built With
- [nest](https://nestjs.com/)
- [pg](https://node-postgres.com/)

## Author

* **Chima Chukwuemeka** [@chukwuemekachm](https://github.com/chukwuemekachm)


## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/chukwuemekachm/SMS-Management-Application-API/blob/develop/LICENSE) file for details
