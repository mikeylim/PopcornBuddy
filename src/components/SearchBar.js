// components/SearchBar.js
import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    const response = await axios.get(`/api/movies?query=${query}`);
    onSearch(response.data);
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by category, director, actor, genre, or name"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
