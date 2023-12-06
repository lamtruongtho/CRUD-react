import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/home.css";


const URL =
  "https://6535e0e8c620ba9358ecbbc0.mockapi.io/YourRollNumber";

const Home = () => {
  const [rolln, setRolln] = useState([]);
  const [detailPopup, setDetailPopup] = useState(null);

  const getListRolln = async () => {
    const res = await axios.get(`${URL}`);
    if (res.status === 200) {
        setRolln(res.data);
    }
  };

  useEffect(() => {
    getListRolln();
  }, []);

  // popup
  const handleViewPopup = (person) => {
    setDetailPopup(person);
  };

  const handleClosePopup = () => {
    setDetailPopup(null);
  };

  return (
    <div className="container">
      {rolln &&
        rolln.map((person) => (
          <div className="card" key={person.id}>
            <img src={person.image} alt={person.id} />
            <h3>{person.name}</h3>
            <h3>price: {person.price}</h3>
            <h3>rating: {person.rating}</h3>
            <h3>category: {person.category}</h3>
            <button onClick={() => handleViewPopup(person)}>View Details</button>
          </div>
        ))}

      {detailPopup && (
        <div className="popup">
          <div className="popup-content">
            <div>
              <span className="close" onClick={handleClosePopup}>
                &times;
              </span>
              <img src={detailPopup.image} alt={detailPopup.id} />
              <h2>Name: {detailPopup.name}</h2>
              <p>Price: {detailPopup.price}</p>
              <p>Color: {detailPopup.color}</p>
              <p>Category: {detailPopup.category}</p>
              <p>Origin: {detailPopup.origin}</p>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
