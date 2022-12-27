import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import SignIn from './components/pages/signIn';
import ClinicList from './components/pages/clinicList';
import Home from './components/pages/home';
import DoctorProfile from './components/pages/doctorProfile';
import SignUp from './components/pages/signUp';
import ClinicProfile from './components/pages/clinicProfile';

function App() {

  return (

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/clinics' element={<ClinicList />} />
        <Route path='/doctor-profile' element={<DoctorProfile />} /> //only accessible logged in user
        <Route path='/clinic-profile' element={<ClinicProfile />} /> //only accessible logged in user
      </Routes>
  );
}

export default App;