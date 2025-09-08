import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './utility/PrivateRoute';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MySharksPage from './pages/MySharksPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/sharks" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected area */}
      <Route element={<PrivateRoute />}>
        <Route path="/sharks" element={<MySharksPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/sharks" replace />} />
    </Routes>
  );
};

export default App;
