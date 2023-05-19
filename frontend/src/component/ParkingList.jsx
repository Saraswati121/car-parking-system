import React,{ useEffect,useState } from 'react'
import {NavbarA} from './NavbarA'
import axios from 'axios';

export const ParkingList = () => {
    const [parkingPlaces, setParkingPlaces] = useState([]);

  useEffect(() => {
    fetchParkingPlaces();
  }, []);

  const fetchParkingPlaces = async () => {
    try {
      const response = await axios.get('http://localhost:8080/parkingPlace');
      setParkingPlaces(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <NavbarA/>
      <div>
          <h2>List of Parking Places</h2>
      <table>
        <thead>
          <tr>
            <th>Place</th>
            <th>Address</th>
            <th>Available Slots - Two Wheelers</th>
            <th>Available Slots - Four Wheelers</th>
            <th>Vehicle Types Allowed</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {parkingPlaces.map((parkingPlace) => (
            <tr key={parkingPlace._id}>
              <td>{parkingPlace.place}</td>
              <td>{parkingPlace.address}</td>
              <td>{parkingPlace.availableSlots.twoWheelers}</td>
              <td>{parkingPlace.availableSlots.fourWheelers}</td>
              <td>{parkingPlace.vehicleTypesAllowed.join(', ')}</td>
              <td>{parkingPlace.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}
