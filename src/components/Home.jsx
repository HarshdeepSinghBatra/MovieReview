import axios from "axios";
import React from "react";
import Banner from "./Banner";
import Movies from "./Movies";

import SearchForm from "./SearchForm";

const Home = ({ IsLogin }) => {
  const [MoviesList, setMoviesList] = React.useState([]);
  const [Loading, setLoading] = React.useState(true);
  const [PageNumber, setPageNumber] = React.useState(1);
  const [HasMore, setHasMore] = React.useState(false);
  const [IsSearching, setIsSearching] = React.useState(false);
  const [SearchTerm, setSearchTerm] = React.useState('');

  const observer = React.useRef();
  const lastMovieElement = React.useCallback(
    (node) => {
      if (Loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && HasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [Loading, HasMore]
  );

  const getMovies = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=${PageNumber}`
      );
      const data = res.data;
      setMoviesList((prevMoviesList) => {
        return [...prevMoviesList, ...data.results];
      });
      setHasMore(data.results.length > 0);
      setLoading(false);
    } catch (err) {
      return;
    }
  };

  const getSearchMovies = async () => {
    try {
      setIsSearching(true)      
      setLoading(true);
      let res;
      if (SearchTerm) {
        res = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${SearchTerm}&page=${PageNumber}`
        );
      }
      
      const data = res.data;
      setMoviesList((prevMoviesList) => {
        return [...prevMoviesList, ...data.results];
      });
      setHasMore(data.results.length > 0);
      setLoading(false);
    } catch (err) {
      return;
    }
  };


  React.useEffect(() => {
    if (IsSearching) {
      getSearchMovies()
    } else {
      getMovies()
    }
  }, [PageNumber]);

  React.useEffect(() => {
    if (SearchTerm.length > 0) {
      setMoviesList([])
      setPageNumber(1)
      getSearchMovies()
    }
  }, [SearchTerm])

 
  const [Scroll, setScroll] = React.useState(0);

  return (
    <>
      <Banner Scroll={Scroll} setScroll={setScroll} />
      <SearchForm
        setSearchTerm={setSearchTerm}
        Scroll={Scroll}
        setScroll={setScroll}
      />
      {MoviesList.length > 0 ? <Movies
        movieslist={MoviesList}
        IsLogin={IsLogin}
        lastMovieElement={lastMovieElement}
      /> : !Loading && "No movies found"}
      {Loading && "Loading..."}
    </>
  );
};

export default Home;
