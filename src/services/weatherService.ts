import { WeatherData, ForecastData } from '../types';

const API_KEY = "f0d31ab118ad9dbfe0d08c5c689ea5c2";
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherService = {
  async getCurrentWeather(city: string): Promise<WeatherData> {
    if (!API_KEY) throw new Error('OpenWeather API Key is missing');
    const encodedCity = encodeURIComponent(city);
    
    let response = await fetch(
      `${BASE_URL}/weather?q=${encodedCity},MX&units=metric&lang=es&appid=${API_KEY}`
    );
    
    
    if (!response.ok) {
      response = await fetch(
        `${BASE_URL}/weather?q=${encodedCity}&units=metric&lang=es&appid=${API_KEY}`
      );
    }

    if (!response.ok) throw new Error('City not found');
    return response.json();
  },

  async getCurrentWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
    if (!API_KEY) throw new Error('OpenWeather API Key is missing');
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error('Weather data not found');
    return response.json();
  },

  async getForecast(city: string): Promise<ForecastData> {
    if (!API_KEY) throw new Error('OpenWeather API Key is missing');
    const encodedCity = encodeURIComponent(city);
    
    let response = await fetch(
      `${BASE_URL}/forecast?q=${encodedCity},MX&units=metric&lang=es&appid=${API_KEY}`
    );

    
    if (!response.ok) {
      response = await fetch(
        `${BASE_URL}/forecast?q=${encodedCity}&units=metric&lang=es&appid=${API_KEY}`
      );
    }

    if (!response.ok) throw new Error('Forecast not found');
    return response.json();
  },

  async getForecastByCoords(lat: number, lon: number): Promise<ForecastData> {
    if (!API_KEY) throw new Error('OpenWeather API Key is missing');
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error('Forecast data not found');
    return response.json();
  }
};
