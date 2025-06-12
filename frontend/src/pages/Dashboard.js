import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiUsers, FiClipboard, FiFilter, FiPlus, FiMinus, FiBarChart2 } from "react-icons/fi";
import AssignProjectModal from "../modals/AssignProjectModal";
import AssignmentModal from "../modals/AssignmentModal";
import UnassignProjectModal from "../modals/UnassignProjectModal";
import Projects from "../components/Projects";
import "./Dashboard.css";
import Header from "../components/Header";

const Dashboard = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [engineers, setEngineers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [projectDetails, setProjectDetails] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);

  const [assignModalState, setAssignModalState] = useState(false);
  const [assignmentModalState, setAssignmentModalState] = useState(false);
  const [showUnassignModal, setShowUnassignModal] = useState(false);

  const [filterProjectNone, setFilterProjectNone] = useState(false);
  const [filterCurrentlyNotAssigned, setFilterCurrentlyNotAssigned] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState("");

  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/engineers");
        setEngineers(res.data);

        if (currentUser?.role === "Engineer") {
          const currentEngineer = res.data.find(
            (eng) => eng.email === currentUser.email
          );

          if (currentEngineer?.project_assigned) {
            setProjectDetails(currentEngineer.project_assigned);
            const team = res.data.filter(
              (eng) =>
                eng.project_assigned === currentEngineer.project_assigned &&
                eng.email !== currentUser.email
            );
            setTeamMembers(team);
          }

          const assignRes = await axios.get(
            `http://localhost:5000/api/assignments/by-engineer/${currentEngineer._id}`
          );
          setAssignments(assignRes.data);
        }
      } catch (error) {
        console.error("Error fetching engineer data:", error);
      }
    };

    fetchEngineers();
  }, []);

  const getAllDomains = () => {
    const uniqueDomains = new Set(engineers.map((eng) => eng.domain));
    return Array.from(uniqueDomains);
  };

  const filteredEngineers = engineers.filter((eng) => {
    let isMatch = true;
    if (filterProjectNone && eng.project_assigned) isMatch = false;
    if (filterCurrentlyNotAssigned && eng.currently_assigned) isMatch = false;
    if (selectedDomain && eng.domain !== selectedDomain) isMatch = false;
    return isMatch;
  });

  const handleStatusSave = async (assignmentId, status, hideSave) => {
    const progressMap = {
      'Planning': 0,
      'In Progress': 50,
      'Completed': 100,
      'On Hold': 0
    };

    try {
      await axios.put(`http://localhost:5000/api/assignments/${assignmentId}`, {
        status,
        progress: progressMap[status]
      });

      setAssignments((prev) =>
        prev.map((a) =>
          a._id === assignmentId 
            ? { ...a, status, progress: progressMap[status] } 
            : a
        )
      );

      hideSave(false);
    } catch (err) {
      console.error("Error saving assignment update:", err);
    }
  };

  const getStatusClass = (status) => {
    const statusMap = {
      'Planning': 'status-planning',
      'In Progress': 'status-in-progress',
      'Completed': 'status-completed',
      'On Hold': 'status-on-hold'
    };
    return statusMap[status] || '';
  };

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>Welcome, {currentUser?.name}</h2>
          <p className="role">Role: {currentUser?.role}</p>
        </div>

        {currentUser?.role === "Manager" && (
          <>
            <Link to="/manager-stats" className="stats-link">
              <FiBarChart2 />
              View Statistics
            </Link>

            <div className="section">
              <Projects />
            </div>

            <div className="filters">
              <label>
                <input
                  type="checkbox"
                  checked={filterProjectNone}
                  onChange={() => setFilterProjectNone((prev) => !prev)}
                />
                Project Assigned
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={filterCurrentlyNotAssigned}
                  onChange={() => setFilterCurrentlyNotAssigned((prev) => !prev)}
                />
                Currently Assigned
              </label>

              <label>
                <FiFilter />
                Domain:
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}>
                  <option value="">All Domains</option>
                  {getAllDomains().map((domain) => (
                    <option key={domain} value={domain}>
                      {domain}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="engineer-cards">
              {filteredEngineers.map((engineer) => (
                <div key={engineer._id} className="card">
                  <h4>{engineer.name}</h4>
                  <p><strong>Email:</strong> {engineer.email}</p>
                  <p><strong>Domain:</strong> {engineer.domain}</p>
                  <p><strong>Project:</strong> {engineer.project_assigned || "None"}</p>
                  <p><strong>Status:</strong> {engineer.currently_assigned ? "Assigned" : "Available"}</p>
                  <p><strong>Hours:</strong> {engineer.hours_allocated}</p>
                </div>
              ))}
            </div>

            <div className="actions">
              <button onClick={() => setAssignModalState(true)}>
                <FiPlus />
                Assign Projects
              </button>
              <button onClick={() => setAssignmentModalState(true)}>
                <FiClipboard />
                Assign Assignment
              </button>
              <button onClick={() => setShowUnassignModal(true)}>
                <FiMinus />
                Unassign Project
              </button>
            </div>
          </>
        )}

        {currentUser?.role === "Engineer" && (
          <>
            <div className="section">
              <h3 className="section-title">
                <FiUsers />
                Your Assigned Project
              </h3>
              {projectDetails ? (
                <p>{projectDetails}</p>
              ) : (
                <p style={{ color: "#64748b" }}>No project assigned</p>
              )}
            </div>

            <div className="section">
              <h3 className="section-title">
                <FiUsers />
                Your Team
              </h3>
              {teamMembers.length > 0 ? (
                <ul className="assignment-list">
                  {teamMembers.map((teammate) => (
                    <li key={teammate._id} className="assignment-item">
                      <div className="assignment-header">
                        <span className="assignment-id">{teammate.name}</span>
                      </div>
                      <p>{teammate.email}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: "#64748b" }}>No teammates found</p>
              )}
            </div>

            <div className="section">
              <h3 className="section-title">
                <FiClipboard />
                Your Assignments
              </h3>
              {assignments.length > 0 ? (
                <ul className="assignment-list">
                  {assignments.map((assn) => (
                    <li key={assn._id} className="assignment-item">
                      <div className="assignment-header">
                        <span className="assignment-id">Assignment {assn.assignmentId}</span>
                        <span className={`assignment-status ${getStatusClass(assn.status)}`}>
                          {assn.status}
                        </span>
                      </div>
                      <p><strong>Role:</strong> {assn.role}</p>
                      <p><strong>Hours:</strong> {assn.allocatedHours}</p>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${assn.progress}%` }}
                        />
                      </div>
                      <p><strong>Progress:</strong> {assn.progress}%</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: "#64748b" }}>No assignments found</p>
              )}
            </div>
          </>
        )}

        {assignModalState && (
          <AssignProjectModal
            onClose={() => setAssignModalState(false)}
            engineers={engineers}
          />
        )}

        {assignmentModalState && (
          <AssignmentModal
            onClose={() => setAssignmentModalState(false)}
            engineers={engineers}
          />
        )}

        {showUnassignModal && (
          <UnassignProjectModal
            onClose={() => setShowUnassignModal(false)}
            engineers={engineers}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
