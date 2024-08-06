import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import styles from '../styles/AddressManagement.module.css';

const AddressManagement = () => {
  const { currentUser } = useContext(AuthContext);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const savedAddresses = localStorage.getItem(`addresses_${currentUser.uid}`);
      let addressesArray = [];
      try {
        addressesArray = JSON.parse(savedAddresses) || [];
      } catch (error) {
        console.error("Error parsing addresses from localStorage:", error);
      }
      if (!Array.isArray(addressesArray)) {
        addressesArray = [];
      }
      console.log("Fetched addresses:", addressesArray);
      setAddresses(addressesArray);
    }
  }, [currentUser]);

  const addAddress = (newAddress) => {
    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    if (currentUser) {
      localStorage.setItem(`addresses_${currentUser.uid}`, JSON.stringify(updatedAddresses));
    }
  };

  const removeAddress = (addressToRemove) => {
    const updatedAddresses = addresses.filter(address => address !== addressToRemove);
    setAddresses(updatedAddresses);
    if (currentUser) {
      localStorage.setItem(`addresses_${currentUser.uid}`, JSON.stringify(updatedAddresses));
    }
  };

  return (
    <div className={styles.addressManagement}>
      <h2>Manage Addresses</h2>
      <ul>
        {addresses.length > 0 ? (
          addresses.map((address, index) => (
            <li key={index}>
              {address}
              <button onClick={() => removeAddress(address)}>Remove</button>
            </li>
          ))
        ) : (
          <p>No addresses found</p>
        )}
      </ul>
      <form onSubmit={(e) => {
        e.preventDefault();
        const newAddress = e.target.elements.address.value;
        addAddress(newAddress);
        e.target.reset();
      }}>
        <label>Add New Address:</label>
        <input type="text" name="address" required />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddressManagement;

  
