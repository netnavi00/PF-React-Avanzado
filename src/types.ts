export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  dt: number;
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
    dt_txt: string;
  }>;
}

export const MEXICAN_CITIES = [
  { name: "Ciudad de México", lat: 19.4326, lon: -99.1332 },
  { name: "Guadalajara", lat: 20.6597, lon: -103.3496 },
  { name: "Monterrey", lat: 25.6866, lon: -100.3161 },
  { name: "Puebla", lat: 19.0414, lon: -98.2063 },
  { name: "Tijuana", lat: 32.5149, lon: -117.0382 },
  { name: "León", lat: 21.1225, lon: -101.6750 },
  { name: "Ciudad Juárez", lat: 31.6904, lon: -106.4245 },
  { name: "Zapopan", lat: 20.7236, lon: -103.3848 },
  { name: "Mérida", lat: 20.9674, lon: -89.5926 },
  { name: "San Luis Potosí", lat: 22.1565, lon: -100.9855 },
  { name: "Querétaro", lat: 20.5888, lon: -100.3899 },
  { name: "Aguascalientes", lat: 21.8853, lon: -102.2916 },
  { name: "Hermosillo", lat: 29.0730, lon: -110.9559 },
  { name: "Saltillo", lat: 25.4232, lon: -101.0053 },
  { name: "Mexicali", lat: 32.6245, lon: -115.4523 },
  { name: "Culiacán", lat: 24.8054, lon: -107.3940 },
  { name: "Cancún", lat: 21.1619, lon: -86.8515 },
  { name: "Acapulco", lat: 16.8531, lon: -99.8237 },
  { name: "Oaxaca", lat: 17.0732, lon: -96.7266 },
  { name: "Veracruz", lat: 19.1738, lon: -96.1342 },
];
