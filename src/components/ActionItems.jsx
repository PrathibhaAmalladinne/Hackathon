import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./ActionItems.css";
import { useAction } from './ActionContext';

const ActionItems = () => {
  // const { setSelectedAction } = useAction();

  const styles = {
    mainCss: {
      marginTop: "1rem",
      marginLeft: "1rem",
      padding: "1rem",
      width: "100%",
      maxWidth: "90%",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      alignItems: "center",
    },
    headerCss: {
      backgroundImage: "linear-gradient(to right, #cdb4db, #80ed99)",
      color: "black",
      padding: "1rem",
      textAlign: "center",
      borderRadius: "8px",
    },
    listItem: {
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
      fontSize: "1rem",
    },
    listItemHover: {
      backgroundColor: "#dee2e6",
    },
    link: {
      textDecoration: "none",
      color: "black",
      display: "block",
    },
  };
  
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

  return (
    <div style={styles.mainCss}>
      <h2 style={styles.headerCss}>Multi-Resource Helper</h2>
      <h4>Action Items</h4>
      <ul style={{ padding: 0 }}>
        {actionItems.map((action, index) => (
          <Link
            to="/reservation"
            style={styles.link}
            key={index}
            // onClick={() => setSelectedAction(action)}
          >
            <li className="listItem">
              {action}
              <ArrowRight size={14} />
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
export default ActionItems;
