import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    const querySnapshot = await getDocs(collection(db, 'customers'));
    const customersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCustomers(customersList);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await addDoc(collection(db, 'customers'), newCustomer);
    setNewCustomer({ name: '', email: '', phone: '' });
    fetchCustomers();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Customers</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
            required
            className="px-3 py-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={newCustomer.email}
            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
            required
            className="px-3 py-2 border rounded"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={newCustomer.phone}
            onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
            required
            className="px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Customer
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map(customer => (
          <div key={customer.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">{customer.name}</h3>
            <p>{customer.email}</p>
            <p>{customer.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Customers;