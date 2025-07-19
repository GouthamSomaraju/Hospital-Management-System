import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { UserPlus, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
    // Patient specific
    gender: '',
    dateOfBirth: '',
    uniqueId: '',
    // Doctor specific
    qualifications: '',
    specializations: [],
    experience: '',
    // Hospital Admin specific
    hospitalName: '',
    hospitalLocation: ''
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { register } = useAuth()
  const navigate = useNavigate()

  const specializations = [
    'Cardiology', 'Orthopedics', 'Pediatrics', 'Neurology', 'Oncology',
    'Dermatology', 'Psychiatry', 'Surgery', 'Internal Medicine', 'Emergency Medicine'
  ]

  const handleChange = (e) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = e.target.checked
      if (checked) {
        setFormData(prev => ({
          ...prev,
          specializations: [...prev.specializations, value]
        }))
      } else {
        setFormData(prev => ({
          ...prev,
          specializations: prev.specializations.filter(spec => spec !== value)
        }))
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
    setError('')
    setSuccess('')
  }

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return false
    }

    if (formData.role === 'patient') {
      if (!formData.gender || !formData.dateOfBirth || !formData.uniqueId) {
        setError('Please fill in all required fields')
        return false
      }
    }

    if (formData.role === 'doctor') {
      if (!formData.qualifications || formData.specializations.length === 0 || !formData.experience) {
        setError('Please fill in all required fields')
        return false
      }
    }

    if (formData.role === 'hospital_admin') {
      if (!formData.hospitalName || !formData.hospitalLocation) {
        setError('Please fill in all required fields')
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Create user object based on role
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        ...(formData.role === 'patient' && {
          gender: formData.gender,
          dateOfBirth: formData.dateOfBirth,
          uniqueId: formData.uniqueId
        }),
        ...(formData.role === 'doctor' && {
          qualifications: formData.qualifications,
          specializations: formData.specializations,
          experience: parseInt(formData.experience)
        }),
        ...(formData.role === 'hospital_admin' && {
          hospitalName: formData.hospitalName,
          hospitalLocation: formData.hospitalLocation
        })
      }

      register(userData)
      setSuccess('Registration successful! Redirecting...')

      // Redirect after a short delay
      setTimeout(() => {
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
      }, 1500)

    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <div className="card-header">
        <UserPlus className="card-icon" />
        <h2 className="card-title">Register</h2>
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

      {success && (
        <div className="mb-3" style={{ 
          padding: '1rem', 
          backgroundColor: '#d4edda', 
          color: '#155724', 
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <CheckCircle size={20} />
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Role Selection */}
        <div className="form-group">
          <label className="form-label">Register As</label>
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

        {/* Common Fields */}
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </div>

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
          <label className="form-label">Confirm Password</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              className="form-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Patient Specific Fields */}
        {formData.role === 'patient' && (
          <>
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select
                name="gender"
                className="form-select"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                className="form-input"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Unique ID (Aadhar/Passport)</label>
              <input
                type="text"
                name="uniqueId"
                className="form-input"
                value={formData.uniqueId}
                onChange={handleChange}
                required
                placeholder="Enter your unique ID"
              />
            </div>
          </>
        )}

        {/* Doctor Specific Fields */}
        {formData.role === 'doctor' && (
          <>
            <div className="form-group">
              <label className="form-label">Qualifications</label>
              <input
                type="text"
                name="qualifications"
                className="form-input"
                value={formData.qualifications}
                onChange={handleChange}
                required
                placeholder="e.g., MBBS, MD, PhD"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Specializations</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                {specializations.map(spec => (
                  <label key={spec} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="checkbox"
                      value={spec}
                      checked={formData.specializations.includes(spec)}
                      onChange={handleChange}
                    />
                    {spec}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Years of Experience</label>
              <input
                type="number"
                name="experience"
                className="form-input"
                value={formData.experience}
                onChange={handleChange}
                required
                min="0"
                max="50"
                placeholder="Enter years of experience"
              />
            </div>
          </>
        )}

        {/* Hospital Admin Specific Fields */}
        {formData.role === 'hospital_admin' && (
          <>
            <div className="form-group">
              <label className="form-label">Hospital Name</label>
              <input
                type="text"
                name="hospitalName"
                className="form-input"
                value={formData.hospitalName}
                onChange={handleChange}
                required
                placeholder="Enter hospital name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Hospital Location</label>
              <textarea
                name="hospitalLocation"
                className="form-textarea"
                value={formData.hospitalLocation}
                onChange={handleChange}
                required
                placeholder="Enter hospital address"
                rows="3"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%' }}
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div className="text-center mt-3">
        <p style={{ color: '#666' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#667eea', textDecoration: 'none' }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register 