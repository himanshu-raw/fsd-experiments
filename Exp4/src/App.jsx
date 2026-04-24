import React, { useState } from 'react';
import Button from './components/Button';
import Form from './components/Form';
import Dashboard from './components/Dashboard';

function App() {
  const [dashboardState, setDashboardState] = useState('loaded');

  const mockData = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ];

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">⚛️</div>
            <h1 className="app-title">Exp4 Showcase</h1>
          </div>
          <p className="app-subtitle">React Components Live Demo</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {/* Button Component Section */}
          <section className="demo-section">
            <div className="section-header">
              <h2 className="section-title">Button Component</h2>
              <p className="section-description">Interactive button with custom styling and click handlers</p>
            </div>
            <div className="demo-card">
              <div className="demo-content">
                <Button text="Click Me!" onClick={() => alert('✓ Button was clicked!')} />
              </div>
              <div className="demo-info">
                <small>Props: text, onClick</small>
              </div>
            </div>
          </section>

          {/* Form Component Section */}
          <section className="demo-section">
            <div className="section-header">
              <h2 className="section-title">Form Component</h2>
              <p className="section-description">Form with input validation and submission handling</p>
            </div>
            <div className="demo-card">
              <div className="demo-content">
                <Form />
              </div>
              <div className="demo-info">
                <small>Features: Input fields, Validation, Submit handler</small>
              </div>
            </div>
          </section>

          {/* Dashboard Component Section */}
          <section className="demo-section">
            <div className="section-header">
              <h2 className="section-title">Dashboard Component</h2>
              <p className="section-description">Dynamic dashboard with multiple states: loaded, loading, empty, and error</p>
            </div>
            <div className="demo-card">
              <div className="state-selector-wrapper">
                <label className="state-label">Demo State:</label>
                <select 
                  className="state-selector" 
                  value={dashboardState} 
                  onChange={(e) => setDashboardState(e.target.value)}
                >
                  <option value="loaded">✓ Loaded</option>
                  <option value="loading">⟳ Loading</option>
                  <option value="empty">○ Empty</option>
                  <option value="error">✕ Error</option>
                </select>
              </div>
              <div className="demo-content dashboard-demo">
                <Dashboard 
                  state={dashboardState} 
                  data={mockData} 
                  error="Something went wrong while fetching data!" 
                />
              </div>
              <div className="demo-info">
                <small>Props: state, data, error</small>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>Exp 4 - React Components Testing & Live Demo</p>
      </footer>
    </div>
  );
}

export default App;