
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchNotes } from './store/Slices/notesReducer';
import Home from './pages/Home';

function App() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.notes);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    }
  ]);
  return loading ? null : <RouterProvider router={router} />;
}

export default App
