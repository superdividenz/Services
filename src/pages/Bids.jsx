import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

function Bids() {
  const [bids, setBids] = useState([]);
  const [newBid, setNewBid] = useState({
    customer: "",
    description: "",
    amount: "",
  });

  useEffect(() => {
    fetchBids();
  }, []);

  async function fetchBids() {
    try {
      const querySnapshot = await getDocs(collection(db, "bids"));
      const bidsList = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          customer: data.customer || "Unknown",
          description: data.description || "No description",
          amount: typeof data.amount === "number" ? data.amount : 0,
          createdAt: data.createdAt || null,
        };
      });
      console.log("Fetched bids:", bidsList);
      setBids(bidsList);
    } catch (error) {
      console.error("Error fetching bids:", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const bidData = {
        ...newBid,
        amount: parseFloat(newBid.amount) || 0, // Use 0 if parsing fails
        createdAt: Timestamp.now(),
      };
      console.log("Attempting to submit bid:", bidData);
      const docRef = await addDoc(collection(db, "bids"), bidData);
      console.log("Document successfully added with ID:", docRef.id);
      setNewBid({ customer: "", description: "", amount: "" });
      fetchBids();
    } catch (error) {
      console.error("Error adding document: ", error);
      // You can also show an error message to the user here
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Bids</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Customer"
            value={newBid.customer}
            onChange={(e) => setNewBid({ ...newBid, customer: e.target.value })}
            required
            className="px-3 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Description"
            value={newBid.description}
            onChange={(e) =>
              setNewBid({ ...newBid, description: e.target.value })
            }
            required
            className="px-3 py-2 border rounded"
          />
          <input
            type="number"
            placeholder="Amount"
            value={newBid.amount}
            onChange={(e) => setNewBid({ ...newBid, amount: e.target.value })}
            required
            className="px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Bid
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bids.map((bid) => (
          <div key={bid.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">{bid.customer}</h3>
            <p>{bid.description}</p>
            <p className="text-green-600">
              ${typeof bid.amount === "number" ? bid.amount.toFixed(2) : "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              {bid.createdAt && bid.createdAt.toDate
                ? bid.createdAt.toDate().toLocaleString()
                : "Date not available"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bids;
