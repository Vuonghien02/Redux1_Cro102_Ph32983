import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (text) => {
    setQuery(text);
    if (onSearch) {
      onSearch(text);
    }
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <TextInput
        placeholder="Search by title"
        value={query}
        onChangeText={handleChange}
      />
    </View>
  );
};

export default SearchBar;
