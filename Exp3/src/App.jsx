import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [viewType, setViewType] = useState('all')
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' })
  const [teamMembers, setTeamMembers] = useState([])
  const [showTeamPanel, setShowTeamPanel] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) return;

    // API Caching test
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        // Map the original global data to Indian equivalents
        const indianNames = ["Aarav Sharma", "Vivaan Kapoor", "Aditya Singh", "Vihaan Iyer", "Arjun Reddy", "Sai Krishna", "Ayaan Desai", "Rohan Joshi", "Krishna Das", "Ishaan Verma"];
        const indianCities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Surat"];
        const indianCompanies = ["TCS", "Infosys", "Wipro", "HCLTech", "Tech Mahindra", "Reliance", "L&T", "Adani Group", "Mahindra", "Bajaj Auto"];
        
        const indianData = json.map((user, index) => {
          const name = indianNames[index];
          return {
            ...user,
            name: name,
            email: name.toLowerCase().replace(' ', '.') + "@example.in",
            address: { ...user.address, city: indianCities[index % indianCities.length] },
            company: { ...user.company, name: indianCompanies[index % indianCompanies.length] }
          };
        });
        
        setData(indianData)
        setLoading(false)
      })
      .catch(error => {
        console.error("Error fetching data:", error)
        setLoading(false)
      });

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isLoggedIn]);

  const filteredData = data.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    if (!loginForm.email || !loginForm.password) {
      setLoginError('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginForm.email)) {
      setLoginError('Please enter a valid email');
      return;
    }

    if (loginForm.password.length < 6) {
      setLoginError('Password must be at least 6 characters');
      return;
    }

    const userNameParts = loginForm.email.split('@')[0].split('.');
    const displayName = userNameParts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
    
    setCurrentUser({ name: displayName, email: loginForm.email });
    setIsLoggedIn(true);
    setLoginForm({ email: '', password: '' });
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({ name: '', email: '' });
    setLoginForm({ email: '', password: '' });
    setLoginError('');
    setViewType('all');
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleViewChange = (e) => {
    setViewType(e.target.value);
  };

  const handleAddMember = () => {
    alert('Add new member feature coming soon!');
  };

  const handleAddToTeam = (user) => {
    const isAlreadyInTeam = teamMembers.some(member => member.id === user.id);
    if (!isAlreadyInTeam) {
      setTeamMembers([...teamMembers, { ...user, role: 'Member' }]);
    }
  };

  const handleRemoveFromTeam = (userId) => {
    setTeamMembers(teamMembers.filter(member => member.id !== userId));
  };

  const toggleTeamPanel = () => {
    setShowTeamPanel(!showTeamPanel);
  };

  return (
    <div className="app-container">
      {isOffline && (
        <div className="offline-banner">
          📶 You are currently offline. Viewing cached content.
        </div>
      )}

      {!isLoggedIn ? (
        <div className="login-container">
          <div className="login-card">
            <div className="login-logo">💚</div>
            <h1>Easy Directory</h1>
            <p>Sign in to your account</p>
            
            <form onSubmit={handleLoginSubmit} className="login-form">
              {loginError && <div className="login-error">{loginError}</div>}
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleLoginInputChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginInputChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>

              <button type="submit" className="login-btn">Sign In</button>
            </form>

            <p className="login-demo-note">Demo: Use any email and password (min 6 chars)</p>
          </div>
        </div>
      ) : (
        <>
          <div className="nav-bar">
            <div className="logo-section">
              <div className="logo">💚</div>
              <div className="logo-text">Easy Directory</div>
            </div>
            <div className="user-info-section">
              <div className="team-badge-container">
                <button 
                  className="team-badge-btn"
                  onClick={toggleTeamPanel}
                  title="View Team Members"
                >
                  👥 {teamMembers.length}
                </button>
                {showTeamPanel && (
                  <div className="team-panel">
                    <div className="team-panel-header">
                      <h3>Team Members</h3>
                      <p className="team-count">{teamMembers.length} {teamMembers.length === 1 ? 'member' : 'members'}</p>
                    </div>
                    {teamMembers.length > 0 ? (
                      <div className="team-members-list">
                        {teamMembers.map(member => {
                          const initials = member.name.split(' ').map(n => n[0]).join('').substring(0, 2);
                          return (
                            <div className="team-member-card" key={member.id}>
                              <div className="team-member-avatar">{initials}</div>
                              <div className="team-member-info">
                                <p className="team-member-name">{member.name}</p>
                                <p className="team-member-role">{member.role}</p>
                                <p className="team-member-company">{member.company.name}</p>
                              </div>
                              <button
                                className="team-member-remove"
                                onClick={() => handleRemoveFromTeam(member.id)}
                                title="Remove from team"
                              >
                                ✕
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="team-empty-state">
                        <p>No team members added yet</p>
                        <p className="team-empty-hint">Add members from the directory</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="user-avatar-small">{currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2)}</div>
              <div className="user-name">
                <p className="user-name-text">{currentUser.name}</p>
                <p className="user-status">Available</p>
              </div>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          </div>

          <div className="main-content">
            <form className="search-container" onSubmit={handleSearch}>
              <div className="search-box">
                <input 
                  type="text" 
                  className="search-input"
                  placeholder="Who are you looking for today?" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="search-btn">Search</button>
              </div>
            </form>

            {loading ? (
              <div className="user-grid">
                {[1, 2, 3, 4, 5, 6].map(skeleton => (
                  <div key={skeleton} className="skeleton-card">
                    <div className="skeleton-image"></div>
                    <div className="skeleton-content">
                      <div className="skeleton-line"></div>
                      <div className="skeleton-line"></div>
                      <div className="skeleton-line" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredData.length > 0 ? (
              <>
                <div className="user-grid">
                  {filteredData.map(user => {
                    const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2);
                    return (
                      <div className="user-card" key={user.id}>
                        <div className="user-card-image">
                          <div className="card-avatar">
                            {initials}
                          </div>
                        </div>
                        <div className="user-card-content">
                          <h3>{user.email}</h3>
                          <p>{user.company.name}</p>
                          <p style={{ marginTop: '8px', fontSize: '12px' }}>Search your contacts and colleagues</p>
                          <button
                            className={`add-to-team-btn ${teamMembers.some(m => m.id === user.id) ? 'in-team' : ''}`}
                            onClick={() => handleAddToTeam(user)}
                            disabled={teamMembers.some(m => m.id === user.id)}
                          >
                            {teamMembers.some(m => m.id === user.id) ? '✓ In Team' : '+ Add to Team'}
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="support-section">
                  <div className="support-card">
                    <h3>How To Get Started</h3>
                    <p>Learn how to use Easy Directory in the best way</p>
                  </div>
                  <div className="support-card">
                    <h3>Support</h3>
                    <p>Contact our support if you need help</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="no-results">
                <h2>😔 No Results Found</h2>
                <p>Try searching with a different name or email</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default App
