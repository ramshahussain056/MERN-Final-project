import React, { useState } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';

const WeatherApp = () => {
  const [city, setCity] = useState('');

  const fetchWeatherData = async () => {
    const apiKey = '8d83c5a3b95256f46f5f781dfaa264d8';
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    const data = await response.json();
    return data;
  };

  const queryClient = new QueryClient();

  const { data, isLoading, isError, refetch } = useQuery('weatherData', fetchWeatherData, {
   // Delayed execution, only when city is provided
    queryClient,
  });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (city) {
  //     // Enable query execution when city is provided
  //     queryClient.refetchQueries('weatherData');
  //   }
  // };

  return (
    <div>
      <form onSubmit={refetch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter your City"
        />
        <button type="submit">Get Weather</button>
      </form>

      {isLoading && <div>Loading...</div>}

      {isError && <div>Failed to fetch weather data.</div>}

      {data && data.main && (
        <div>
          <h2>Weather in {data.name}</h2>
          <p>Temperature: {data.main.temp}°C</p>
          <p>Humidity: {data.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <WeatherApp />
    </QueryClientProvider>
  );
};

export default App;
