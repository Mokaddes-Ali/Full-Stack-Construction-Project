import React, { useState } from 'react';
import Topbar from '../Components/Topbar';

const data = [
  { id: 1, name: 'Dashboard' },
  { id: 2, name: 'Users' },
  { id: 3, name: 'Settings' },
  { id: 4, name: 'Reports' },
  { id: 5, name: 'Analytics' },
  // Add more items as needed
];

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    const results = data.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div>
      <Topbar onSearch={handleSearch} />
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Search Results</h1>
        <ul className="list-disc pl-5">
          {searchResults.length > 0 ? (
            searchResults.map(item => (
              <li key={item.id} className="mb-2">
                {item.name}
              </li>
            ))
          ) : (
            <li>No results found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchPage;
