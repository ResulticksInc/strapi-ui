import { useEffect, useState } from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// import './App.css'
import gallery from "./assets/images/gallery01.jpg"
import resul from "./assets/images/resul-logo.svg"
import Home from './Pages/Home/Home';
import Form from './Pages/Form/Form';

function App() {

  return (
    <>
      <section data-bs-version="5.1" className="header1 cid-tJS9vXDdRK" id="header01-7">
        <div className="container">
          <Router>
            <div>
              <nav>
                <a href="/">Home</a> | <a href="/form">Form</a>
              </nav>

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/form" element={<Form />} />
              </Routes>
            </div>
          </Router>
        </div>
      </section>
    </>
  )
}

export default App
