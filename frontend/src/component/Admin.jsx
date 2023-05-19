import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { NavbarA } from './NavbarA'
import axios from 'axios';

export const Admin = () => {
  const [place, setPlace] = useState('');
  const [address, setAddress] = useState('');
  const [twoWheelers, setTwoWheelers] = useState(0);
  const [fourWheelers, setFourWheelers] = useState(0);
  const [vehicleTypesAllowed, setVehicleTypesAllowed] = useState('');
  const [price, setPrice] = useState(0);
  const nav = useNavigate();

  const addParkingPlace = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const newParkingPlace = {
        place,
        address,
        availableSlots: { twoWheelers, fourWheelers },
        vehicleTypesAllowed: vehicleTypesAllowed.split(',').map((type) => type.trim()),
        price,
      };
      await axios.post('http://localhost:8080/parkingPlace', newParkingPlace,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      setPlace('');
      setAddress('');
      setTwoWheelers(0);
      setFourWheelers(0);
      setVehicleTypesAllowed('');
      setPrice(0);
      nav('/parklist')
      //console.log(newParkingPlace)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NavbarA/>
      <div>
      <h1>Parking Places</h1>
      <form onSubmit={addParkingPlace}>
        <label>
          Place :
          <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} />
        </label>
        <br />
        <label>
          Address :
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <br />
        <label>
          Available Slots - Two Wheelers :
          <input
            type="number"
            value={twoWheelers}
            onChange={(e) => setTwoWheelers(parseInt(e.target.value))}
          />
        </label>
        <br />
        <label>
          Available Slots - Four Wheelers :
          <input
            type="number"
            value={fourWheelers}
            onChange={(e) => setFourWheelers(parseInt(e.target.value))}
          />
        </label>
        <br />
        <label>
          Vehicle Types Allowed :
          <input
            type="text"
            value={vehicleTypesAllowed}
            onChange={(e) => setVehicleTypesAllowed(e.target.value)}
          />
        </label>
        <br />
        <label>
          Price :
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
        </label>
        <br />
        <button type="submit" id="adbtn">Add Parking Place</button>
      </form>
      </div>
      </div>
  )
}
