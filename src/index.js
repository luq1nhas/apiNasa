import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { RouterProvider , createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PaginaInicial from './PaginaInicial';


const roteador = createBrowserRouter([
  {path: '/', element: <PaginaInicial/>}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={roteador} />
  </React.StrictMode>
);

reportWebVitals();
