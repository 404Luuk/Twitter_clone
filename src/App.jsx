import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './comp/register/Register';
import Layout from './comp/layout/Layout';

function App() {

 
   return (
    <div className="App">
       <Routes>
          <Route path='/' element={<Layout/>} />
       </Routes>
    </div>
   );
}

export default App;
