import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiUsers, FiPieChart, FiBarChart2, FiDatabase } from 'react-icons/fi';
import './ManagerStats.css';

const COLORS = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];

const ManagerStatsPage = () => {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/stats/overview');
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p className="loading-text">Loading statistics...</p>;

  const pieData = [
    { name: 'Assigned Engineers', value: stats.assignedEngineers },
    { name: 'Unassigned Engineers', value: stats.unassignedEngineers },
  ];

  const summaryData = [
    { label: 'Total Engineers', value: stats.totalEngineers },
    { label: 'Assigned Engineers', value: stats.assignedEngineers },
    { label: 'Unassigned Engineers', value: stats.unassignedEngineers },
    { label: 'Total Projects', value: stats.totalProjects },
  ];

  return (
    <div className="manager-stats-container">
      <div className="stats-header">
        <h2>
          <FiDatabase />
          Manager Statistics Dashboard
        </h2>
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <FiArrowLeft />
          Back to Dashboard
        </button>
      </div>

      <div className="charts-section">
        <div className="chart-box">
          <h3>
            <FiPieChart />
            Engineer Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>
            <FiBarChart2 />
            Engineers per Project
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={stats.projectWiseEngineerCount}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="_id" 
                stroke="#64748b"
                tick={{ fill: '#64748b' }}
              />
              <YAxis 
                stroke="#64748b"
                tick={{ fill: '#64748b' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Bar 
                dataKey="count" 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="summary-section">
        <h4>
          <FiUsers />
          Statistics Summary
        </h4>
        <ul>
          {summaryData.map((item, index) => (
            <li key={index}>
              <strong>{item.label}</strong>
              <span>{item.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManagerStatsPage;
