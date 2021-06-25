import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

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
      className="form"
      onClick={() => {
        inputFocus.current.focus();
      }}
      onSubmit={onFormSubmit}
      ref={node}
    >
      <button type="submit" className="buttton">
        XXX
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
