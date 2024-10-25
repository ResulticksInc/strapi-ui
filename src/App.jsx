import { useEffect, useState } from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// import './App.css'
import gallery from "./assets/images/gallery01.jpg"
import resul from "./assets/images/resul-logo.svg"
import Home from './Pages/Home/Home';
import Form from './Pages/Form/Form';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from Strapi
    axios
      .get('http://localhost:1337/api/articles') // replace 'articles' with your content type
      .then((response) => {
        setData(response.data.data); // Adjust depending on Strapi response
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });


    axios.post('http://localhost:1337/api/auth/local', {
      identifier: 'your-username',
      password: 'your-password',
    })
      .then(response => {
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);

        // Use the JWT token in future requests
        const token = response.data.jwt;
        axios.get('http://localhost:1337/api/articles', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(response => {
          console.log(response.data);
        });
      })
      .catch(error => {
        console.error('Error logging in:', error);
      });
  }, []);

  console.log("data:", data);


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
              <ul>
              </ul>
              <div className="row justify-content-center">
                <div className="col-12 col-md-12 col-lg-7 image-wrapper">
                  <img width="150" className="w-100" src={gallery} alt="Mobirise Website Builder" />
                </div>
                <div className="col-12 col-lg col-md-12">
                  <div className="text-wrapper align-left">
                    <h1 className="mbr-section-title mbr-fonts-style mb-4 display-2"><strong>Data from Strapi</strong></h1>
                    <ul>
                      {data.map((item) => (
                        <li key={item.id}>
                          <h4>{item.title}</h4>
                          <p>{item.description}</p>
                        </li> // Customize according to the content structure
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Router>
        </div>
      </section>
    </>
  )
}

export default App
