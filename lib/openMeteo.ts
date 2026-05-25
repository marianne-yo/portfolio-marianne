import { fetchWeatherApi } from "openmeteo";

export type WeatherData = {
  time: Date[];
  temperature_2m: Float32Array | null;
  relative_humidity_2m: Float32Array | null;
  weather_code: Float32Array | null;
  timezone: string | null;
  utcOffsetSeconds: number;
};

export default async function openMeteo(): Promise<WeatherData> {
  const params = {
    latitude: 15.6686,
    longitude: 120.5783,
    hourly: ["temperature_2m", "relative_humidity_2m", "weather_code"],
    timezone: "auto",
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);
  const response = responses[0];

  const utcOffsetSeconds = response.utcOffsetSeconds();
  const hourly = response.hourly()!;

  return {
    time: Array.from(
      { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
      (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
    ),
    temperature_2m: hourly.variables(0)!.valuesArray(),
    relative_humidity_2m: hourly.variables(1)!.valuesArray(),
    weather_code: hourly.variables(2)!.valuesArray(),
    timezone: response.timezone(),
    utcOffsetSeconds,
  };
}