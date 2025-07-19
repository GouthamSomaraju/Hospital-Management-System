import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { 
  Heart, 
  Search, 
  Calendar, 
  Clock, 
  Building2, 
  Stethoscope, 
  DollarSign, 
  User,
  MapPin,
  Star,
  Filter,
  BookOpen
} from 'lucide-react'

const Patient = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialization, setSelectedSpecialization] = useState('')
  const [selectedHospital, setSelectedHospital] = useState('')

  // Mock data
  const doctors = [
    {
      id: 1,
      name: 'Dr. John Smith',
      specialization: 'Cardiology',
      hospital: 'City General Hospital',
      experience: 8,
      rating: 4.8,
      fee: 300,
      availableSlots: [
        { date: '2024-01-15', time: '09:00', available: true },
        { date: '2024-01-15', time: '14:00', available: true },
        { date: '2024-01-16', time: '10:00', available: false }
      ]
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      specialization: 'Orthopedics',
      hospital: 'Medical Center',
      experience: 12,
      rating: 4.9,
      fee: 350,
      availableSlots: [
        { date: '2024-01-15', time: '11:00', available: true },
        { date: '2024-01-16', time: '15:00', available: true }
      ]
    },
    {
      id: 3,
      name: 'Dr. Michael Brown',
      specialization: 'Pediatrics',
      hospital: 'City General Hospital',
      experience: 6,
      rating: 4.7,
      fee: 250,
      availableSlots: [
        { date: '2024-01-15', time: '16:00', available: true }
      ]
    }
  ]

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: 'Dr. John Smith',
      hospital: 'City General Hospital',
      date: '2024-01-10',
      time: '14:00',
      fee: 300,
      status: 'completed'
    },
    {
      id: 2,
      doctor: 'Dr. Sarah Johnson',
      hospital: 'Medical Center',
      date: '2024-01-15',
      time: '11:00',
      fee: 350,
      status: 'scheduled'
    }
  ])

  const specializations = ['Cardiology', 'Orthopedics', 'Pediatrics', 'Neurology', 'Dermatology']
  const hospitals = ['City General Hospital', 'Medical Center', 'Community Hospital']

  const totalAppointments = appointments.length
  const totalSpent = appointments.reduce((sum, apt) => sum + apt.fee, 0)
  const upcomingAppointments = appointments.filter(apt => apt.status === 'scheduled').length
  const completedConsultations = appointments.filter(apt => apt.status === 'completed').length

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialization = !selectedSpecialization || doctor.specialization === selectedSpecialization
    const matchesHospital = !selectedHospital || doctor.hospital === selectedHospital
    
    return matchesSearch && matchesSpecialization && matchesHospital
  })

  const handleBookAppointment = (doctorId, slot) => {
    const selectedDoctor = doctors.find(d => d.id === doctorId)
    
    if (selectedDoctor) {
      const newAppointment = {
        id: Date.now(),
        doctor: selectedDoctor.name,
        hospital: selectedDoctor.hospital,
        date: slot.date,
        time: slot.time,
        fee: selectedDoctor.fee,
        status: 'scheduled'
      }
      
      setAppointments([...appointments, newAppointment])
      alert(`Appointment booked successfully with ${selectedDoctor.name} on ${slot.date} at ${slot.time}`)
    }
  }

  const handleCancelAppointment = (appointmentId) => {
    const updatedAppointments = appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: 'cancelled' }
        : apt
    )
    setAppointments(updatedAppointments)
    alert('Appointment cancelled successfully!')
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Heart size={20} /> },
    { id: 'search', label: 'Find Doctors', icon: <Search size={20} /> },
    { id: 'appointments', label: 'My Appointments', icon: <Calendar size={20} /> },
    { id: 'history', label: 'Consultation History', icon: <BookOpen size={20} /> }
  ]

  return (
    <div>
      {/* Header */}
      <div className="card">
        <div className="card-header">
          <Heart className="card-icon" />
          <div>
            <h2 className="card-title">Patient Portal</h2>
            <p style={{ color: '#666', margin: 0 }}>
              Welcome back, {user?.name || 'Patient'}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <User size={16} />
              <span style={{ fontSize: '0.9rem' }}>
                ID: {user?.uniqueId || 'A123456789'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{totalAppointments}</div>
          <div className="stat-label">Total Appointments</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">₹{totalSpent.toLocaleString()}</div>
          <div className="stat-label">Total Spent</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{upcomingAppointments}</div>
          <div className="stat-label">Upcoming Appointments</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{completedConsultations}</div>
          <div className="stat-label">Completed Consultations</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid #f0f0f0', paddingBottom: '1rem' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-2">
              <div className="card">
                <h3 className="mb-2">Patient Information</h3>
                <div className="mb-2">
                  <strong>Name:</strong> {user?.name || 'Jane Doe'}
                </div>
                <div className="mb-2">
                  <strong>Gender:</strong> {user?.gender || 'Female'}
                </div>
                <div className="mb-2">
                  <strong>Date of Birth:</strong> {user?.dateOfBirth || '1990-05-15'}
                </div>
                <div className="mb-2">
                  <strong>Unique ID:</strong> {user?.uniqueId || 'A123456789'}
                </div>
              </div>

              <div className="card">
                <h3 className="mb-2">Recent Activity</h3>
                <div style={{ fontSize: '0.9rem' }}>
                  <div className="mb-2">• Appointment scheduled with Dr. Sarah Johnson</div>
                  <div className="mb-2">• Consultation completed with Dr. John Smith</div>
                  <div className="mb-2">• Payment processed: ₹300</div>
                  <div className="mb-2">• New doctor available: Dr. Michael Brown</div>
                </div>
              </div>
            </div>

            <div className="card mt-3">
              <h3 className="mb-2">Upcoming Appointments</h3>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Doctor</th>
                      <th>Hospital</th>
                      <th>Date & Time</th>
                      <th>Fee</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.filter(apt => apt.status === 'scheduled').map(appointment => (
                      <tr key={appointment.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Stethoscope size={16} />
                            <strong>{appointment.doctor}</strong>
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Building2 size={16} />
                            {appointment.hospital}
                          </div>
                        </td>
                        <td>
                          {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                        </td>
                        <td>₹{appointment.fee}</td>
                        <td>
                          <span className="badge badge-info">Scheduled</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Search Doctors Tab */}
        {activeTab === 'search' && (
          <div>
            <div className="card mb-3">
              <h3 className="mb-2">Find Doctors</h3>
              
              {/* Search and Filters */}
              <div className="grid grid-3">
                <div className="form-group">
                  <label className="form-label">Search</label>
                  <div style={{ position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                    <input
                      type="text"
                      className="form-input"
                      style={{ paddingLeft: '2.5rem' }}
                      placeholder="Search doctors or hospitals..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Specialization</label>
                  <select
                    className="form-select"
                    value={selectedSpecialization}
                    onChange={(e) => setSelectedSpecialization(e.target.value)}
                  >
                    <option value="">All Specializations</option>
                    {specializations.map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Hospital</label>
                  <select
                    className="form-select"
                    value={selectedHospital}
                    onChange={(e) => setSelectedHospital(e.target.value)}
                  >
                    <option value="">All Hospitals</option>
                    {hospitals.map(hospital => (
                      <option key={hospital} value={hospital}>{hospital}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Doctors List */}
            <div className="grid grid-2">
              {filteredDoctors.map(doctor => (
                <div key={doctor.id} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <h4 className="mb-1">{doctor.name}</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <Stethoscope size={16} />
                        <span style={{ color: '#666' }}>{doctor.specialization}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <Building2 size={16} />
                        <span style={{ color: '#666' }}>{doctor.hospital}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Star size={16} style={{ color: '#ffc107' }} />
                        <span>{doctor.rating} ({doctor.experience} years exp.)</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#667eea' }}>
                        ₹{doctor.fee}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#666' }}>per consultation</div>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid #e1e5e9', paddingTop: '1rem' }}>
                    <h5 className="mb-2">Available Slots</h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {doctor.availableSlots.filter(slot => slot.available).map((slot, index) => (
                        <button
                          key={index}
                          className="btn btn-primary"
                          style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                          onClick={() => handleBookAppointment(doctor.id, slot)}
                        >
                          {new Date(slot.date).toLocaleDateString()} {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div>
            <h3 className="mb-2">My Appointments</h3>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Doctor</th>
                    <th>Hospital</th>
                    <th>Date & Time</th>
                    <th>Fee</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map(appointment => (
                    <tr key={appointment.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Stethoscope size={16} />
                          <strong>{appointment.doctor}</strong>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Building2 size={16} />
                          {appointment.hospital}
                        </div>
                      </td>
                      <td>
                        {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                      </td>
                      <td>₹{appointment.fee}</td>
                      <td>
                        <span className={`badge ${
                          appointment.status === 'completed' ? 'badge-success' : 
                          appointment.status === 'scheduled' ? 'badge-info' : 
                          appointment.status === 'cancelled' ? 'badge-danger' : 
                          'badge-secondary'
                        }`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td>
                        {appointment.status === 'scheduled' && (
                          <button className="btn btn-danger" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }} onClick={() => handleCancelAppointment(appointment.id)}>
                            Cancel
                          </button>
                        )}
                        {appointment.status === 'cancelled' && (
                          <span style={{ color: '#dc3545', fontSize: '0.875rem' }}>Cancelled</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div>
            <h3 className="mb-2">Consultation History</h3>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Doctor</th>
                    <th>Hospital</th>
                    <th>Date & Time</th>
                    <th>Fee</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.filter(apt => apt.status === 'completed').map(appointment => (
                    <tr key={appointment.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Stethoscope size={16} />
                          <strong>{appointment.doctor}</strong>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Building2 size={16} />
                          {appointment.hospital}
                        </div>
                      </td>
                      <td>
                        {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                      </td>
                      <td>₹{appointment.fee}</td>
                      <td>
                        <span className="badge badge-success">Completed</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Patient 