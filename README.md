# Social Network API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This project provides a RESTful API for a social networking application, enabling users to connect and share thoughts. Built using MongoDB, Mongoose, Node.js, and Express, this backend handles user interactions such as adding friends, posting thoughts, and adding reactions, providing an easily-adaptable framework for a full stack social media application!

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

Clone the repository:

```
git clone https://github.com/otekolste/social-media-backend.git
cd social-network-backend
```

Install dependencies:

```
npm install
```

If you want to seed the database, run

```
npm run seed
```

Then simply do

```
npm start
```

and start testing the routes!

## Usage

To use the API routes, use Insomnia or another API route tester. The routes are as follows:

- `/api/users`: GET all users or POST a new user
- `/api/users/:id`: GET a specific user by the userId, DELETE a specific user by ID, or PUT (update) a specific user by ID
- `/api/users/:id/friends/:friendId`: POST to add a friend to an user's friend list by friend ID, or DELETE friend from an user's friend list by friend ID
- `/api/thoughts`: GET all thoughts or POST a new thought
- `/api/thoughts/:thoughtId`: GET a single thought by its id, PUT (update) a single thought by its id, or DELETE a single thought by its id
- `/api/thoughts/:thoughtId/reactions`: POST a new reaction to a thought
- `/api/thoughts/:thoughtId/reactions/:reactionId`: DELETE a reaction from a thought by thought and reactions IDs

New users should be created in the following format:

```
{
    "username": "example",
    "email": "example@gmail.com"
}
```

New thoughts should be created in the following format:

```
{
    "username":"example",
    "thoughtText": "example text goes here",

}
```

And new reactions can be created using the following format:

```
{
    "username"
}
```

## Credits

### Technologies used:

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/docs/)

Some functions in this code, specifically those in the seed.js file (as designated in the comments), were based off of instructional code provided by edX.

## License

This project is protected under the MIT license. For more information, click on the badge at the top of this README.
