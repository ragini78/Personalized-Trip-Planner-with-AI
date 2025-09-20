import React, { useState } from 'react';
import PlaceSearch from './PlaceSearch';

const TripPlannerForm = ({ onSubmit }) => {
  const [tripDetails, setTripDetails] = useState({
    destination: null,
    startDate: '',
    endDate: '',
    budget: '',
    travelers: 1,
    interests: []
  });

  const handleDestinationSelect = (place) => {
    setTripDetails(prev => ({
      ...prev,
      destination: place
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTripDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interest) => {
    setTripDetails(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tripDetails.destination) {
      onSubmit(tripDetails);
    } else {
      alert('Please select a destination');
    }
  };

  const interestOptions = [
    'Sightseeing', 'Food & Dining', 'Adventure', 'Culture', 
    'Nightlife', 'Shopping', 'Nature', 'History', 'Art'
  ];

  return (
    <form onSubmit={handleSubmit} className="trip-planner-form">
      <div className="form-section">
        <label className="form-label">Destination</label>
        <PlaceSearch 
          onPlaceSelect={handleDestinationSelect}
          placeholder="Where do you want to go?"
        />
        {tripDetails.destination && (
          <p className="selected-destination">
            📍 {tripDetails.destination.name}
          </p>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={tripDetails.startDate}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">End Date</label>
          <input
            type="date"
            name="endDate"
            value={tripDetails.endDate}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Budget ($)</label>
          <select
            name="budget"
            value={tripDetails.budget}
            onChange={handleInputChange}
            className="form-input"
            required
          >
            <option value="">Select budget range</option>
            <option value="budget">Budget ($0 - $500)</option>
            <option value="moderate">Moderate ($500 - $1500)</option>
            <option value="luxury">Luxury ($1500+)</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Number of Travelers</label>
          <input
            type="number"
            name="travelers"
            value={tripDetails.travelers}
            onChange={handleInputChange}
            className="form-input"
            min="1"
            max="10"
            required
          />
        </div>
      </div>

      <div className="form-section">
        <label className="form-label">Interests</label>
        <div className="interests-grid">
          {interestOptions.map(interest => (
            <button
              key={interest}
              type="button"
              onClick={() => handleInterestChange(interest)}
              className={`interest-button ${
                tripDetails.interests.includes(interest)  
                ? 'selected' : ''
            }`}
          >
            {interest}
            </button>
          ))}
        </div>
      </div>

      <button type="submit" className="submit-button">
        Plan My Trip ✈️
      </button>
    </form>
  );
};

export default TripPlannerForm;
