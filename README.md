
# Smart Brain
SmartBrain is a web app which uses the MERN stack to detect faces in an image URL input by the user, by making calls to Clarifai's Machine Learning API.

The project uses
- ReactJS for its front end
- ExpressJS for backend
- MongoDB as its database

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
You will need to have Node.js and npm (Node Package Manager) installed on your computer. You can download Node.js from the official website (https://nodejs.org/) and it will come with npm.

### Installing
Clone the repository to your local machine:

```
git clone https://github.com/kaivalya9936/smartbrain.git
```

Navigate to the root directory of the project:

```
cd smartbrain_api
```

### Install the required dependencies:

```
npm install express
npm install mongoose

```

## Running the app
To run the server, use the following command:

```
npm start
```
This will start a development server and the app will be available at http://localhost:3000

Note: In order for the server to be able to fetch data from MongoDB, you need to have the database running in a separate terminal/ command line interface:
Use the following command to run the database:
```
mongod

```

## Built With
ExpressJS - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

MongoDB - Open source NoSQL database management program
