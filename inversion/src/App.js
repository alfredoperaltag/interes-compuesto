import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard/dashboard'
import DashboardReal from './components/Dashboard/DashboardReal'


function App() {
  return (
    <div className="App container-fluid">
      <Dashboard />
      <DashboardReal />
    </div>
  );
}

export default App;
