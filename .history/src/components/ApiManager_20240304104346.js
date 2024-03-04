const apiKey = '24388925ee460f3e9351095efde842a0'; // My API key

export async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}
