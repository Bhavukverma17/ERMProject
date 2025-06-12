import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const getStatusClass = (status) => {
    const statusMap = {
      'Planning': 'status-planning',
      'In Progress': 'status-in-progress',
      'Completed': 'status-completed',
      'On Hold': 'status-on-hold'
    };
    return statusMap[status] || '';
  };

  const getPriorityClass = (priority) => {
    const priorityMap = {
      'High': 'priority-high',
      'Medium': 'priority-medium',
      'Low': 'priority-low'
    };
    return priorityMap[priority] || '';
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(filter.toLowerCase()) ||
                         project.description.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="projects-section">
      <h2>Projects</h2>
      
      <div className="projects-filters">
        <input
          type="text"
          placeholder="Search projects..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="search-input"
        />
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="status-filter"
        >
          <option value="all">All Status</option>
          <option value="Planning">Planning</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
        </select>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div key={project.projectId} className="project-card">
            <div className="project-header">
              <h3>{project.name}</h3>
              <span className={`status-badge ${getStatusClass(project.status)}`}>
                {project.status}
              </span>
            </div>
            
            <div className="project-details">
              <p className="project-description">{project.description}</p>
              
              <div className="project-info">
                <div className="info-item">
                  <strong>Project ID:</strong> {project.projectId}
                </div>
                <div className="info-item">
                  <strong>Client:</strong> {project.client}
                </div>
                <div className="info-item">
                  <strong>Manager:</strong> {project.manager}
                </div>
                <div className="info-item">
                  <strong>Priority:</strong>
                  <span className={`priority-badge ${getPriorityClass(project.priority)}`}>
                    {project.priority}
                  </span>
                </div>
                <div className="info-item">
                  <strong>Budget:</strong> ${project.budget.toLocaleString()}
                </div>
                <div className="info-item">
                  <strong>Required Capacity:</strong> {project.requiredCapacity}%
                </div>
              </div>

              <div className="project-dates">
                <div className="date-item">
                  <strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()}
                </div>
                <div className="date-item">
                  <strong>End Date:</strong> {new Date(project.endDate).toLocaleDateString()}
                </div>
              </div>

              <div className="project-skills">
                <strong>Required Skills:</strong>
                <div className="skills-list">
                  {project.requiredSkills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects; 