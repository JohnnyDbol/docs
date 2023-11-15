import React, { useState, useEffect } from 'react';

const SearchBar = ({ docs, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            const results = [];
            docs.forEach((category, catIndex) => {
                // Search in Children
                category.Children?.forEach((child, childIndex) => {
                    if (child.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                        results.push({ label: `Child: ${child.title}`, catIndex, childIndex, type: 'child' });
                    }
                });

                // Search in Properties
                category.Properties?.forEach((prop, propIndex) => {
                    if (prop.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                        results.push({ label: `Property: ${prop.title}`, catIndex, propIndex, type: 'prop' });
                    }
                });

                // Search in Functions
                category.Functions?.forEach((func, funcIndex) => {
                    if (func.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                        results.push({ label: `Function: ${func.title}`, catIndex, funcIndex, type: 'func' });
                    }
                });
            });
            setFilteredResults(results);
        } else {
            setFilteredResults([]);
        }
    }, [searchTerm, docs]);

    const handleResultClick = (result) => {
        // Call the onSelect function with the desired array format
        onSelect([result.catIndex, result.childIndex ?? result.propIndex ?? result.funcIndex, result.type]);
        setSearchTerm('')
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="p-2 border border-gray-300 rounded"
            />
            {filteredResults.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-y-auto">
                    {filteredResults.map((result, index) => (
                        <li
                            key={index}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleResultClick(result)}
                        >
                            {result.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
