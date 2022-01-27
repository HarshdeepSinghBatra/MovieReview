import React from "react";

const SearchForm = ({ setSearchTerm, Scroll, setScroll }) => {
  const InputRef = React.useRef(null);
  
  const [SearchText, setSearchText] = React.useState("");

  React.useEffect(() => {
    if (Scroll !== 0) {
      window.scrollTo({
        top: InputRef.current.offsetTop - 20,
        behavior: "smooth",
      });
    }
  }, [Scroll]);

  const searchMovie = (e) => {
    e.preventDefault();
    setSearchTerm(SearchText);
    setSearchText("");
  };

  return (
    <div className="search-form-wrapper">
      <form action="" className="search-form" onSubmit={searchMovie}>
        <input
          type="text"
          placeholder="Search movie..."
          value={SearchText}
          ref={InputRef}
          onFocus={() => setScroll(Scroll + 1)}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
