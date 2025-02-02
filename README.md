# Placay

Discover *city highlights* and create *personalized itineraries*

## Development Documentation

### User Routes
* `/api/register` -> post -> put in name, email and password to create a user and save if to the database. first user will be admin by default
* `/api/login` -> post -> login with email and password
* `/api/logout` -> ??? -> logout user
* `/api/check-auth` -> ??? -> ???

### User Profile Routes
* `/user` -> get -> gives you a name, email and profile picture url for a user. need to be logged in to use it and send a cookie token with it
* `/user` -> post -> update your name, email and passwort. need to be logged in to use it and send a cookie token with it

### User favorites Routes
* `/user/favorite` -> get -> gives you a list of favorites saved in the user profile with latitude, longitude, label and an unique id
* `/user/favorite` -> post -> lets you add a favorite with latitude, longitude, label and will create an unique id
* `/user/favorite` -> delete -> send the id of a favorite to delete it

### Cities Route
* `/city` -> ???

### Admin Routes
Need a role `admin` to work
* `/admin/user` -> get -> will get a List of all Users
* `/admin/user` -> post -> will add a new User
* `/admin/user:User ID` -> put -> will update an existing User
* `/admin/user:User ID` -> delete -> will delete a User

## Prerequisites
Before starting, ensure you have the following installed:
* `Node.js` (version 16 or higher recommended)
* `npm` (usually bundled with Node.js)

## Getting Started
To set up and run Sellio, follow these steps:

1. Clone the Repository
Ensure you have a local copy of the Sellio repository. Just clone it

2. Navigate to the `/server` directory to manage the backend, and the `/client` directory for the frontend

3. Do `npm install` on both directories

4. Make sure MongoDB is installed and running, you can get it with `brew services start mongodb-community@8.0` in Terminal on a Mac

5. Environment Variables:
  You need to create .env files for variables: `.env.development.local` and `.env.production.local`. For both there are example files `.env.development`and `.env.production`. Rename them and put in the needed information. The files with .local are ignored in .gitignore and should not leave your computer. `.env.development.local` is loaded when `NODE_ENV=develop` is set by a script in `package.json` (e.g. `npm run develop`, see below)

7. Use the following commands based on your needs (they do work on both directories):
- `npm run develop`: Starts the server and client in the testing environment
- `npm run start`: Launches the application for regular use
- `npm run test`: Executes the test suite to ensure everything is functioning correctly

## Additional Notes
Linting: Use `npm run lint` to ensure your code matches to project standards