"use client";

import { useEffect, useState } from "react";
import { MapPin, Droplet } from "lucide-react";
type WeatherData = {
  time: Date[];
  temperature_2m: Float32Array | null;
  relative_humidity_2m: Float32Array | null;
  weather_code: Float32Array | null;
  timezone: string | null;
};

function getWeatherLabel(code: number): string {
  if (code === 0) return "Clear sky";
  if (code <= 3) return "Partly cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 67) return "Rainy";
  if (code <= 77) return "Snowy";
  if (code <= 82) return "Showers";
  if (code <= 99) return "Thunderstorm";
  return "Unknown";
}

function getWeatherEmoji(code: number): string {
  if (code === 0) return "☀️";
  if (code <= 3) return "⛅";
  if (code <= 48) return "🌫️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "❄️";
  if (code <= 82) return "🌦️";
  if (code <= 99) return "⛈️";
  return "🌡️";
}

export default function WeatherWidget() {
  const [now, setNow] = useState(new Date());
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      const { fetchWeatherApi } = await import("openmeteo");
      const responses = await fetchWeatherApi("https://api.open-meteo.com/v1/forecast", {
        latitude: 15.6686,
        longitude: 120.5783,
        hourly: ["temperature_2m", "relative_humidity_2m", "weather_code"],
        timezone: "auto",
      });

      const response = responses[0];
      const utcOffsetSeconds = response.utcOffsetSeconds();
      const hourly = response.hourly()!;

      setWeather({
        time: Array.from(
          { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
          (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
        ),
        temperature_2m: hourly.variables(0)!.valuesArray(),
        relative_humidity_2m: hourly.variables(1)!.valuesArray(),
        weather_code: hourly.variables(2)!.valuesArray(),
        timezone: response.timezone(),
      });
    }

    fetchWeather();
  }, []);

  const idx = Math.max(0, (weather?.time.findIndex((t) => t >= now) ?? 1) - 1);
  const temp = weather?.temperature_2m?.[idx]?.toFixed(1) ?? "--";
  const humidity = weather?.relative_humidity_2m?.[idx]?.toFixed(0) ?? "--";
  const code = weather?.weather_code?.[idx] ?? 0;

  return (
    <div className="flex flex-col gap-1 h-full">
      {weather ? (
        <>
          <div className="flex items-center gap-2 mt-2 flex-row justify-start">
            <span className="text-4xl">{getWeatherEmoji(code)}</span>
            <div className="flex flex-col justify-start w-full">
              <p className="text-2xl font-mono font-semibold">{temp}°C</p>
              <p className="text-sm text-muted-foreground">{getWeatherLabel(code)}</p>
            </div>
            <div className="flex justify-center align-middle">
                <p className="text-xs text-muted-foreground font-mono mt-1 flex flex-row items-center gap-1"><Droplet size={20}/> {humidity}%</p>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground font-mono flex flex-row items-center gap-1 mt-2"><MapPin size={20}/> Paniqui, Tarlac City · {weather.timezone}</p>
        </>
      ) : (
        <p className="text-xs text-muted-foreground font-mono mt-2">Loading weather...</p>
      )}
    </div>
  );
}