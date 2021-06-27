import "./Css/Searchbar.css";

import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import SearchSvg from "../Assets/Search.svg";

const SearchBar = ({setGenreName}) => {
  const [input, setInput] = useState("");
  const node = useRef();
  const inputFocus = useRef();
  const history = useHistory();

  //history.push will trigger useEffect in Search.js. There, match will fetch the input and search for a match.
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (input.length === 0) {
      return;
    }
    setInput("");
    history.push(`/search/${input}`);
  };

  return (
    <form
      className="form"
      onClick={() => {
        inputFocus.current.focus();
      }}
      onSubmit={onFormSubmit}
      ref={node}
    >
      <button type="submit" className="buttton">
        <img src={`${SearchSvg}`} alt="SearchButton" />
      </button>
      <input
        className="input"
        onChange={(e) => setInput(e.target.value)}
        ref={inputFocus}
        value={input}
        placeholder="Search for a movie..."
      />
    </form>
  );
};

export default SearchBar;
