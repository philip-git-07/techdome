import React, { useEffect } from 'react'; // Importing useEffect from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Blog from './pages/blog/Blog';
import Form from './pages/form/Form';
import { useDispatch } from 'react-redux';
import { loadUser } from './actions/userAction';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]); // Add 'dispatch' as a dependency here

  return (
    <>
      <Routes>
        <Route path='/form' element={<Form />} />
        <Route path='/' element={<Blog />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
