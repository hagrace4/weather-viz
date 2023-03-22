async function fetchWeatherData(lat, lon) {
  try {
    const response = await fetch(`/api/weather-data/${lat}/${lon}`);
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}
//  D3.js code to create visualizations 
function createVisualization(weatherData) {

  const dailyData = weatherData.daily;

  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const x = d3
    .scaleTime()
    .range([0, width])
    .domain(d3.extent(dailyData, (d) => new Date(d.dt * 1000)));

  const y = d3
    .scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(dailyData, (d) => d.temp.max)]);

  const line = d3
    .line()
    .x((d) => x(new Date(d.dt * 1000)))
    .y((d) => y(d.temp.max));

  const svg = d3
    .select("#visualization")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  svg
    .append("g")
    .attr("class", "axis axis--x")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

  svg
    .append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y).ticks(10))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Temperature (K)");

  svg
    .append("path")
    .datum(dailyData)
    .attr("class", "line")
    .attr("d", line);

}

(async () => {
  const lat = 34.23;
  const lon = -118.52;
  const weatherData = await fetchWeatherData(lat, lon);
  createVisualization(weatherData);
})();
