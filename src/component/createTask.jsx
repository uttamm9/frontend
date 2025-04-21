import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateTask = () => {
  const [task, setTask] = useState({
    taskName: '',
    dueDate: '',
    assignTo: '',
    remark: ''
  });

  const [users, setUsers] = useState([]);
  const [minDate, setMinDate] = useState('');
  const [showInput, setShowInput] = useState(false);
const [sheetLink, setSheetLink] = useState('');

  const navigate = useNavigate();

 
  const setTodayAsMinDate = () => {
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
  };


  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://backend-eplc.onrender.com/tasks/getuser', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    setTodayAsMinDate();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://backend-eplc.onrender.com/tasks/createTask', { ...task }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((response) => {
        alert('Task created successfully');
        navigate('/tasks');
      })
      .catch((error) => {
        console.log("Error:", error);
        alert(error.response.data.message);
      });
  };

  const handleGoogleSheetUpload = async () => {
    try {
      const res = await axios.post('https://backend-eplc.onrender.com/tasks/uploadFromSheet', {
        sheetUrl: sheetLink
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert(res.data.message || "Tasks uploaded successfully!");
      setShowInput(false);
      setSheetLink('');
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
      console.error(err);
    }
  };
  


  const styles = {
    container: {
      backgroundColor: "white",
      minHeight: "100vh",           
      width: "100vw",            
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",             
      boxSizing: "border-box",
      fontFamily: "Arial, sans-serif"
    },
    header: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      marginBottom: "1rem"
    },
    headerLeft: {
      margin: "10px",
      display: "flex",
      alignItems: "center",
      gap: "10px"
    },
    headerRight: {
      margin: "10px",
      display: "flex",
      justifyContent: "space-between",
      gap: "10px"
    },
    button: {
      padding: "10px 20px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: "bold",
      transition: "0.3s"
    },
    logout: {
      backgroundColor: "#f44336",
      color: "white"
    },
    createTaskNav: {
      backgroundColor: "#4CAF50",
      color: "white"
    },
    formContainer: {
      backgroundColor: "white",
      padding: "1.5rem",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      width: "90%",        
      maxWidth: "400px",    
      textAlign: "left"
    },
    formTitle: {
      textAlign: "center",
      color: "#333",
      marginTop:'0',
      marginBottom: "1rem"
    },
    formGroup: {
      marginBottom: "1rem",
      color: "black",
    },
    label: {
      fontWeight: "bold",
      background: "white",
      color: "#555"
    },
    input: {
      width: "100%",
      padding: "5px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      background: "white",
      fontSize: "1rem",
      color: "black",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "1rem",
      background: "white",
      minHeight: "70px",
      color: "black"
    },
    submitButton: {
      width: "100%",
      padding: "10px",
      background: "#28a745",
      color: "white"
    },
    navigationBtn: {
      background: "#007bff",
      color: "white",
      padding: "10px 20px",
      borderRadius: "6px",
      fontSize: "1rem"
    },
    popup_overlay: {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    closeButton: {
      padding: '8px 12px',
      background: '#f44336',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      marginLeft: '10px'
    }
  };

  return (
    <div style={styles.container}>
     
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h2 style={{ margin: 0,color:"black" }}>Hi {localStorage.getItem('name')}</h2>
        </div>
        <div style={styles.headerRight}>
          <button
            onClick={() => setShowInput(!showInput)}
            style={{ ...styles.button, ...styles.createTaskNav }}
          >
            Upload from Google Sheet
          </button>
          {showInput && (
  <div style={styles.popup_overlay}>
    <input
      type="text"
      placeholder="Paste Google Sheet link here"
      value={sheetLink}
      onChange={(e) => setSheetLink(e.target.value)}
      style={{
        padding: '8px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        width: '300px',
        marginRight: '10px'
      }}
    />
    <button
      onClick={handleGoogleSheetUpload}
      style={{
        padding: '8px 12px',
        background: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer'
      }}
    >
      Submit
    </button>
    <button
      onClick={() => setShowInput(false)}
      style={styles.closeButton}
    >
      Close
    </button>
  </div>
)}

        </div>
      </div>

   
      <form onSubmit={handleSubmit} style={styles.formContainer}>
        <h2 style={styles.formTitle}>Create Task</h2>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Tital:</label>
          <input
            type="text"
            name="taskName"
            value={task.taskName}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="Enter task title"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            required
            min={minDate}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Assign To:</label>
          <select
            name="assignTo"
            value={task.assignTo}
            onChange={handleChange}
            required
            style={{
              ...styles.input,
              background: "white",
              color: "black"
            }}
          >
            <option value="">Select User</option>
            {Array.isArray(users) &&
              users.map((user) => (
                <option key={user._id} value={user.email}>
                  {user.email}
                </option>
              ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Description:</label>
          <textarea
            name="remark"
            value={task.remark}
            onChange={handleChange}
            required
            style={styles.textarea}
            placeholder="Enter task description"
          ></textarea>
        </div>

        <button
          type="submit"
          style={{ ...styles.button, ...styles.submitButton }}
          onMouseOver={(e) => (e.target.style.background = "#218838")}
          onMouseOut={(e) => (e.target.style.background = "#28a745")}
        >
          Create Task
        </button>
      </form>

      
      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={() => navigate("/tasks")}
          style={{ ...styles.button, ...styles.navigationBtn }}
          onMouseOver={(e) => (e.target.style.background = "#0056b3")}
          onMouseOut={(e) => (e.target.style.background = "#007bff")}
        >
          All Tasks
        </button>
      </div>
    </div>
  );
};

export default CreateTask;
