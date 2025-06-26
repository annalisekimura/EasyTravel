import React, { useState } from 'react';
import { getFlightsData } from '../api';
import '../css/Flights.css'; // Add a separate CSS file for styles

const Flights = () => {
  const [formData, setFormData] = useState({
    fromId: '',
    toId: '',
    departDate: '',
    returnDate: '',
    adults: '1',
    children: '0',
    stops: 'none',
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [airlines, setAirlines] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await getFlightsData(formData);
      const offers = response.flightOffers || [];
      const uniqueOffers = Array.from(new Set(offers.map(JSON.stringify))).map(JSON.parse); // remove duplicates
      setResults(uniqueOffers);
      setAirlines(response.aggregation?.airlines || []);
    } catch (error) {
      console.log(error);
      setResults([]);
      setAirlines([]);
    }
    setLoading(false);
  };

  return (
    <div className="flights-container">
      <h2>Search Flights</h2>
      <form onSubmit={handleSubmit} className="flights-form">
        <input type="text" name="fromId" placeholder="From (e.g. BOM)" value={formData.fromId} onChange={handleChange} required />
        <input type="text" name="toId" placeholder="To (e.g. DEL)" value={formData.toId} onChange={handleChange} required />
        <input type="date" name="departDate" value={formData.departDate} onChange={handleChange} required />
        <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} />
        <input type="number" name="adults" min="1" value={formData.adults} onChange={handleChange} />
        <input type="number" name="children" min="0" value={formData.children} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}

      <div className="flights-results">
        {results.length > 0 && <h3>Available Flights:</h3>}
        {results.map((flight, idx) => {
          const segment = flight.segments?.[0];
          const airline = segment?.legs?.[0]?.carriersData?.[0];
          const departureTime = new Date(segment?.departureTime);
          const arrivalTime = new Date(segment?.arrivalTime);
          const price = flight?.priceBreakdown?.total?.units;

          return (
            <div key={idx} className="flight-card">
              <img src={airline.logo} alt={airline.name} className="airline-logo" />
              <div>
                <h4>{airline.name || 'Unknown Airline'}</h4>
                <p>{departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} → {arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p>{departureTime.toLocaleDateString()} | Price: <strong>{price} USD</strong></p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Flights;
