import React, { useState, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function MapView() {
  const [jobs, setJobs] = useState([]);
  const [viewState, setViewState] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 10
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    const querySnapshot = await getDocs(collection(db, 'jobs'));
    const jobsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setJobs(jobsList);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Job Locations</h1>
      <div style={{ height: '600px' }}>
        <Map
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken="YOUR_MAPBOX_ACCESS_TOKEN"
        >
          {jobs.map(job => (
            <Marker
              key={job.id}
              latitude={job.latitude}
              longitude={job.longitude}
            >
              <div className="text-red-500">📍</div>
            </Marker>
          ))}
        </Map>
      </div>
    </div>
  );
}

export default MapView;