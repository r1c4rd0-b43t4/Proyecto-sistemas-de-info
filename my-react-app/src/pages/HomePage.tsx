import React from 'react';
import ExampleComponent from '../components/ExampleComponent';

const HomePage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Welcome to My React App</h1>
            <p className="text-lg mb-8">This is the home page of your application.</p>
            <ExampleComponent />
        </div>
    );
};

export default HomePage;