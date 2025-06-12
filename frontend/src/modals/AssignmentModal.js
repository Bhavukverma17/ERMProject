import React, { useEffect, useState } from 'react';
import axios from 'axios';

const modalBackdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(4px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
};

const modalContainerStyle = {
  backgroundColor: "#fff",
  padding: "1.5rem",
  borderRadius: "8px",
  width: "90%",
  maxWidth: "500px",
  maxHeight: "90vh",
  overflowY: "auto",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  position: "relative",
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '15px',
  fontSize: '18px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
};

const inputStyle = {
  width: "100%",
  padding: "6px",
  marginTop: "0.25rem",
  marginBottom: "0.75rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "0.9rem",
};

const labelStyle = {
  fontSize: "0.9rem",
  fontWeight: "500",
  color: "#4a5568",
  marginBottom: "0.25rem",
};

const AssignmentModal = ({ onClose }) => {
  const [engineers, setEngineers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedEngineer, setSelectedEngineer] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [allocatedHours, setAllocatedHours] = useState(40);
  const [role, setRole] = useState('');
  const [tasks, setTasks] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [engineersRes, projectsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/engineers'),
          axios.get('http://localhost:5000/api/projects')
        ]);
        setEngineers(engineersRes.data);
        setProjects(projectsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again.');
      }
    };

    fetchData();
  }, []);

  const handleAssign = async () => {
    try {
      setError('');

      // Validate required fields
      if (!selectedEngineer || !selectedProject || !startDate || !endDate || !role) {
        setError("Please fill in all required fields");
        return;
      }

      // Find selected engineer and project
      const selectedEng = engineers.find(eng => eng._id === selectedEngineer);
      const selectedProj = projects.find(proj => proj._id === selectedProject);

      if (!selectedEng || !selectedProj) {
        setError("Selected engineer or project not found");
        return;
      }

      // Prepare the assignment data
      const assignmentData = {
        projectId: selectedProject,
        engineerId: selectedEng.user_id,
        engineerName: selectedEng.name,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        status: 'Planning',
        allocatedHours: parseInt(allocatedHours),
        role: role,
        tasks: tasks.split(',').map(task => task.trim()).filter(task => task)
      };

      console.log('Sending assignment data:', assignmentData);

      const response = await axios.post('http://localhost:5000/api/assignments/assign', assignmentData);
      
      if (response.data) {
        alert("Assignment created and assigned successfully!");
        onClose();
      }
    } catch (error) {
      console.error("Assignment creation failed:", error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message;
      setError(`Failed to assign: ${errorMessage}`);
    }
  };

  return (
    <div style={modalBackdropStyle}>
      <div style={modalContainerStyle}>
        <button style={closeButtonStyle} onClick={onClose}>✖</button>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Assign New Assignment</h2>

        {error && (
          <div style={{ 
            color: '#dc3545', 
            backgroundColor: '#f8d7da', 
            padding: '8px', 
            borderRadius: '4px',
            marginBottom: '0.75rem',
            fontSize: "0.9rem"
          }}>
            {error}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <div>
            <label style={labelStyle}>Select Engineer:</label>
            <select
              value={selectedEngineer}
              onChange={(e) => setSelectedEngineer(e.target.value)}
              style={inputStyle}
            >
              <option value="">Select Engineer</option>
              {engineers.map((eng) => (
                <option key={eng._id} value={eng._id}>{eng.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Select Project:</label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              style={inputStyle}
            >
              <option value="">Select Project</option>
              {projects.map((proj) => (
                <option key={proj._id} value={proj._id}>{proj.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <div>
            <label style={labelStyle}>Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <div>
            <label style={labelStyle}>Allocated Hours:</label>
            <input
              type="number"
              value={allocatedHours}
              onChange={(e) => setAllocatedHours(e.target.value)}
              min="1"
              max="40"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Role:</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Frontend Developer"
              style={inputStyle}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Tasks (comma-separated):</label>
          <textarea
            value={tasks}
            onChange={(e) => setTasks(e.target.value)}
            placeholder="e.g., UI Development, API Integration"
            style={{
              ...inputStyle,
              minHeight: '60px',
              resize: 'vertical'
            }}
          />
        </div>

        <button
          style={{
            ...inputStyle,
            marginTop: '0.5rem',
            backgroundColor: selectedEngineer && selectedProject && startDate && endDate && role ? '#007bff' : '#aaa',
            color: '#fff',
            cursor: selectedEngineer && selectedProject && startDate && endDate && role ? 'pointer' : 'not-allowed',
            border: 'none',
            padding: '8px',
            fontWeight: '500'
          }}
          disabled={!selectedEngineer || !selectedProject || !startDate || !endDate || !role}
          onClick={handleAssign}
        >
          Assign
        </button>
      </div>
    </div>
  );
};

export default AssignmentModal;
