import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Login } from './screens/LoginPage';
import ChatPage from './screens/ChatPage';
import { UserContext } from './contexts/userContext';
import UserProfile from './screens/UserProfile';

function RequireAuth({ children }) {
    const { userToken } = useContext(UserContext);

    // const { authed } = useAuth();
    // const location = useLocation();
  
    return userToken 
      ? children
      : <Navigate to="/" replace />;
}

function RedirectInvalidRoute() {
    return <Navigate to="/" />
}

const AllRoutes = () => (
    <Routes>
        <Route
            path="/"
            element={<Login />}
        />
        <Route
            path="/home"
            element={
            <RequireAuth>
                <ChatPage />
            </RequireAuth>
            }
        />
        <Route 
            path="*"
            element={<RedirectInvalidRoute/>}
        />    
        <Route
            path="/profile/:userid"
            element={
            <RequireAuth>
                <UserProfile />
            </RequireAuth>
            }
        />
    </Routes>
)

export default AllRoutes;