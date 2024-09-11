import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
]);

const App = () => <RouterProvider router={router} />;

export default App;
