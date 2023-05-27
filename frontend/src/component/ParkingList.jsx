import React,{ useEffect,useState } from 'react'
import {NavbarA} from './NavbarA'
import axios from 'axios';

export const ParkingList = () => {
    const [parkingPlaces, setParkingPlaces] = useState([]);
console.log(parkingPlaces)
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
            <th>Two Wheelers Price</th>
            <th>Available Slots - Four Wheelers</th>
            <th>Four Wheelers Price</th>
          </tr>
        </thead>
        <tbody>
          {parkingPlaces.map((parkingPlace) => (
            <tr key={parkingPlace._id}>
              <td>{parkingPlace.place}</td>
              <td>{parkingPlace.address}</td>
              <td>{parkingPlace.availableSlots.twoWheelers}</td>
              <td>{parkingPlace.twoWheelersprice}</td>
              <td>{parkingPlace.availableSlots.fourWheelers}</td>
              <td>{parkingPlace.fourWheelersprice}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}
