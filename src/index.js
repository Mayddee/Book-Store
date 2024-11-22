import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home/Home';
import Catalog from './Catalog/Catalog';
import Details from './DetailsPage/Details';
import Favourites from './Favourite/Favourites';
import Authentication from './Authentication/Authetication';
import Authorization from './Authentication/Authorization';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children : [
      {
        index: true,  // Set `Home` as the default component for `/`
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
    
      {
        path: "catalog",
        element: <Catalog />,
        children: [
          {
            path: ":id",
            element: <Details />
          }
        ],
      },
      {
        path: "my-favourites",
        element: <Favourites />,
      },
      {
        path: "login-page",
        element: <Authentication />,
      },
      {
        path: "signup-page",
        element: <Authorization />,
      }
    ]
  },
  {
    path: "/*",
    element: <h1>Page not found!</h1>,
  }

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} future={{
  v7_fetcherPersist: true,
  v7_startTransition: true,
  v7_relativeSplatPath: true,
  v7_normalizeFormMethod: true,
  v7_skipActionErrorRevalidation: true,
  v7_fetcherPersist: true,
  v7_partialHydration: true,

}} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
