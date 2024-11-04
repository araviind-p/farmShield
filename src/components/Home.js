import React from 'react';

function Home() {
    return (
        <div className='w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-900 to-green-700 text-gray-200 p-8'>
            <h1 className='text-4xl font-bold mb-6 text-center text-green-200'>An IoT-based solution for optimizing agricultural storage.</h1>
            <div className='bg-gray-300 text-gray-800 rounded-lg shadow-lg p-6 max-w-xl w-full'>
                <h2 className='text-2xl font-semibold mb-4'>PURPOSE:</h2>
                <p className='mb-4'>Reduce post-harvest loss and maintain product quality.</p>
                <h2 className='text-2xl font-semibold mb-4'>TECHNOLOGY:</h2>
                <ul className='list-disc list-inside mb-4'>
                    <li>Real-time monitoring of temperature, humidity, and CO2 levels.</li>
                    <li>IoT-powered intelligent control system for storage optimization.</li>
                </ul>
                <h2 className='text-2xl font-semibold mb-4'>BENEFITS:</h2>
                <ul className='list-disc list-inside mb-4'>
                    <li>Preserve freshness, extend shelf life, and reduce spoilage.</li>
                    <li>Cloud connectivity for remote monitoring and actionable insights.</li>
                </ul>
                <h2 className='text-2xl font-semibold mb-4'>IMPACT:</h2>
                <p>Promotes sustainability and minimizes waste in agriculture.</p>
            </div>
        </div>
    );
}

export default Home;
