/* React */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
/* Components */
import Header from './components/Header';
import UserOutputComponent from './components/UserOutputComponent'; // Import the UserOutputComponent
/* Config */
import userIds from './config/userIds.json';
import mockSubscriptionResponse from './config/mockSubscriptionRes';
/* Styles */
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true';
console.log("Using Mock Data? " + USE_MOCK_DATA);

const SUBSCRIPTION_OPTIONS_API = '/subscriptionquery/v1/subscription-options?userId=';
const BOX_PRICES_API = '/boxPrices';
const REFRESH_TIME = 10000;

function App() {
  const [boxSizes, setBoxSizes] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [boxPrices, setBoxPrices] = useState({});

  const fetchSubscriptionData = async () => {
    if (USE_MOCK_DATA) {
      setBoxSizes([
        { userId: '12345678', description: '**MOCK DATA**', boxSizes: mockSubscriptionResponse.data.boxSize },
      ]);
      setLastUpdated(new Date().toLocaleString());
      return; // Exit the function for mock data
    }

    try {
      const promises = userIds.map(async ({ id, description }) => {
        const response = await axios.get(`${SUBSCRIPTION_OPTIONS_API}${id}`);
        return { userId: id, description, boxSizes: response.data.data.boxSize };
      });

      const userData = await Promise.all(promises);
      setBoxSizes(userData);
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.error('Error fetching subscription options:', error);
    }
  };

  const fetchPricingData = async () => {
    try {
      const response = await axios.get(BOX_PRICES_API);
      setBoxPrices(response.data.result.data);
    } catch (error) {
      console.error('Error fetching pricing data:', error);
    }
  };

  useEffect(() => {
    fetchSubscriptionData();
    fetchPricingData();

    const intervalId = setInterval(() => {
      fetchSubscriptionData();
      fetchPricingData();
    }, REFRESH_TIME);

    // Cleanup interval to avoid memory leaks
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <Header lastUpdated={lastUpdated} refresh={REFRESH_TIME} />
      {boxSizes.map(({ userId, description, boxSizes }, index) => (
        <UserOutputComponent
          key={index}
          userId={userId}
          description={description}
          boxSizes={boxSizes}
          boxPrices={boxPrices}
        />
      ))}
    </div>
  );
}

export default App;