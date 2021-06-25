import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import "./Css/Searchbar.css"
import SearchSvg from '../Assets/Search.svg'

const SearchBar = () => {
  const [input, setInput] = useState("");
  const node = useRef();
  const inputFocus = useRef();
  const history = useHistory();

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
      className="formy"
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
        className="inputt"
        onChange={(e) => setInput(e.target.value)}
        ref={inputFocus}
        value={input}
        placeholder="Search for a movie..."
      />
    </form>
  );
};

export default SearchBar;
