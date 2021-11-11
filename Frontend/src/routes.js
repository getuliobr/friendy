import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Login } from './screens/LoginPage';
import ChatPage from './screens/ChatPage';

const AllRoutes = () => (
    <Routes>
        <Route
            path="/"
            element={<Login />}
        />
        <Route
            path="/home"
            element={<ChatPage />}
        />
    </Routes>
)

export default AllRoutes;