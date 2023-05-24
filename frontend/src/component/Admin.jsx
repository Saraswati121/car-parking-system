import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { NavbarA } from './NavbarA'
import axios from 'axios';

export const Admin = () => {
  const [place, setPlace] = useState('');
  const [pincode,setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [twoWheelers, setTwoWheelers] = useState(0);
  const [fourWheelers, setFourWheelers] = useState(0);
  const [twoWheelersprice, setTwoWheelersprice] = useState(0);
  const [fourWheelersprice, setFourWheelersprice] = useState(0);
  const nav = useNavigate();

  const addParkingPlace = async (e) => {
    e.preventDefault();
    if (!place || !pincode || !address || twoWheelers < 0 || fourWheelers < 0 || twoWheelersprice < 0 || fourWheelersprice < 0) {
      alert("Please fill in all the details and enter valid values");
      return;
    }
    if (isNaN(pincode)) {
      alert("Pincode should be a number");
      return;
    }
    if (pincode.length !== 6) {
      alert("Pincode should be exactly 6 digits");
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const newParkingPlace = {
        place,
        pincode,
        address,
        availableSlots: { twoWheelers, fourWheelers },
        twoWheelersprice,
        fourWheelersprice
      };
      await axios.post('http://localhost:8080/parkingPlace', newParkingPlace,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      setPlace('');
      setPincode('')
      setAddress('');
      setTwoWheelers(0);
      setTwoWheelersprice(0);
      setFourWheelers(0); 
      setFourWheelersprice(0);
      nav('/parklist')
      // console.log(vehicleTypesAllowed)
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
          Pincode :
          <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} />
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
         Price for - Two Wheelers :
          <input
            type="number"
            value={twoWheelersprice}
            onChange={(e) => setTwoWheelersprice(parseInt(e.target.value))}
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
        Price for - Four Wheelers :
          <input
            type="number"
            value={fourWheelersprice}
            onChange={(e) => setFourWheelersprice(parseInt(e.target.value))}
          />
        </label>
        <br />
        <button type="submit" id="adbtn">Add Parking Place</button>
      </form>
      </div>
      </div>
  )
}
