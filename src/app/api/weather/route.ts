import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || 'ottawa';
  
  const apiKey = process.env.OPEN_WEATHER_KEY;

  if (!apiKey) {
    console.error('Missing OpenWeather API key');
    return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('OpenWeather API error:', error.response?.data || error.message);
    
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Error fetching weather data';
    
    return NextResponse.json({ message }, { status });
  }
}
