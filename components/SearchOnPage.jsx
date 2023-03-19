const SearchOnPage = ({ onSearch }) => {
  return (
    <form className="p2_search search_form" onSubmit={onSearch}>
      <input
        className="p2_search_type"
        // value={search}
        type="text"
        placeholder="Search for a country..."
        onChange={onSearch}
        name="country"
      ></input>
    </form>
  );
};

export default SearchOnPage;
