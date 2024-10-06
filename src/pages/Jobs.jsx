import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { format } from 'date-fns';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({ customer: '', description: '', date: '', status: 'Scheduled' });

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    const querySnapshot = await getDocs(collection(db, 'jobs'));
    const jobsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setJobs(jobsList);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await addDoc(collection(db, 'jobs'), {
      ...newJob,
      date: Timestamp.fromDate(new Date(newJob.date)),
      createdAt: Timestamp.now()
    });
    setNewJob({ customer: '', description: '', date: '', status: 'Scheduled' });
    fetchJobs();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Jobs</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Customer"
            value={newJob.customer}
            onChange={(e) => setNewJob({ ...newJob, customer: e.target.value })}
            required
            className="px-3 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Description"
            value={newJob.description}
            onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
            required
            className="px-3 py-2 border rounded"
          />
          <input
            type="date"
            value={newJob.date}
            onChange={(e) => setNewJob({ ...newJob, date: e.target.value })}
            required
            className="px-3 py-2 border rounded"
          />
          <select
            value={newJob.status}
            onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
            className="px-3 py-2 border rounded"
          >
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Job
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map(job => (
          <div key={job.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">{job.customer}</h3>
            <p>{job.description}</p>
            <p>Date: {format(job.date.toDate(), 'PPP')}</p>
            <p>Status: {job.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobs;