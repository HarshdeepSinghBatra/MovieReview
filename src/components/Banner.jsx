import React from "react";
import axios from "axios";

const Banner = ({ setScroll, Scroll }) => {

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
    <div className="banner" style={{background: `url(${RandomBackdrop})`}}>
      <div className="banner-inner">
        <span className="title">Movie Review</span>
        <p>
          Tag line - Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eos, voluptate rem laboriosam sint iusto commodi. Est aliquam delectus
          consequatur, quibusdam sunt modi sit ducimus odit quia nam veniam,
          laudantium perspiciatis.
        </p>
        <button className='cta-btn' onClick={() => {setScroll(Scroll+1)}} >Get Started</button>
      </div>
    </div>
  );
};

export default Banner;
