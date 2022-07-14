import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const Searchbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(false);
  }, [query]);

  const submitQuery = e => {
    e.preventDefault();
    onSearch(query);
    setDisabled(true);
  };

  const onChange = e => {
    setQuery(e.target.value.trim());
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={submitQuery}>
        <button
          type="submit"
          className={css['SearchForm-button']}
          disabled={disabled}
        >
          <span className={css['SearchForm-button-label']}>Search</span>
        </button>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
          className={css['SearchForm-input']}
          value={query}
          onChange={onChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Searchbar;
