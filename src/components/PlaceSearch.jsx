import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const PlaceSearch = ({ onPlaceSelect, placeholder = "Search for a destination..." }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
    // Pass the selected place to parent component
    if (onPlaceSelect) {
      onPlaceSelect({
        name: place.label,
        placeId: place.value.place_id,
        description: place.label
      });
    }
  };

  return (
    <div className="place-search">
      <GooglePlacesAutocomplete
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        selectProps={{
          selectedPlace,
          onChange: handlePlaceSelect,
          placeholder: placeholder,
          styles: {
            input: (provided) => ({
              ...provided,
              color: '#333',
              fontSize: '16px',
              padding: '12px',
            }),
            option: (provided, state) => ({
              ...provided,
              color: '#333',
              backgroundColor: state.isFocused ? '#f0f8ff' : 'white',
              padding: '12px',
            }),
            control: (provided) => ({
              ...provided,
              border: '2px solid #e1e5e9',
              borderRadius: '8px',
              minHeight: '48px',
              boxShadow: 'none',
              '&:hover': {
                border: '2px solid #4285f4',
              },
            }),
          },
        }}
        autocompletionRequest={{
          types: ['(cities)'], // Restrict to cities for travel destinations
        }}
      />
    </div>
  );
};

export default PlaceSearch;
