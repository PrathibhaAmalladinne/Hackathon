import React, { useEffect, useState } from "react";
import data from './data.json';
import { useAction } from './ActionContext';

const Dashboard1 = () => {
    const { selectedAction } = useAction();
    const [reservationId, setReservationId] = useState("");
    const [resources, setResources] = useState([]);
    const [selectedResources, setSelectedResources] = useState([]);

    const actionItems = [
        "Firmware Upgrade",
        "Clear APD Buffer",
        "Uninstall PSF",
        "Upgrade App QoE",
        "Monitoring Pre-check",
        "Cleanup PRE/MPE",
        "Signature Update",
        "Execute Command",
    ];

    const styles = {
        container: {
            display: "flex",
            height: "100vh",
            fontFamily: "Arial, sans-serif",
        },
        navBar: {
            width: "250px",
            backgroundColor: "#f8f9fa",
            padding: "1rem",
            borderRight: "1px solid #ddd",
        },
        navHeader: {
            backgroundImage: "linear-gradient(to right, #cdb4db, #80ed99)",
            color: "black",
            padding: "1rem",
            textAlign: "center",
            borderRadius: "8px",
            marginBottom: "1rem",
        },
        navItem: {
            listStyle: "none",
            padding: "10px 15px",
            margin: "5px 0",
            backgroundColor: "#e9ecef",
            borderRadius: "5px",
            transition: "background-color 0.3s ease",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        navItemActive: {
            backgroundColor: "#dee2e6",
        },
        mainContent: {
            flex: 1,
            padding: "2rem",
        },
        form: {
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "400px",
        },
        input: {
            padding: "0.5rem",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginLeft: '1rem'
        },
        button: {
            padding: "0.7rem",
            fontSize: "16px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "green",
            color: "white",
            cursor: "pointer",
        },
        labelCss: {
            display: 'grid',
            gridTemplateColumns: '2fr 1fr'
        },
        checkboxContainer: {
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
        },
    };

    const handleItemClick = (action) => {
        setSelectedAction(action);
        setReservationId("");
    };

    const transformData = (data) => {
        let transformed = [];
        Object.entries(data).forEach(([device, values]) => {
            Object.entries(values).forEach(([key, value]) => {
                transformed.push({ id: `${device}-${key}`, name: `${device} | ${key} | ${value}` });
            });
        });
        return transformed;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Reservation ID for "${selectedAction}": ${reservationId}`);
        const transformedResources = transformData(data);
        setResources(transformedResources);
    };

    const handleCheckboxChange = (resourceId) => {
        setSelectedResources((prev) =>
            prev.includes(resourceId) ? prev.filter((id) => id !== resourceId) : [...prev, resourceId]
        );
    };

    const handleFinalSubmit = () => {
        alert(`Selected Resources: ${selectedResources.join(", ")}`);
        // API call
    };

    return (
        <div style={styles.container}>
            <nav style={styles.navBar}>
                <h2 style={styles.navHeader}>Action Items</h2>
                <ul style={{ padding: 0, margin: 0 }}>
                    {actionItems.map((action, index) => (
                        <li
                            key={index}
                            style={{
                                ...styles.navItem,
                                ...(selectedAction === action
                                    ? styles.navItemActive
                                    : {}),
                            }}
                            onClick={() => handleItemClick(action)}
                        >
                            {action}
                        </li>
                    ))}
                </ul>
            </nav>
            <main style={styles.mainContent}>
                {selectedAction ? (
                    <>
                        <h2>{selectedAction} Reservation</h2>
                        <form style={styles.form} onSubmit={handleSubmit}>
                            <label style={styles.labelCss}>
                                Enter reservation ID:
                                <input
                                    type="text"
                                    value={reservationId}
                                    onChange={(e) =>
                                        setReservationId(e.target.value)
                                    }
                                    placeholder="Enter reservation id"
                                    style={styles.input}
                                    required
                                />
                            </label>

                            <label style={styles.labelCss}>
                                Enter site
                                <select id="site" name="site" style={{...styles.input, width: '13.25rem'}}>
                                    <option value="bangalore">Bangalore</option>
                                    <option value="waterloo">Waterloo</option>
                                </select>
                            </label>
                            <button type="submit" style={styles.button}>
                                Search
                            </button>
                        </form>

                        {resources.length > 0 && (
                            <div style={styles.checkboxContainer}>
                                <h3>Select Resources</h3>
                                {resources.map((resource) => (
                                    <label key={resource.id} style={{padding: '10px'}}>
                                        <input
                                            type="checkbox"
                                            value={resource.id}
                                            checked={selectedResources.includes(resource.id)}
                                            onChange={() => handleCheckboxChange(resource.id)}
                                        />
                                        {resource.name}
                                    </label>
                                ))}
                                <button onClick={handleFinalSubmit} style={{...styles.button, maxWidth: "400px"}}>
                                    Perform Action!
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <p>
                        Please select an action from the left to create a
                        reservation.
                    </p>
                )}
            </main>
        </div>
    );
};

export default Dashboard1;