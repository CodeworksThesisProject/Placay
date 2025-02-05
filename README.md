# Placay

Discover *city highlights* and create *personalized itineraries*

## Prerequisites
Before starting, ensure you have the following installed:
* `Node.js` (version 16 or higher recommended)
* `npm` (usually bundled with Node.js)

## Getting Started
To set up and run Placay, follow these steps:

1. Clone the Repository  
Ensure you have a local copy of the Sellio repository. Just clone it

2. Navigate to the `/server` directory to manage the backend, and the `/client` directory for the frontend

3. Do `npm install` on both directories

4. Make sure MongoDB is installed and running, you can get it with `brew services start mongodb-community@8.0` in Terminal on a Mac

5. Environment Variables:  
  You need to create .env files for variables: `.env.development.local` and `.env.production.local`. For both there are example files `.env.development`and `.env.production`. Rename them and put in the needed information. The files with .local are ignored in .gitignore and should not leave your computer. `.env.development.local` is loaded when `NODE_ENV=develop` is set by a script in `package.json` (e.g. `npm run develop`, see below)

6. Get a Google API Key (for Maps & Places API)
- Go to [Google Cloud Console](https://console.cloud.google.com/apis/dashboard)
- Create a new project (or select an existing one)
- Enable **Maps JavaScript API** & **Places API**
- Generate an **API Key** under Credentials
- Restrict the key (Domain/IP restriction recommended).
- Add it to `.env.production.local` and `.env.development.local` (backend only!): GOOGLE_MAPS_API_KEY= "your_Google_Maps_API_Key"

8. Use the following commands based on your needs (they do work on both directories):
- `npm run develop`: Starts the server and client in the testing environment
- `npm run start`: Launches the application for regular use
- `npm run test`: Executes the test suite to ensure everything is functioning correctly

## Development Documentation

### User Routes
* `/api/register` -> post -> put in name, email and password to create a user and save if to the database. first user will be admin by default
* `/api/login` -> post -> login with email and password
* `/api/logout` -> post -> logout user
* `/api/check-auth` -> get -> Check user authentication status

### User Profile Routes
* `/user` -> get -> gives you a name, email and profile picture url for a user. need to be logged in to use it and send a cookie token with it
* `/user` -> post -> update your name, email and passwort. need to be logged in to use it and send a cookie token with it
* `/user/profileimage` -> post -> Fileupload for a picture to folder /uploads with input type="file" name="profileImage", will set the profileImage field of user to file without base url /uploads/NameOFImage (Name is auto generated when uploading an image)

### User favorites Routes
* `/user/favorite` -> get -> gives you a list of favorites saved in the user profile with latitude, longitude, label, Google Point-of-Interest ID and an unique id
* `/user/favorite` -> post -> lets you add a favorite with latitude, longitude, label, Google Point-of-Interest ID and will create an unique id
* `/user/favorite` -> delete -> send the id of a favorite to delete it

### Tours Routes
* `/tour/:user_id`-> get ->
* `/tour/:user_id` -> post ->
* `/tour/:tour_id` -> put ->
* `/tour/:tour_id` -> delete ->
* `/tour/one/:tour_id` -> get ->

### Cities Route
* `/city/autocomplete/:input`-> get -> gives you the suggestions (name and placeID) of places related to the input received
* `/city/details/:placeId`-> get -> receives the placeID of the place searched and returns the coordinates of the place
* `/city/:cityName` -> post -> receives the coordinates and gives all the points of interest of the location
* `/city/:point_id`-> get -> gives you the details of the selected point of interest


### Google API Route
* `/google/photo` -> get with photoReference -> To avoid exposing the Google API key in the frontend, it is now stored in .env and handled by the backend
Use it: http://localhost:3000/google/photo?photoReference=

### Admin Routes
Need a role `admin` to work
* `/admin/user` -> get -> will get a List of all Users
* `/admin/user` -> post -> will add a new User
* `/admin/user:User ID` -> put -> will update an existing User
* `/admin/user:User ID` -> delete -> will delete a User

If you need an Admin User, use `npm run seed` to create one. Yo can change the Details in `/server/seed/createAdmin`. If there is already an Admin User in the database, you will get the name of that account. Otherwise the first person to register is automatically an Admin User

### User Model
* Fields:
  * name (String, required)
  * email (String, required, unique)
  * password (String, required, hashed when set or changed in userModel.ts by default)
  * role (String, default: "user", values: "user", "admin")
  * profileImage (String, optional, Link to default image or user image in /uploads)
  * favorites (Array of Favorite references, see Favorite Model)
* Dependencies:
  Linked with the Favorite Model through the favorites array
* Token Authentication:
  Uses JWT (generateAuthToken method) for secure authentication

### Favorite Model
* Fields:
  * user (ObjectId, references User, required)
  * label (String, optional, for Name or user can use an own name)
  * latitude (Number, required)
  * longitude (Number, required)
  * googlePOIId (String, optional, can be used to get Name, Description and Picture from Google)
* Dependencies:
  Directly linked to a User Model via the user field
* Usage:
  Represents favorite locations for each user

## Additional Notes
Linting: Use `npm run lint` to ensure your code matches to project standards