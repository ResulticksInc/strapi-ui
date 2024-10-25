import { useEffect, useState } from 'react'
import axios from 'axios';

// import './App.css'
import gallery from "../../assets/images/gallery01.jpg"

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from Strapi
    axios
      .get('https://favorable-ants-b98d6823dd.strapiapp.com/api/articles') // replace 'articles' with your content type
      .then((response) => {
        setData(response.data.data); // Adjust depending on Strapi response
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  console.log("data:", data);


  return (
    <>
      <section data-bs-version="5.1" className="header1 cid-tJS9vXDdRK" id="header01-7">
        <div className="container">
          <h1>Home</h1>
          <div className="row justify-content-center">
            <div className="col-12 col-md-12 col-lg-7 image-wrapper">
              <img width="150" className="w-100" src={gallery} alt="Mobirise Website Builder" />
            </div>
            <div className="col-12 col-lg col-md-12">
              <div className="text-wrapper align-left">
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
      </section>
    </>
  )
}

export default Home
