import React from 'react';

const TripResults = ({ tripPlan, onNewTrip }) => {
  return (
    <div className="trip-results">
      <div className="results-header">
        <h2>Your Trip to {tripPlan.destination.name}</h2>
        <button onClick={onNewTrip} className="new-trip-button">
          Plan Another Trip
        </button>
      </div>

      <div className="trip-overview">
        <div className="overview-item">
          <h3>Duration</h3>
          <p>{tripPlan.duration} days</p>
        </div>
        <div className="overview-item">
          <h3>Total Budget</h3>
          <p>{tripPlan.totalBudget}</p>
        </div>
      </div>

      <div className="itinerary-section">
        <h3>Daily Itinerary</h3>
        {tripPlan.itinerary.map((day, index) => (
          <div key={index} className="day-card">
            <h4>Day {day.day}</h4>
            <ul>
              {day.activities.map((activity, idx) => (
                <li key={idx}>{activity}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="hotels-section">
        <h3>Recommended Hotels</h3>
        {tripPlan.hotels.map((hotel, index) => (
          <div key={index} className="hotel-card">
            <h4>{hotel.name}</h4>
            <p>⭐ {hotel.rating} | {hotel.price} | 📍 {hotel.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripResults;
