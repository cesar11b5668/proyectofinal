// src/components/Search.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            onSearch(searchTerm);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-inline justify-content-center">
            <input
                type="text"
                className="form-control mb-2 mr-sm-2"
                placeholder="Search for a character"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-primary mb-2">Search</button>
        </form>
    );
};

Search.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default Search;
