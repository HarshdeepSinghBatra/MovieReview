# Movie Review App
A platform designed for users to view and post reviews for all the latest movies. Get to know what's trending and increase your watch list.

### App Screenshots

![Home page banner](https://firebasestorage.googleapis.com/v0/b/moviereviewapp-57bd9.appspot.com/o/HomePageBanner.png?alt=media&token=25f3df44-a4e9-4e56-897f-0fab52f17f92)
![Home page movies list](https://firebasestorage.googleapis.com/v0/b/moviereviewapp-57bd9.appspot.com/o/MoviesList.png?alt=media&token=9534955e-1e49-4b91-a1d2-b1f068403727)
![Review modal](https://firebasestorage.googleapis.com/v0/b/moviereviewapp-57bd9.appspot.com/o/ReviewModal.png?alt=media&token=e1ac4c7c-dbbf-4344-9248-fd99ef59022a)

### Dev Tools / Technologies
1. Client side code written in **React**
2. **NodeJS** and **Express** used for server side code.
3. **PostgreSQL** is used for maintaining database.
4. **JWT Authentication** to securely signin in and avail the services as a registered user.
5. **TMDB API** for getting access to the movies data.
6. Implemented infinite scrolling with **Intersection observer**.

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
  git clone https://github.com/HarshdeepSinghBatra/MovieReview.git
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
