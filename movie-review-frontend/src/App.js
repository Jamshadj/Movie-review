import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MyList from './pages/MyList';
import AddEditMovie from './pages/AddEditMovie';
import MainLayout from './pages/MainLayout';
import MyMovies from './pages/MyMovies';
import MovieDetial from './pages/MovieDetial';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route 
            path="/sign-in" 
            element={
              <ProtectedRoute>
                <SignIn />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/sign-up" 
            element={
              <ProtectedRoute>
                <SignUp />
              </ProtectedRoute>
            } 
          />
          <Route path="/my-movies" element={<MyMovies />} />
          <Route path="/movie" element={<AddEditMovie />} />
          <Route path="/view-movie/:id" element={<MovieDetial />} />
          <Route path="/my-list" element={<MyList />} />
          <Route path="/add-movie" element={<AddEditMovie />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
