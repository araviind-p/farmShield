import React, { useEffect, useRef, useState } from 'react';

import Chart from 'chart.js/auto';

function Dashboard() {
  const chartRef = useRef(null);
  const [sensorData, setData] = useState({ temperature: 24.5, humidity: 60, co2: 450 });

  // Function to create or update the doughnut chart with gradient colors
  const createSensorChart = () => {
    const ctx = document.getElementById('sensorChart').getContext('2d');

    // Destroy any existing chart instance on the canvas
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create gradients
    const gradientTemperature = ctx.createLinearGradient(0, 0, 400, 400);
    gradientTemperature.addColorStop(0, 'rgba(255, 99, 132, 0.7)');
    gradientTemperature.addColorStop(1, 'rgba(255, 159, 64, 0.7)');

    const gradientHumidity = ctx.createLinearGradient(0, 0, 400, 400);
    gradientHumidity.addColorStop(0, 'rgba(54, 162, 235, 0.7)');
    gradientHumidity.addColorStop(1, 'rgba(153, 102, 255, 0.7)');

    const gradientCO2 = ctx.createLinearGradient(0, 0, 400, 400);
    gradientCO2.addColorStop(0, 'rgba(75, 192, 192, 0.7)');
    gradientCO2.addColorStop(1, 'rgba(255, 206, 86, 0.7)');

    // Create a new chart instance and store it in chartRef
    chartRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Temperature (°C)', 'Humidity (%)', 'CO2 (ppm)'],
        datasets: [{
          label: 'Sensor Data',
          data: [sensorData.temperature, sensorData.humidity, sensorData.co2],
          backgroundColor: [gradientTemperature, gradientHumidity, gradientCO2],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 2,
        }],
      },
      options: {
        cutout: '75%',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
        },
        animation: {
          animateScale: true,
          easing: 'easeInOutBack',
        },
      },
    });
  };
  useEffect(() => {
    createSensorChart();
  }, [sensorData]);
  
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const wsUrl =
   " wss://g9811mo261.execute-api.ap-south-1.amazonaws.com/production/";

    const newSocket = new WebSocket(wsUrl);
    console.log(sensorData);

    newSocket.onopen = () => {
      console.log("connection opened");
       
    };

    newSocket.onmessage = (event) => {
      setIsLoading(false);
      console.log("Message received");
      
      try {
        const newData = JSON.parse(event.data); // Parse event.data, not event
        console.log(newData);
        setData(newData);
      } catch (error) {
        console.error("Failed to parse WebSocket message as JSON:", error);
      }
    };
    

    // newSocket.onmessage = (event) => {
    //   setIsLoading(false)
    //   console.log("message recieved");
    //   const newData = JSON.parse(event);
    //   console.log(newData);
    //   setData((prev) => [...prev, newData]);

    // }  

    // newSocket.onclose = () => {
    //   console.log("connection closed");
    // };

    // newSocket.onerror = (error) => {
    //   console.error("WebSocket error:", error);
    // };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };

    // createSensorChart();
  }, []); // Re-run the effect if the data prop changes

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold tracking-widest">ONION Zone</h1>
      </div>

      {/* Date & Navigation */}
      <div className="flex items-center justify-between w-full max-w-2xl space-x-4">
        <p id="datetime" className="text-sm md:text-lg font-semibold text-gray-400"></p>
        <a href="/" className="btn-3d bg-blue-600 text-white font-bold px-4 py-2 rounded-md shadow-lg hover:bg-blue-500 transition">
          Logout
        </a>
      </div>

      {/* Sensor Data */}
      <div className="sensor-data-container w-full max-w-2xl p-4 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sensor Data</h2>
        <div className="flex flex-col sm:flex-row justify-around text-center space-y-2 sm:space-y-0">
          <p className="text-lg">🌡️ Temperature: <span className="font-semibold">{sensorData.temperature} °C</span></p>
          <p className="text-lg">💧 Humidity: <span className="font-semibold">{sensorData.humidity} %</span></p>
          <p className="text-lg">🌍 CO2 Level: <span className="font-semibold">{sensorData.co2} ppm</span></p>
        </div>
      </div>

      {/* Sensor Data Chart */}
      <div className="w-full max-w-2xl p-4 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sensor Data Chart</h2>
        <div className="chart-container h-64 sm:h-80">
          <canvas id="sensorChart"></canvas>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;