import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogOut, User, Building2, Stethoscope, Heart } from 'lucide-react'

const Navigation = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <Building2 size={24} />
          <span style={{ marginLeft: '0.5rem' }}>HeartBeat</span>
        </Link>

        <ul className="nav-menu">
          <li>
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              Home
            </Link>
          </li>

          {!isAuthenticated ? (
            <>
              <li>
                <Link to="/login" className={`nav-link ${isActive('/login') ? 'active' : ''}`}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className={`nav-link ${isActive('/register') ? 'active' : ''}`}>
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              {user?.role === 'hospital_admin' && (
                <li>
                  <Link to="/hospital-admin" className={`nav-link ${isActive('/hospital-admin') ? 'active' : ''}`}>
                    <Building2 size={16} />
                    <span style={{ marginLeft: '0.5rem' }}>Admin Dashboard</span>
                  </Link>
                </li>
              )}

              {user?.role === 'doctor' && (
                <li>
                  <Link to="/doctor" className={`nav-link ${isActive('/doctor') ? 'active' : ''}`}>
                    <Stethoscope size={16} />
                    <span style={{ marginLeft: '0.5rem' }}>Doctor Dashboard</span>
                  </Link>
                </li>
              )}

              {user?.role === 'patient' && (
                <li>
                  <Link to="/patient" className={`nav-link ${isActive('/patient') ? 'active' : ''}`}>
                    <Heart size={16} />
                    <span style={{ marginLeft: '0.5rem' }}>Patient Portal</span>
                  </Link>
                </li>
              )}

              <li>
                <div className="nav-user">
                  <User size={16} />
                  <span style={{ marginLeft: '0.5rem', marginRight: '1rem' }}>
                    {user?.name || user?.email}
                  </span>
                  <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                    <LogOut size={16} />
                    <span style={{ marginLeft: '0.5rem' }}>Logout</span>
                  </button>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation 