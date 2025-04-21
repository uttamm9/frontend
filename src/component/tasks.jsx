import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Tasks = () => {
  const [tasks, setMyTask] = useState([]);
  const [assignedTasks, setMyAssignedTask] = useState([]);
  const [module, setModule] = useState(false);
  const [edituser, setEdituser] = useState(null);
  const navigate = useNavigate();

  const getMyTask = async () => {
    try {
      const response = await axios.get('https://backend-eplc.onrender.com/tasks/getTask', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log("My Task", response.data);
      setMyTask(response.data);
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  };

  const getMyAssignedTask = async () => {
    try {
      const response = await axios.get('https://backend-eplc.onrender.com/tasks/myAssingTask', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log("My Assigned Task", response.data);
      setMyAssignedTask(response.data);
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  };

  const update = async (e) => {
    e.preventDefault();
    console.log('form data=> ', edituser);
    try {
      const result = await axios.patch(`https://backend-eplc.onrender.com/tasks/updateTask/${edituser._id}`, { ...edituser }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Task updated successfully!');
      console.log('updated data', result.data);
      setEdituser({ taskName: '', dueDate: '', status: '', remark: '', assignTo: '' });
    } catch (error) {
      console.error('There was an error updating the task!', error);
      alert(error.response.data.message);
    }
  };

  const Delete = async (_id) => {
    console.log("delete id", _id);
    try {
      await axios.delete(`https://backend-eplc.onrender.com/tasks/deleteTask/${_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Task deleted successfully');
      getMyAssignedTask();
    } catch (error) {
      console.error('There was an error deleting the task!', error);
      alert(error.response.data.message);
    }
  };

  const completedTask = async (_id) => {
    console.log("completed task ID", _id);
    try {
      const response = await axios.patch(`https://backend-eplc.onrender.com/tasks/completeTask/${_id}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert(response.data.message);
      getMyTask();
    } catch (error) {
      console.error('There was an error completing the task!', error);
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    getMyTask();
    getMyAssignedTask();
  }, []);

  const style = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      color: '#555',
      backgroundColor: "white",
      width: '100vw',
      height: '100%',        
      boxSizing: 'border-box',
      top: '0',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      flexWrap: 'wrap'            
    },
    section: {
      marginBottom: '10px',
      width: '100%'
    },
    logout: {
      padding: '10px 20px',
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    },
    createTask: {
      padding: '10px 20px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    },
    thtd: {
      border: '1px solid #ddd',
      padding: '8px',
      textAlign: 'center',
    },
    tableWrapper: {
      width: '100%',
      overflowX: 'auto'   
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
    input: {
      width: '100%',
      padding: '8px',
      marginTop: '5px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '14px'
    },
    label: {
      fontWeight: 'bold',
      color: '#333',
    },
    buttonHover: {
      backgroundColor: '#e68900',
      padding: '10px 20px',
      border: 'none',
      color: 'white',
      borderRadius: '5px',
      cursor: 'pointer'
    },
    cancelBtn: {
      padding: '10px 20px',
      backgroundColor: 'gray',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginLeft: '10px'
    }
  };

  return (
    <div style={style.container}>
      <div style={style.header}>
        <div style={{ margin: '10px', display: 'flex', alignItems: 'center', gap: '10px', padding: '5px' }}>
          <h2 style={{ margin: 0 }}>Hi {localStorage.getItem('name')}</h2>
        </div>
        <div style={{ display: 'flex', gap: '10px', margin: '10px' }}>
          <button onClick={() => { localStorage.clear(); navigate('/login'); }} style={style.logout}>
            Logout
          </button>
          <button onClick={() => navigate('/createTask')} style={style.createTask}>
            Create Task
          </button>
        </div>
      </div>
      
      <div style={style.section}>
        <h1 style={{ color: '#555' }}>My Tasks</h1>
        <div style={style.tableWrapper}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={style.thtd}>S.No.</th>
                <th style={style.thtd}>Task Name</th>
                <th style={style.thtd}>Due Date</th>
                <th style={style.thtd}>Status</th>
                <th style={style.thtd}>Remark</th>
                <th style={style.thtd}>Assigned By</th>
                <th style={style.thtd}>Complete</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td style={style.thtd}>{index + 1}</td>
                  <td style={style.thtd}>{task.taskName}</td>
                  <td style={style.thtd}>{task.dueDate.slice(0, 10)}</td>
                  <td style={style.thtd}>{task.status}</td>
                  <td style={style.thtd}>{task.remark}</td>
                  <td style={style.thtd}>{task.assingBy.name}</td>
                  <td style={style.thtd}>
                    <button
                      style={{ backgroundColor: 'green', padding: '5px 10px', border: 'none', borderRadius: '3px', color: 'white' }}
                      onClick={() => { completedTask(task._id); }}
                      disabled={task.status === 'Completed'}
                    >
                      Complete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div style={style.section}>
        <h1 style={{ color: '#555' }}>My Assigned Tasks</h1>
        <div style={style.tableWrapper}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={style.thtd}>Task Name</th>
                <th style={style.thtd}>Due Date</th>
                <th style={style.thtd}>Status</th>
                <th style={style.thtd}>Remark</th>
                <th style={style.thtd}>Assigned To</th>
                <th style={style.thtd}>Update</th>
                <th style={style.thtd}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {assignedTasks.map((assignedTask, index) => (
                <tr key={index}>
                  <td style={style.thtd}>{assignedTask.taskName}</td>
                  <td style={style.thtd}>{assignedTask.dueDate.slice(0, 10)}</td>
                  <td style={style.thtd}>{assignedTask.status}</td>
                  <td style={style.thtd}>{assignedTask.remark}</td>
                  <td style={style.thtd}>{assignedTask.assignTo.name}</td>
                  <td style={style.thtd}>
                    <button 
                      onClick={() => { setModule(true); setEdituser(assignedTask); }} 
                      style={{ backgroundColor: "red", padding: '5px 10px', border: 'none', borderRadius: '3px', color: 'white' }}
                    >
                      Update
                    </button>
                  </td>
                  <td style={style.thtd}>
                    <button 
                      onClick={() => Delete(assignedTask._id)} 
                      style={{ backgroundColor: "darkred", padding: '5px 10px', border: 'none', borderRadius: '3px', color: 'white' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {module && (
        <div style={style.popup_overlay}>
          <form onSubmit={update} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', width: '90%', maxWidth: '400px' }}>
            <div style={{ marginBottom: '10px' }}>
              <label style={style.label}>Task Name:</label>
              <input
                type="text"
                name="taskName"
                value={edituser.taskName}
                onChange={(e) => setEdituser({ ...edituser, taskName: e.target.value })}
                style={style.input}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={style.label}>Due Date:</label>
              <input
                type="date"
                name="dueDate"
                value={edituser.dueDate}
                onChange={(e) => setEdituser({ ...edituser, dueDate: e.target.value })}
                style={style.input}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={style.label}>Remark:</label>
              <input
                type="text"
                name="remark"
                value={edituser.remark}
                onChange={(e) => setEdituser({ ...edituser, remark: e.target.value })}
                style={style.input}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button type="submit" style={style.buttonHover}>Save Changes</button>
              <button type="button" onClick={() => setModule(false)} style={style.cancelBtn}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Tasks;
