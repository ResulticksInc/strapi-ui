import { useEffect, useState } from 'react'
import axios from 'axios';

function Form() {
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
          <h1>Form</h1>
        </div>
      </section>
    </>
  )
}

export default Form
