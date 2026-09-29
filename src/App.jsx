import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import DashboardPage from './Pages/DashboardPage';
import StationAnalysisPage from './Pages/StationAnalysisPage';

// React Router v6.4+ Data APIs (loaders, defer, Await, Suspense ready)
const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
  {
    path: '/station/:cityId',
    element: <StationAnalysisPage />,
  },
  {
    path: '/station',
    element: <Navigate to="/station/delhi" replace />,
  },
  {
    path: '/station-analysis/:cityId',
    element: <StationAnalysisPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
