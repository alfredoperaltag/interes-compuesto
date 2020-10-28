import React from 'react';
import './App.css';
import Dashboard from './containers/Dashboard/dashboard'
import DashboardReal from './containers/Dashboard/DashboardReal'


function App() {
  return (
    <div className="App container-fluid">
      <Dashboard />
      <DashboardReal />
    </div>
  );
}

export default App;
