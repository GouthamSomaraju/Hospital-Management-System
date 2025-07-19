import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { 
  Stethoscope, 
  DollarSign, 
  Calendar, 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Building2,
  Clock,
  MapPin,
  Star,
  Check,
  X,
  AlertTriangle
} from 'lucide-react'

const Doctor = () => {
  const { 
    user, 
    getHospitals, 
    getDoctors,
    getDoctorHospitals,
    addDoctorHospital,
    deleteDoctorHospital,
    getDoctorAvailability,
    addDoctorAvailability,
    deleteDoctorAvailability,
    getDoctorConsultations,
    addDoctorConsultation,
    updateDoctorConsultation
  } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [showAddAvailability, setShowAddAvailability] = useState(false)
  const [showDoctorRegistration, setShowDoctorRegistration] = useState(false)
  const [showHospitalAssociation, setShowHospitalAssociation] = useState(false)
  
  const [newAvailability, setNewAvailability] = useState({
    hospital: '',
    date: '',
    startTime: '',
    endTime: '',
    fee: ''
  })

  const [doctorRegistration, setDoctorRegistration] = useState({
    name: '',
    qualifications: '',
    specializations: [],
    experience: '',
    email: '',
    phone: ''
  })

  const [hospitalAssociation, setHospitalAssociation] = useState({
    hospital: '',
    consultationFee: ''
  })

  // Load hospitals from localStorage
  const [hospitals, setHospitals] = useState(() => {
    const storedHospitals = getHospitals()
    if (storedHospitals.length === 0) {
      // Initialize with default data if no hospitals exist
      const defaultHospitals = [
        { 
          id: 1, 
          name: 'City General Hospital', 
          location: 'Downtown',
          departments: ['Cardiology', 'Orthopedics', 'Pediatrics', 'Neurology']
        },
        { 
          id: 2, 
          name: 'Medical Center', 
          location: 'Uptown',
          departments: ['Cardiology', 'Dermatology', 'General Medicine']
        },
        {
          id: 3,
          name: 'Specialty Hospital',
          location: 'Midtown',
          departments: ['Orthopedics', 'Neurology', 'Dermatology']
        }
      ]
      return defaultHospitals
    }
    return storedHospitals
  })

  // Available specializations
  const availableSpecializations = [
    'Cardiology', 'Orthopedics', 'Pediatrics', 'Neurology', 
    'Dermatology', 'General Medicine', 'Internal Medicine',
    'Surgery', 'Psychiatry', 'Oncology'
  ]

  // Load doctor's hospital associations from localStorage
  const [doctorHospitals, setDoctorHospitals] = useState(() => {
    const doctorId = user?.id
    if (!doctorId) return []
    
    const storedAssociations = getDoctorHospitals(doctorId)
    if (storedAssociations.length === 0) {
      // Initialize with default data if no associations exist
      const defaultAssociations = [
        {
          id: 1,
          hospitalId: 1,
          hospitalName: 'City General Hospital',
          consultationFee: 300,
          specializations: ['Cardiology']
        }
      ]
      // Save default associations to localStorage
      defaultAssociations.forEach(assoc => {
        addDoctorHospital(doctorId, assoc)
      })
      return defaultAssociations
    }
    return storedAssociations
  })

  // Load availability from localStorage
  const [availability, setAvailability] = useState(() => {
    const doctorId = user?.id
    if (!doctorId) return []
    
    const storedAvailability = getDoctorAvailability(doctorId)
    if (storedAvailability.length === 0) {
      // Initialize with default data if no availability exists
      const defaultAvailability = [
        {
          id: 1,
          hospital: 'City General Hospital',
          date: '2024-01-15',
          startTime: '09:00',
          endTime: '17:00',
          fee: 300,
          status: 'available'
        },
        {
          id: 2,
          hospital: 'Medical Center',
          date: '2024-01-16',
          startTime: '10:00',
          endTime: '16:00',
          fee: 350,
          status: 'booked'
        }
      ]
      // Save default availability to localStorage
      defaultAvailability.forEach(slot => {
        addDoctorAvailability(doctorId, slot)
      })
      return defaultAvailability
    }
    return storedAvailability
  })

  // Load consultations from localStorage
  const [consultations, setConsultations] = useState(() => {
    const doctorId = user?.id
    if (!doctorId) return []
    
    const storedConsultations = getDoctorConsultations(doctorId)
    if (storedConsultations.length === 0) {
      // Initialize with default data if no consultations exist
      const defaultConsultations = [
        {
          id: 1,
          patient: 'Jane Doe',
          hospital: 'City General Hospital',
          date: '2024-01-10',
          time: '14:00',
          fee: 300,
          status: 'completed',
          notes: 'Patient responded well to treatment',
          prescription: 'Continue medication for 2 weeks'
        },
        {
          id: 2,
          patient: 'John Smith',
          hospital: 'Medical Center',
          date: '2024-01-12',
          time: '11:00',
          fee: 350,
          status: 'pending',
          notes: 'Awaiting test results',
          prescription: ''
        },
        {
          id: 3,
          patient: 'Sarah Wilson',
          hospital: 'City General Hospital',
          date: '2024-01-14',
          time: '16:00',
          fee: 300,
          status: 'rejected',
          notes: 'Patient did not show up',
          prescription: ''
        }
      ]
      // Save default consultations to localStorage
      defaultConsultations.forEach(consultation => {
        addDoctorConsultation(doctorId, consultation)
      })
      return defaultConsultations
    }
    return storedConsultations
  })

  const [showStatusModal, setShowStatusModal] = useState(false)
  const [selectedConsultation, setSelectedConsultation] = useState(null)
  const [statusUpdate, setStatusUpdate] = useState({
    status: '',
    notes: '',
    prescription: ''
  })

  const totalEarnings = 12500
  const totalConsultations = 25
  const associatedHospitals = doctorHospitals.length
  const upcomingAppointments = 3

  const handleDoctorRegistration = () => {
    if (doctorRegistration.name.trim() && doctorRegistration.qualifications.trim() && doctorRegistration.specializations.length > 0) {
      // In a real app, this would be sent to backend
      alert('Doctor registration successful! You can now associate with hospitals.')
      setDoctorRegistration({
        name: '',
        qualifications: '',
        specializations: [],
        experience: '',
        email: '',
        phone: ''
      })
      setShowDoctorRegistration(false)
    } else {
      alert('Please fill in all required fields and select at least one specialization.')
    }
  }

  const handleHospitalAssociation = () => {
    if (hospitalAssociation.hospital && hospitalAssociation.consultationFee) {
      const selectedHospital = hospitals.find(h => h.id === parseInt(hospitalAssociation.hospital))
      
      // Get all specializations from existing hospital associations or registration form
      const doctorSpecializations = doctorHospitals.flatMap(assoc => assoc.specializations)
      const allSpecializations = doctorSpecializations.length > 0 
        ? doctorSpecializations 
        : doctorRegistration.specializations
      
      // Check if doctor's specializations match hospital departments
      const matchingSpecializations = allSpecializations.filter(spec => 
        selectedHospital.departments.includes(spec)
      )

      if (matchingSpecializations.length === 0) {
        alert('Your specializations do not match any departments in this hospital. Please select a different hospital.')
        return
      }

      const associationData = {
        hospitalId: parseInt(hospitalAssociation.hospital),
        hospitalName: selectedHospital.name,
        consultationFee: parseInt(hospitalAssociation.consultationFee),
        specializations: matchingSpecializations
      }

      const newAssociation = addDoctorHospital(user.id, associationData)
      setDoctorHospitals([...doctorHospitals, newAssociation])
      setHospitalAssociation({ hospital: '', consultationFee: '' })
      setShowHospitalAssociation(false)
      alert('Successfully associated with hospital!')
    } else {
      alert('Please select a hospital and enter consultation fee.')
    }
  }

  const handleAddAvailability = () => {
    if (newAvailability.hospital && newAvailability.date && newAvailability.startTime && newAvailability.endTime && newAvailability.fee) {
      
      // Check for time conflicts
      const hasConflict = availability.some(slot => {
        if (slot.date === newAvailability.date) {
          const newStart = newAvailability.startTime
          const newEnd = newAvailability.endTime
          const existingStart = slot.startTime
          const existingEnd = slot.endTime
          
          return (newStart < existingEnd && newEnd > existingStart)
        }
        return false
      })

      if (hasConflict) {
        alert('Time slot conflicts with existing availability. Please choose a different time.')
        return
      }

      const availabilityData = {
        hospital: newAvailability.hospital,
        date: newAvailability.date,
        startTime: newAvailability.startTime,
        endTime: newAvailability.endTime,
        fee: parseInt(newAvailability.fee),
        status: 'available'
      }
      
      const newSlot = addDoctorAvailability(user.id, availabilityData)
      setAvailability([...availability, newSlot])
      
      setNewAvailability({
        hospital: '',
        date: '',
        startTime: '',
        endTime: '',
        fee: ''
      })
      setShowAddAvailability(false)
      alert('Availability slot added successfully!')
    }
  }

  const toggleSpecialization = (spec) => {
    const isSelected = doctorRegistration.specializations.includes(spec)
    if (isSelected) {
      setDoctorRegistration({
        ...doctorRegistration,
        specializations: doctorRegistration.specializations.filter(s => s !== spec)
      })
    } else {
      setDoctorRegistration({
        ...doctorRegistration,
        specializations: [...doctorRegistration.specializations, spec]
      })
    }
  }

  const getCompatibleHospitals = () => {
    // Get all specializations from existing hospital associations
    const doctorSpecializations = doctorHospitals.flatMap(assoc => assoc.specializations)
    
    // If no specializations yet, use the registration form specializations
    const allSpecializations = doctorSpecializations.length > 0 
      ? doctorSpecializations 
      : doctorRegistration.specializations

    return hospitals.filter(hospital => 
      hospital.departments.some(dept => 
        allSpecializations.includes(dept)
      )
    )
  }

  // Refresh data when user changes
  useEffect(() => {
    if (user?.id) {
      // Refresh hospital associations
      const storedAssociations = getDoctorHospitals(user.id)
      setDoctorHospitals(storedAssociations)
      
      // Refresh availability
      const storedAvailability = getDoctorAvailability(user.id)
      setAvailability(storedAvailability)
      
      // Refresh consultations
      const storedConsultations = getDoctorConsultations(user.id)
      setConsultations(storedConsultations)
    }
  }, [user?.id, getDoctorHospitals, getDoctorAvailability, getDoctorConsultations])

  const handleStatusUpdate = (consultation) => {
    setSelectedConsultation(consultation)
    setStatusUpdate({
      status: consultation.status,
      notes: consultation.notes || '',
      prescription: consultation.prescription || ''
    })
    setShowStatusModal(true)
  }

  const updateConsultationStatus = () => {
    if (selectedConsultation && statusUpdate.status) {
      const updatedData = {
        status: statusUpdate.status,
        notes: statusUpdate.notes,
        prescription: statusUpdate.prescription
      }
      
      updateDoctorConsultation(user.id, selectedConsultation.id, updatedData)
      
      const updatedConsultations = consultations.map(consultation => 
        consultation.id === selectedConsultation.id 
          ? {
              ...consultation,
              ...updatedData
            }
          : consultation
      )
      setConsultations(updatedConsultations)
      setShowStatusModal(false)
      setSelectedConsultation(null)
      setStatusUpdate({ status: '', notes: '', prescription: '' })
      alert('Consultation status updated successfully!')
    }
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed':
        return 'badge-success'
      case 'pending':
        return 'badge-warning'
      case 'rejected':
        return 'badge-danger'
      case 'scheduled':
        return 'badge-info'
      default:
        return 'badge-secondary'
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Stethoscope size={20} /> },
    { id: 'registration', label: 'Registration', icon: <Users size={20} /> },
    { id: 'hospitals', label: 'Hospitals', icon: <Building2 size={20} /> },
    { id: 'availability', label: 'Availability', icon: <Calendar size={20} /> },
    { id: 'consultations', label: 'Consultations', icon: <Users size={20} /> },
    { id: 'earnings', label: 'Earnings', icon: <DollarSign size={20} /> }
  ]

  return (
    <div>
      {/* Header */}
      <div className="card">
        <div className="card-header">
          <Stethoscope className="card-icon" />
          <div>
            <h2 className="card-title">Doctor Dashboard</h2>
            <p style={{ color: '#666', margin: 0 }}>
              Welcome back, {user?.name || 'Doctor'}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Star size={16} style={{ color: '#ffc107' }} />
              <span style={{ fontSize: '0.9rem' }}>
                {user?.specializations?.join(', ') || 'Cardiology, Internal Medicine'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">₹{totalEarnings.toLocaleString()}</div>
          <div className="stat-label">Total Earnings</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalConsultations}</div>
          <div className="stat-label">Total Consultations</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{associatedHospitals}</div>
          <div className="stat-label">Associated Hospitals</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{upcomingAppointments}</div>
          <div className="stat-label">Upcoming Appointments</div>
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
                <h3 className="mb-2">Doctor Information</h3>
                <div className="mb-2">
                  <strong>Name:</strong> {user?.name || 'Dr. John Smith'}
                </div>
                <div className="mb-2">
                  <strong>Qualifications:</strong> {user?.qualifications || 'MBBS, MD (Cardiology)'}
                </div>
                <div className="mb-2">
                  <strong>Experience:</strong> {user?.experience || 8} years
                </div>
                <div className="mb-2">
                  <strong>Specializations:</strong> {user?.specializations?.join(', ') || 'Cardiology, Internal Medicine'}
                </div>
              </div>

              <div className="card">
                <h3 className="mb-2">Associated Hospitals</h3>
                {doctorHospitals.map(assoc => (
                  <div key={assoc.id} className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Building2 size={16} />
                    <div>
                      <div><strong>{assoc.hospitalName}</strong></div>
                                              <div style={{ fontSize: '0.875rem', color: '#666' }}>
                          <MapPin size={12} style={{ display: 'inline', marginRight: '0.25rem' }} />
                          {hospitals.find(h => h.id === assoc.hospitalId)?.location || 'Location not available'}
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card mt-3">
              <h3 className="mb-2">Recent Activity</h3>
              <div style={{ fontSize: '0.9rem' }}>
                <div className="mb-2">• Consultation completed with Jane Doe at City General Hospital</div>
                <div className="mb-2">• New availability slot added for Medical Center</div>
                <div className="mb-2">• Earnings: ₹300 from today's consultation</div>
                <div className="mb-2">• Upcoming appointment scheduled for tomorrow</div>
              </div>
            </div>
          </div>
        )}

        {/* Registration Tab */}
        {activeTab === 'registration' && (
          <div>
            <h3 className="mb-2">Doctor Registration</h3>
            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={doctorRegistration.name}
                  onChange={(e) => setDoctorRegistration({...doctorRegistration, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Qualifications</label>
                <input
                  type="text"
                  className="form-input"
                  value={doctorRegistration.qualifications}
                  onChange={(e) => setDoctorRegistration({...doctorRegistration, qualifications: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Specializations</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {availableSpecializations.map(spec => (
                    <span
                      key={spec}
                      className={`badge ${doctorRegistration.specializations.includes(spec) ? 'badge-success' : 'badge-secondary'}`}
                      onClick={() => toggleSpecialization(spec)}
                      style={{ cursor: 'pointer' }}
                    >
                      {spec}
                      {doctorRegistration.specializations.includes(spec) && <Check size={12} style={{ marginLeft: '0.5rem' }} />}
                      {!doctorRegistration.specializations.includes(spec) && <X size={12} style={{ marginLeft: '0.5rem' }} />}
                    </span>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Experience (years)</label>
                <input
                  type="number"
                  className="form-input"
                  value={doctorRegistration.experience}
                  onChange={(e) => setDoctorRegistration({...doctorRegistration, experience: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={doctorRegistration.email}
                  onChange={(e) => setDoctorRegistration({...doctorRegistration, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-input"
                  value={doctorRegistration.phone}
                  onChange={(e) => setDoctorRegistration({...doctorRegistration, phone: e.target.value})}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button className="btn btn-primary" onClick={handleDoctorRegistration}>
                Register Doctor
              </button>
              <button className="btn btn-secondary" onClick={() => setShowDoctorRegistration(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Hospitals Tab */}
        {activeTab === 'hospitals' && (
          <div>
            <h3 className="mb-2">Associate with Hospitals</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <button 
                className="btn btn-primary"
                onClick={() => setShowHospitalAssociation(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Plus size={16} />
                Associate with Hospital
              </button>
            </div>

            {showHospitalAssociation && (
              <div className="card mb-3">
                <h4 className="mb-2">Select Hospital</h4>
                <div className="form-group">
                  <label className="form-label">Hospital</label>
                  <select
                    className="form-select"
                    value={hospitalAssociation.hospital}
                    onChange={(e) => setHospitalAssociation({...hospitalAssociation, hospital: e.target.value})}
                  >
                    <option value="">Select hospital</option>
                    {getCompatibleHospitals().map(hospital => (
                      <option key={hospital.id} value={hospital.id}>
                        {hospital.name} - {hospital.departments.join(', ')}
                      </option>
                    ))}
                  </select>
                  {getCompatibleHospitals().length === 0 && (
                    <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                      <AlertTriangle size={16} style={{ display: 'inline', marginRight: '0.25rem' }} />
                      No compatible hospitals found. Please register with specializations that match available hospital departments.
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Consultation Fee (₹)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={hospitalAssociation.consultationFee}
                    onChange={(e) => setHospitalAssociation({...hospitalAssociation, consultationFee: e.target.value})}
                    placeholder="Enter consultation fee"
                  />
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button className="btn btn-primary" onClick={handleHospitalAssociation}>
                    Associate Hospital
                  </button>
                  <button className="btn btn-secondary" onClick={() => setShowHospitalAssociation(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Hospital</th>
                    <th>Consultation Fee</th>
                    <th>Specializations</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {doctorHospitals.map(assoc => (
                    <tr key={assoc.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Building2 size={16} />
                          {assoc.hospitalName}
                        </div>
                      </td>
                      <td>₹{assoc.consultationFee}</td>
                      <td>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {assoc.specializations.map(spec => (
                            <span key={spec} className="badge badge-info">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="btn btn-secondary" style={{ padding: '0.5rem' }}>
                            <Edit size={16} />
                          </button>
                          <button className="btn btn-danger" style={{ padding: '0.5rem' }}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Availability Tab */}
        {activeTab === 'availability' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3>Manage Availability</h3>
              <button 
                className="btn btn-primary"
                onClick={() => setShowAddAvailability(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Plus size={16} />
                Add Availability
              </button>
            </div>

            {showAddAvailability && (
              <div className="card mb-3">
                <h4 className="mb-2">Add New Availability Slot</h4>
                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">Hospital</label>
                    <select
                      className="form-select"
                      value={newAvailability.hospital}
                      onChange={(e) => {
                        const selectedHospital = doctorHospitals.find(h => h.hospitalName === e.target.value)
                        setNewAvailability({
                          ...newAvailability, 
                          hospital: e.target.value,
                          fee: selectedHospital ? selectedHospital.consultationFee.toString() : ''
                        })
                      }}
                    >
                      <option value="">Select hospital</option>
                      {doctorHospitals.map(assoc => (
                        <option key={assoc.id} value={assoc.hospitalName}>
                          {assoc.hospitalName} (₹{assoc.consultationFee})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={newAvailability.date}
                      onChange={(e) => setNewAvailability({...newAvailability, date: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Start Time</label>
                    <input
                      type="time"
                      className="form-input"
                      value={newAvailability.startTime}
                      onChange={(e) => setNewAvailability({...newAvailability, startTime: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">End Time</label>
                    <input
                      type="time"
                      className="form-input"
                      value={newAvailability.endTime}
                      onChange={(e) => setNewAvailability({...newAvailability, endTime: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Consultation Fee (₹)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={newAvailability.fee}
                      onChange={(e) => setNewAvailability({...newAvailability, fee: e.target.value})}
                      placeholder="Enter consultation fee"
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn btn-primary" onClick={handleAddAvailability}>
                    Add Availability
                  </button>
                  <button className="btn btn-secondary" onClick={() => setShowAddAvailability(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Hospital</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Fee</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {availability.map(slot => (
                    <tr key={slot.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Building2 size={16} />
                          {slot.hospital}
                        </div>
                      </td>
                      <td>{new Date(slot.date).toLocaleDateString()}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Clock size={16} />
                          {slot.startTime} - {slot.endTime}
                        </div>
                      </td>
                      <td>₹{slot.fee}</td>
                      <td>
                        <span className={`badge ${slot.status === 'available' ? 'badge-success' : 'badge-warning'}`}>
                          {slot.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="btn btn-secondary" style={{ padding: '0.5rem' }}>
                            <Edit size={16} />
                          </button>
                          <button className="btn btn-danger" style={{ padding: '0.5rem' }}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Consultations Tab */}
        {activeTab === 'consultations' && (
          <div>
            <h3 className="mb-2">Consultation History</h3>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Hospital</th>
                    <th>Date & Time</th>
                    <th>Fee</th>
                    <th>Status</th>
                    <th>Notes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {consultations.map(consultation => (
                    <tr key={consultation.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Users size={16} />
                          <strong>{consultation.patient}</strong>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Building2 size={16} />
                          {consultation.hospital}
                        </div>
                      </td>
                      <td>
                        {new Date(consultation.date).toLocaleDateString()} at {consultation.time}
                      </td>
                      <td>₹{consultation.fee}</td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(consultation.status)}`}>
                          {consultation.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {consultation.notes || 'No notes'}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            className="btn btn-primary" 
                            style={{ padding: '0.5rem' }}
                            onClick={() => handleStatusUpdate(consultation)}
                          >
                            <Edit size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Status Update Modal */}
            {showStatusModal && selectedConsultation && (
              <div className="modal-overlay" style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
              }}>
                <div className="card" style={{ maxWidth: '500px', width: '90%', maxHeight: '80vh', overflowY: 'auto' }}>
                  <h3 className="mb-2">Update Consultation Status</h3>
                  <div className="mb-2">
                    <strong>Patient:</strong> {selectedConsultation.patient}
                  </div>
                  <div className="mb-2">
                    <strong>Hospital:</strong> {selectedConsultation.hospital}
                  </div>
                  <div className="mb-2">
                    <strong>Date:</strong> {new Date(selectedConsultation.date).toLocaleDateString()} at {selectedConsultation.time}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select
                      className="form-input"
                      value={statusUpdate.status}
                      onChange={(e) => setStatusUpdate({...statusUpdate, status: e.target.value})}
                    >
                      <option value="">Select status</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Notes</label>
                    <textarea
                      className="form-input"
                      value={statusUpdate.notes}
                      onChange={(e) => setStatusUpdate({...statusUpdate, notes: e.target.value})}
                      placeholder="Enter consultation notes..."
                      rows="3"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Prescription</label>
                    <textarea
                      className="form-input"
                      value={statusUpdate.prescription}
                      onChange={(e) => setStatusUpdate({...statusUpdate, prescription: e.target.value})}
                      placeholder="Enter prescription details..."
                      rows="3"
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button className="btn btn-primary" onClick={updateConsultationStatus}>
                      Update Status
                    </button>
                    <button className="btn btn-secondary" onClick={() => setShowStatusModal(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Earnings Tab */}
        {activeTab === 'earnings' && (
          <div>
            <div className="grid grid-2">
              <div className="card">
                <h3 className="mb-2">Earnings Summary</h3>
                <div className="mb-2">
                  <strong>Total Earnings:</strong> ₹{totalEarnings.toLocaleString()}
                </div>
                <div className="mb-2">
                  <strong>This Month:</strong> ₹{(totalEarnings * 0.3).toLocaleString()}
                </div>
                <div className="mb-2">
                  <strong>Average per Consultation:</strong> ₹{(totalEarnings / totalConsultations).toFixed(0)}
                </div>
                <div className="mb-2">
                  <strong>Total Consultations:</strong> {totalConsultations}
                </div>
              </div>

              <div className="card">
                <h3 className="mb-2">Earnings by Hospital</h3>
                <div>
                  {doctorHospitals.map(assoc => (
                    <div key={assoc.id} className="mb-2">
                      <strong>{assoc.hospitalName}:</strong> ₹{(assoc.consultationFee * 0.6).toLocaleString()}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card mt-3">
              <h3 className="mb-2">Monthly Earnings Trend</h3>
              <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <p style={{ color: '#666' }}>Earnings chart would be displayed here</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Doctor 