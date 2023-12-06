import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";

const URL =
  "https://6535e0e8c620ba9358ecbbc0.mockapi.io/YourRollNumber";

const Dashboard = () => {
  const [flowers, setFlowers] = useState([]);

  const getListFlowers = async () => {
    const res = await axios.get(`${URL}`);
    if (res.status === 200) {
        setFlowers(res.data);
    }
  };

  useEffect(() => {
    getListFlowers();
  }, []);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        `Are you sure that you want to delete a staff with ID: ${id}`
      )
    ) {
      const res = await axios.delete(`${URL}/${id}`);
      if (res.status === 200) {
        getListFlowers();
        toast.success("Deleted Successfully ~");
      } else {
        toast.error("Delete: Error!");
      }
    }
  };

  return (
    <div className="staff-table">
      <div className="btn-add">
        <Link to={"/add/"}>
          <button className="add-staff-btn">ADD NEW FLOWERS</button>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Rating</th>
            <th>Price</th>
            <th>isTopOfTheWeek</th>
            <th>Color</th>
            <th>Origin</th>
            <th>Categoty</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {flowers &&
            flowers.map((fl) => (
              <tr key={fl.id}>
                <td>{fl.id}</td>
                <td>{fl.name}</td>
                <td>
                  <img src={fl.image} alt={fl.id} />
                </td>
                <td>{fl.rating}</td>
                <td>{fl.price}$</td>
                <td>{fl.isTopOfTheWeek ? "True" : "False"}</td>
                <td>{fl.color}</td>
                <td>{fl.origin}</td>
                <td>{fl.category}</td>
                <td>
                  <Link to={`/update/${fl.id}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(fl.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
