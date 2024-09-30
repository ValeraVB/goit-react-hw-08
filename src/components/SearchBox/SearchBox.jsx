import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";
import "./SearchBox.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className="search-box-container">
      <label htmlFor="search-box">Search contacts</label>
      <input
        id="search-box"
        type="text"
        value={filter}
        onChange={handleChange}
        className="search-box"
      />
    </div>
  );
};

export default SearchBox;
