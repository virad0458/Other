import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LitPathAI from './LitPathAI';
import Login from './Login';
import AdminDashboard from './AdminDashboard'; // Import the new component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LitPathAI />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} /> {/* ADD THIS ROUTE */}
            </Routes>
        </Router>
    );
}

export default App;