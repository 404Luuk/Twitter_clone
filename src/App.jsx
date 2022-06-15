import './App.scss';
import React from 'react';
import { Route, Routes, Link} from "react-router-dom";
import Login from "./comp/login/Login";
import Dashboard from './comp/dashboard/Dashboard';
import Register from './comp/register/Register';
import Layout from './comp/layout/Layout';
import Reset from './comp/reset/Reset';
import Profile from './comp/profile/Profile';

function App() {

   return (

      <div className="App">

         <Routes >
            <Route path="/" element={<Layout/>} >
               <Route index element={<Dashboard />} />
               <Route path="login" element={<Login />} />
               <Route path='register' element={<Register/>} /> 
               <Route path='reset' element={<Reset/>} />
               <Route path='profile' element={<Profile />} />
            </Route>
         </Routes>

      </div>
   
   );
}

export default App;
