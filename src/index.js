
import React from 'react';
import { createRoot } from 'react-dom/client'; // Correct import for createRoot
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App'; 
import store from './app/store';

const root = createRoot(document.getElementById("root")); // Use createRoot from react-dom/client
root.render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <App />
            </Provider>
        </Router>
    </React.StrictMode>
);
