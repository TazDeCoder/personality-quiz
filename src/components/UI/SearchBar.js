import "./SearchBar.css";

function SearchBar(props) {
  return (
    <div className="searchbar">
      <form className="searchbar-form">
        <input
          className="searchbar-form__input"
          type="text"
          onChange={props.onType}
        />
      </form>

      <ul className="searchbar-list">
        {props.suggestions.map((suggestion, idx) => (
          <li className="searchbar-list__item" key={idx}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
