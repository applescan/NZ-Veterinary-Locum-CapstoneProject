import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/elements/NavBar';
import Context from './context/Context';
import SignIn from './components/pages/SignIn';
import ClinicList from './components/pages/ClinicList';
import DoctorList from './components/pages/DoctorList';
import JobList from './components/pages/JobList'
import Home from './components/pages/Home';
import DoctorProfile from './components/pages/DoctorProfile';
import SignUp from './components/pages/SignUp';
import ClinicProfile from './components/pages/ClinicProfile';
import About from './components/pages/About';


function App() {


  return (
    <>
      <Context>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/clinics' element={<ClinicList />} />
          <Route path='/doctors' element={<DoctorList />} />
          <Route path='/job-search' element={<JobList />} />
          <Route path='/about' element={<About />} />
          <Route path='/doctor-profile' element={<DoctorProfile />} /> //only accessible to logged in user
          <Route path='/clinic-profile' element={<ClinicProfile />} /> //only accessible to logged in user
        </Routes>
      </Context>
    </>
  );
}

export default App;