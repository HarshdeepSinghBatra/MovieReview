# Movie Review App
A platform designed for users to view and post reviews for all the latest movies. Get to know what's trending and increase your watch list.

### Dev Tools / Technologies
1. Client side code written in **React**
2. **Node** and **Express** used for server side code.
3. **PostgreSQL** is used for maintaining database.
4. **JWT Authentication** to securely signin in and avail the services as a registered user.
5. **TMDB API** for getting access to the movies data.
6. Form fields managed using **React-Hook-Form**.
7. Implemented infinite scrolling with **Intersection observer**.

### Color Reference
| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Royal Blue | ![#4169e1](https://via.placeholder.com/10/4169e1?text=+) #4169e1 |
| Dark Blue | ![#0e1f20](https://via.placeholder.com/10/0e1f20?text=+) #0e1f20 |
| Red | ![#ff0000](https://via.placeholder.com/10/ff0000?text=+) #ff0000 |

### Environment Variables
To run this project, you will need to add the following environment variables to your .env file in the server directory

`JWT_ACCESS_TOKEN`
`DATABASE_HOSTNAME`
`DATABASE_PORT`
`DATABASE_USERNAME`
`DATABASE_PASSWORD`

and the following environment variables to your .env file in the client directory

`REACT_APP_TMDB_API_KEY`

### Installation

Follow the steps to setup a developement environment for this app:

- Clone this repo. Use the command, or simple download the zip file for code
```bash
  git clone https://github.com/Kawaljeet2001/Artistify-Community-Platform.git
```

- Setting up server dependencies
```bash
  cd ./server
  yarn install or npm install
```

- Create .env file and add in all the environment variables

- Setting up client dependencies
```bash
  cd ./client
  yarn install or npm install
```

- Starting the dev servers
```bash
  cd ./client
  yarn start
  
  cd ./server
  nodemon server or npm start
