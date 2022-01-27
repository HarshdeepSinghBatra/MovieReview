import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const PageNotFound = () => {

    const [RandomBackdrop, setRandomBackdrop] = React.useState('');

    const getRandomBackdrop = async () => {
        const res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc`
        );
        const MoviesList = res.data.results;
        const random = Math.floor(Math.random() * 20);
        setRandomBackdrop(`https://image.tmdb.org/t/p/w1280${MoviesList[random].backdrop_path}`)
    }


    React.useEffect(() => {
        getRandomBackdrop()
    }, [])


    return (
        <div className="not-found-wrapper" style={{background: `url(${RandomBackdrop})`}}>
            <div className="not-found">
                <h1>Lost your way?</h1>
                <p>Sorry, we can't find the page you're looking for.</p>
                <Link to="/" ><button className="signin-btn"> Return Home </button></Link>
            </div>
        </div>
    )
}

export default PageNotFound
