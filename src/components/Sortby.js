import "./Css/SortBy.css";

import Select from "react-select";

const options = [
  { value: "popularity.desc", label: "Popularity" },
  { value: "release_date.desc", label: "Release Date" },
  { value: "vote_average.desc", label: "Votes Average" },
];

const SortBy = ({ option, setOption }) => {
  const handleSetOptionChange = (selectedOption) => {
    setOption(selectedOption);
  };

  return (
    <Select
      className="sortBy"
      value={option}
      options={options}
      onChange={(o) => handleSetOptionChange(o)}
    />
  );
};

export default SortBy;
