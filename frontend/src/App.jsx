// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Spots from './components/Spots/Spots';
import CreateSpot from './components/Spots/CreateSpot';
import SpotDetails from './components/Spots/SpotDetails';
import UpdateSpot from './components/Spots/UpdateSpot';
import Owner from './components/Spots/ManageSpots';
import * as sessionActions from './store/session';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Spots />
      },
      {
       path: '/spots/newSpot',
       element: <CreateSpot />
      },
      {
        path: '/spots/:id',
        element: <SpotDetails />
      },
      {
        path: '/spots/:id/edit',
        element: <UpdateSpot />
      },
      {
        path: '/spots/current',
        element: <Owner />
      },
      {
        path: '*',
        element: <Navigate to='/' />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;