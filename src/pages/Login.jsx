import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'patient'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Simulate API call - in real app, this would be an actual API request
      await new Promise(resolve => setTimeout(resolve, 1000))

      login(formData.email, formData.password, formData.role)
      
      // Redirect based on role
      switch (formData.role) {
        case 'hospital_admin':
          navigate('/hospital-admin')
          break
        case 'doctor':
          navigate('/doctor')
          break
        case 'patient':
          navigate('/patient')
          break
        default:
          navigate('/')
      }
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card" style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <div className="card-header">
        <LogIn className="card-icon" />
        <h2 className="card-title">Login</h2>
      </div>

      {error && (
        <div className="mb-3" style={{ 
          padding: '1rem', 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Login As</label>
          <select
            name="role"
            className="form-select"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="hospital_admin">Hospital Administrator</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%' }}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="text-center mt-3">
        <p style={{ color: '#666' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#667eea', textDecoration: 'none' }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login 