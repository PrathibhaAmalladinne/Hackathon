import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
const Reservation = () => {
//   // Retrieve the action passed via router state (or via params if you prefer)
//   const location = useLocation();
//   const { action } = location.state || { action: "Unknown Action" };
  // Local state for reservation id, fetched resources, selected resources, and loading state
  const [reservationId, setReservationId] = useState('');
  const [action, setAction] = useState('action')
  const [resources, setResources] = useState([]);
  const [selectedResources, setSelectedResources] = useState([]);
  const [loading, setLoading] = useState(false);
  // Handle the reservation id form submission
  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    // Show alert to the user; execution pauses until the user clicks "OK"
    alert(`Reservation ID for ${action}: ${reservationId}`);
    // Now fetch the list of resources for this reservation
    setLoading(true);
    try {
      const response = await fetch(`/api/resources?reservationId=${reservationId}`);
      const data = await response.json();
      // Assume the API returns an object with a "resources" array
      setResources(data.resources);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };
  // Handle changes to resource checkbox selections
  const handleCheckboxChange = (e, resourceId) => {
    if (e.target.checked) {
      setSelectedResources((prev) => [...prev, resourceId]);
    } else {
      setSelectedResources((prev) => prev.filter((id) => id !== resourceId));
    }
  };
  // Handle the final action submission with selected resources
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/finalAction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reservationId,
          action,
          resourceIds: selectedResources
        })
      });
      const result = await response.json();
      alert('Action performed successfully: ' + JSON.stringify(result));
    } catch (error) {
      console.error('Error performing final action:', error);
    }
  };
  // Inline styles for simplicity
  const styles = {
    container: {
      padding: '2rem'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      maxWidth: '400px'
    },
    input: {
      padding: '0.5rem',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px'
    },
    button: {
      padding: '0.7rem',
      fontSize: '16px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#007bff',
      color: 'white',
      cursor: 'pointer'
    },
    resourceItem: {
      margin: '0.5rem 0'
    }
  };
  return (
    <div style={styles.container}>
      <h2>Reservation Form for {action}</h2>
      {/* If resources have not yet been fetched, show the reservation id form */}
      {resources.length === 0 ? (
        <form onSubmit={handleReservationSubmit} style={styles.form}>
          <label>
            Reservation ID:
            <input
              type="text"
              value={reservationId}
              onChange={(e) => setReservationId(e.target.value)}
              style={styles.input}
              placeholder="Enter reservation id"
              required
            />
          </label>
          <button type="submit" style={styles.button}>Submit</button>
        </form>
      ) : (
        // Once resources are fetched, display them with checkboxes
        <form onSubmit={handleFinalSubmit} style={styles.form}>
          <h3>Select Resources</h3>
          {loading && <p>Loading resources...</p>}
          {!loading && resources.length === 0 && <p>No resources found.</p>}
          {!loading && resources.map((resource) => (
            <div key={resource.id} style={styles.resourceItem}>
              <input
                type="checkbox"
                id={`resource-${resource.id}`}
                value={resource.id}
                onChange={(e) => handleCheckboxChange(e, resource.id)}
              />
              <label htmlFor={`resource-${resource.id}`}> {resource.name}</label>
            </div>
          ))}
          <button type="submit" style={{ ...styles.button, backgroundColor: '#28a745' }}>
            Perform Action
          </button>
        </form>
      )}
    </div>
  );
};
export default Reservation;