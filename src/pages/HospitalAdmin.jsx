import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { 
  Building2, 
  Users, 
  DollarSign, 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  Stethoscope,
  MapPin,
  Phone,
  Mail,
  Check,
  X
} from 'lucide-react'

const HospitalAdmin = () => {
  const { user, getHospitals, addHospital, deleteHospital, getDoctors, addDoctor, deleteDoctor } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  const [departments, setDepartments] = useState([
    { id: 1, name: 'Cardiology', doctors: 3, consultations: 45 },
    { id: 2, name: 'Orthopedics', doctors: 2, consultations: 32 },
    { id: 3, name: 'Pediatrics', doctors: 4, consultations: 67 }
  ])

  const [allDoctors, setAllDoctors] = useState([
    { id: 1, name: 'Dr. John Smith', specialization: 'Cardiology', experience: 8, available: true },
    { id: 2, name: 'Dr. Sarah Johnson', specialization: 'Orthopedics', experience: 12, available: true },
    { id: 3, name: 'Dr. Michael Brown', specialization: 'Pediatrics', experience: 6, available: true },
    { id: 4, name: 'Dr. Emily Davis', specialization: 'Cardiology', experience: 10, available: true },
    { id: 5, name: 'Dr. Robert Wilson', specialization: 'Orthopedics', experience: 15, available: true },
    { id: 6, name: 'Dr. Lisa Anderson', specialization: 'Pediatrics', experience: 9, available: true }
  ])

  const [allConsultants, setAllConsultants] = useState([
    { id: 1, name: 'Dr. James Miller', specialization: 'Cardiology', experience: 20, available: true },
    { id: 2, name: 'Dr. Patricia Taylor', specialization: 'Orthopedics', experience: 18, available: true },
    { id: 3, name: 'Dr. David Garcia', specialization: 'Pediatrics', experience: 16, available: true },
    { id: 4, name: 'Dr. Jennifer Martinez', specialization: 'Neurology', experience: 14, available: true },
    { id: 5, name: 'Dr. Christopher Lee', specialization: 'Cardiology', experience: 22, available: true }
  ])

  // Load hospitals from localStorage
  const [hospitals, setHospitals] = useState(() => {
    const storedHospitals = getHospitals()
    if (storedHospitals.length === 0) {
      // Initialize with default data if no hospitals exist
      const defaultHospitals = [
        {
          id: 1,
          name: 'City General Hospital',
          location: 'Mumbai, Maharashtra',
          contact: '+91-99999-11111',
          email: 'admin@citygeneral.com',
          departments: 5,
          doctors: 12,
          consultations: 89
        },
        {
          id: 2,
          name: 'Metro Medical Center',
          location: 'Delhi, NCR',
          contact: '+91-99999-22222',
          email: 'admin@metromedical.com',
          departments: 3,
          doctors: 8,
          consultations: 56
        }
      ]
      // Save default hospitals to localStorage
      defaultHospitals.forEach(hospital => {
        addHospital(hospital)
      })
      return defaultHospitals
    }
    return storedHospitals
  })

  // Load doctors from localStorage
  const [doctors, setDoctors] = useState(() => {
    const storedDoctors = getDoctors()
    if (storedDoctors.length === 0) {
      // Initialize with default data if no doctors exist
      const defaultDoctors = [
        { 
          id: 1, 
          name: 'Dr. John Smith', 
          specialization: 'Cardiology', 
          experience: 8, 
          consultations: 15, 
          revenue: 4500,
          assignedHospital: 1
        },
        { 
          id: 2, 
          name: 'Dr. Sarah Johnson', 
          specialization: 'Orthopedics', 
          experience: 12, 
          consultations: 22, 
          revenue: 6600,
          assignedHospital: 2
        }
      ]
      // Save default doctors to localStorage
      defaultDoctors.forEach(doctor => {
        addDoctor(doctor)
      })
      return defaultDoctors
    }
    return storedDoctors
  })



  const [showAddDepartment, setShowAddDepartment] = useState(false)
  const [newDepartment, setNewDepartment] = useState({ 
    name: '', 
    description: '',
    doctors: '',
    consultations: ''
  })

  const [showAddDoctor, setShowAddDoctor] = useState(false)
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialization: '',
    experience: '',
    consultations: '',
    revenue: '',
    assignedHospital: ''
  })

  const [showRegisterHospital, setShowRegisterHospital] = useState(false)
  const [hospital, setHospital] = useState({ 
    name: '', 
    location: '',
    departments: '',
    doctors: '',
    consultations: ''
  })

  const totalConsultations = 144
  const totalRevenue = 43200
  const totalDoctors = 9
  const totalDepartments = departments.length
  const totalHospitals = hospitals.length

  const handleAddDepartment = () => {
    if (newDepartment.name.trim()) {
      const department = {
        id: Date.now(),
        name: newDepartment.name,
        description: newDepartment.description,
        doctors: parseInt(newDepartment.doctors) || 0,
        consultations: parseInt(newDepartment.consultations) || 0
      }
      setDepartments([...departments, department])
      setNewDepartment({ name: '', description: '', doctors: '', consultations: '' })
      setShowAddDepartment(false)
    }
  }

  const handleDeleteDepartment = (id) => {
    setDepartments(departments.filter(dept => dept.id !== id))
  }

  const handleRegisterHospital = () => {
    if (hospital.name.trim() && hospital.location.trim()) {
      const newHospital = {
        name: hospital.name,
        location: hospital.location,
        contact: '+91-99999-' + Math.floor(Math.random() * 90000 + 10000),
        email: 'admin@' + hospital.name.toLowerCase().replace(/\s+/g, '') + '.com',
        departments: parseInt(hospital.departments) || 0,
        doctors: parseInt(hospital.doctors) || 0,
        consultations: parseInt(hospital.consultations) || 0
      }
      
      const addedHospital = addHospital(newHospital)
      setHospitals([...hospitals, addedHospital])
      setHospital({ name: '', location: '', departments: '', doctors: '', consultations: '' })
      setShowRegisterHospital(false)
    }
  }

  const handleDeleteHospital = (id) => {
    deleteHospital(id)
    setHospitals(hospitals.filter(hosp => hosp.id !== id))
  }

  const handleAddDoctor = () => {
    if (newDoctor.name.trim() && newDoctor.specialization) {
      const doctor = {
        name: newDoctor.name,
        specialization: newDoctor.specialization,
        experience: parseInt(newDoctor.experience) || 0,
        consultations: parseInt(newDoctor.consultations) || 0,
        revenue: parseInt(newDoctor.revenue) || 0,
        assignedHospital: newDoctor.assignedHospital ? parseInt(newDoctor.assignedHospital) : null
      }
      
      const addedDoctor = addDoctor(doctor)
      setDoctors([...doctors, addedDoctor])
      setNewDoctor({
        name: '',
        specialization: '',
        experience: '',
        consultations: '',
        revenue: '',
        assignedHospital: ''
      })
      setShowAddDoctor(false)
    }
  }

  const handleDeleteDoctor = (id) => {
    deleteDoctor(id)
    setDoctors(doctors.filter(doctor => doctor.id !== id))
  }

  // Refresh data from localStorage when component mounts or data changes
  useEffect(() => {
    const refreshData = () => {
      setHospitals(getHospitals())
      setDoctors(getDoctors())
    }
    
    // Refresh on mount
    refreshData()
    
    // Listen for storage changes
    const handleStorageChange = () => {
      refreshData()
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [getHospitals, getDoctors])



  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Building2 size={20} /> },
    { id: 'hospitals', label: 'Hospitals', icon: <Building2 size={20} /> },
    { id: 'departments', label: 'Departments', icon: <Users size={20} /> },
    { id: 'doctors', label: 'Doctors', icon: <Stethoscope size={20} /> },
    { id: 'revenue', label: 'Revenue', icon: <DollarSign size={20} /> }
  ]

  return (
    <div>
      {/* Header */}
      <div className="card">
        <div className="card-header">
          <Building2 className="card-icon" />
          <div>
            <h2 className="card-title">Hospital Admin Dashboard</h2>
            <p style={{ color: '#666', margin: 0 }}>
              Welcome back, {user?.name || 'Administrator'}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{totalConsultations}</div>
          <div className="stat-label">Total Consultations</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">₹{totalRevenue.toLocaleString()}</div>
          <div className="stat-label">Total Revenue</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalDoctors}</div>
          <div className="stat-label">Associated Doctors</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalDepartments}</div>
          <div className="stat-label">Departments</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalHospitals}</div>
          <div className="stat-label">Registered Hospitals</div>
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
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
              <button className="btn btn-success" onClick={() => setShowRegisterHospital(true)}>
                <Plus size={16} />
                Register New Hospital
              </button>
            </div>

            {showRegisterHospital && (
              <div className="card mb-3">
                <h4 className="mb-2">Register New Hospital</h4>
                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">Hospital Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={hospital.name}
                      onChange={(e) => setHospital({ ...hospital, name: e.target.value })}
                      placeholder="Enter hospital name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-input"
                      value={hospital.location}
                      onChange={(e) => setHospital({ ...hospital, location: e.target.value })}
                      placeholder="Enter hospital location"
                    />
                  </div>
                </div>

                <div className="grid grid-3">
                  <div className="form-group">
                    <label className="form-label">Number of Departments</label>
                    <input
                      type="number"
                      className="form-input"
                      value={hospital.departments}
                      onChange={(e) => setHospital({ ...hospital, departments: e.target.value })}
                      placeholder="Enter number of departments"
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Number of Doctors</label>
                    <input
                      type="number"
                      className="form-input"
                      value={hospital.doctors}
                      onChange={(e) => setHospital({ ...hospital, doctors: e.target.value })}
                      placeholder="Enter number of doctors"
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Number of Consultations</label>
                    <input
                      type="number"
                      className="form-input"
                      value={hospital.consultations}
                      onChange={(e) => setHospital({ ...hospital, consultations: e.target.value })}
                      placeholder="Enter number of consultations"
                      min="0"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn btn-primary" onClick={handleRegisterHospital}>
                    Register Hospital
                  </button>
                  <button className="btn btn-secondary" onClick={() => setShowRegisterHospital(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-2">
              <div className="card">
                <h3 className="mb-2">Registered Hospitals</h3>
                {hospitals.length > 0 ? (
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {hospitals.map(hosp => (
                                             <div key={hosp.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1rem' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                           <Building2 size={16} />
                           <span style={{ fontWeight: 'bold' }}>{hosp.name}</span>
                         </div>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                           <MapPin size={16} />
                           <span>{hosp.location}</span>
                         </div>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                           <Phone size={16} />
                           <span>{hosp.contact}</span>
                         </div>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                           <Mail size={16} />
                           <span>{hosp.email}</span>
                         </div>
                         <div style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
                           <div><strong>Departments:</strong> {hosp.departments}</div>
                           <div><strong>Doctors:</strong> {hosp.doctors}</div>
                           <div><strong>Consultations:</strong> {hosp.consultations}</div>
                         </div>
                       </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: '#666' }}>No hospitals registered yet. Please register a hospital.</p>
                )}
              </div>

              <div className="card">
                <h3 className="mb-2">Recent Activity</h3>
                <div style={{ fontSize: '0.9rem' }}>
                  <div className="mb-2">• Dr. Sarah Johnson completed 3 consultations today</div>
                  <div className="mb-2">• New patient registration: Jane Doe</div>
                  <div className="mb-2">• Revenue generated: ₹2,400 from today's consultations</div>
                  <div className="mb-2">• Department update: Pediatrics schedule modified</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hospitals Tab */}
        {activeTab === 'hospitals' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3>Registered Hospitals</h3>
              <button 
                className="btn btn-primary"
                onClick={() => setShowRegisterHospital(true)}
              >
                <Plus size={16} />
                Register New Hospital
              </button>
            </div>

            {showRegisterHospital && (
              <div className="card mb-3">
                <h4 className="mb-2">Register New Hospital</h4>
                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">Hospital Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={hospital.name}
                      onChange={(e) => setHospital({ ...hospital, name: e.target.value })}
                      placeholder="Enter hospital name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-input"
                      value={hospital.location}
                      onChange={(e) => setHospital({ ...hospital, location: e.target.value })}
                      placeholder="Enter hospital location"
                    />
                  </div>
                </div>

                <div className="grid grid-3">
                  <div className="form-group">
                    <label className="form-label">Number of Departments</label>
                    <input
                      type="number"
                      className="form-input"
                      value={hospital.departments}
                      onChange={(e) => setHospital({ ...hospital, departments: e.target.value })}
                      placeholder="Enter number of departments"
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Number of Doctors</label>
                    <input
                      type="number"
                      className="form-input"
                      value={hospital.doctors}
                      onChange={(e) => setHospital({ ...hospital, doctors: e.target.value })}
                      placeholder="Enter number of doctors"
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Number of Consultations</label>
                    <input
                      type="number"
                      className="form-input"
                      value={hospital.consultations}
                      onChange={(e) => setHospital({ ...hospital, consultations: e.target.value })}
                      placeholder="Enter number of consultations"
                      min="0"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn btn-primary" onClick={handleRegisterHospital}>
                    Register Hospital
                  </button>
                  <button className="btn btn-secondary" onClick={() => setShowRegisterHospital(false)}>
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
                     <th>Location</th>
                     <th>Contact</th>
                     <th>Email</th>
                     <th>Departments</th>
                     <th>Doctors</th>
                     <th>Consultations</th>
                     <th>Actions</th>
                   </tr>
                 </thead>
                <tbody>
                  {hospitals.map(hosp => (
                    <tr key={hosp.id}>
                      <td>
                        <div>
                          <strong>{hosp.name}</strong>
                        </div>
                      </td>
                      <td>{hosp.location}</td>
                                             <td>{hosp.contact}</td>
                       <td>{hosp.email}</td>
                       <td>{hosp.departments}</td>
                       <td>{hosp.doctors}</td>
                       <td>{hosp.consultations}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="btn btn-secondary" style={{ padding: '0.5rem' }}>
                            <Edit size={16} />
                          </button>
                          <button 
                            className="btn btn-danger" 
                            style={{ padding: '0.5rem' }}
                            onClick={() => handleDeleteHospital(hosp.id)}
                          >
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

        {/* Departments Tab */}
        {activeTab === 'departments' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3>Hospital Departments</h3>
              <button 
                className="btn btn-primary"
                onClick={() => setShowAddDepartment(true)}
              >
                <Plus size={16} />
                Add Department
              </button>
            </div>

            {showAddDepartment && (
              <div className="card mb-3">
                <h4 className="mb-2">Add New Department</h4>
                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">Department Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newDepartment.name}
                      onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
                      placeholder="Enter department name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newDepartment.description}
                      onChange={(e) => setNewDepartment({...newDepartment, description: e.target.value})}
                      placeholder="Enter description"
                    />
                  </div>
                </div>

                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">Number of Doctors</label>
                    <input
                      type="number"
                      className="form-input"
                      value={newDepartment.doctors}
                      onChange={(e) => setNewDepartment({...newDepartment, doctors: e.target.value})}
                      placeholder="Enter number of doctors"
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Number of Consultations</label>
                    <input
                      type="number"
                      className="form-input"
                      value={newDepartment.consultations}
                      onChange={(e) => setNewDepartment({...newDepartment, consultations: e.target.value})}
                      placeholder="Enter number of consultations"
                      min="0"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn btn-primary" onClick={handleAddDepartment}>
                    Add Department
                  </button>
                  <button className="btn btn-secondary" onClick={() => setShowAddDepartment(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Department</th>
                    <th>Doctors</th>
                    <th>Consultations</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map(dept => (
                    <tr key={dept.id}>
                      <td>
                        <div>
                          <strong>{dept.name}</strong>
                          {dept.description && (
                            <div style={{ fontSize: '0.875rem', color: '#666' }}>
                              {dept.description}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>{dept.doctors}</td>
                      <td>{dept.consultations}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="btn btn-secondary" style={{ padding: '0.5rem' }}>
                            <Edit size={16} />
                          </button>
                          <button 
                            className="btn btn-danger" 
                            style={{ padding: '0.5rem' }}
                            onClick={() => handleDeleteDepartment(dept.id)}
                          >
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

        {/* Doctors Tab */}
        {activeTab === 'doctors' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3>Associated Doctors</h3>
              <button 
                className="btn btn-primary"
                onClick={() => setShowAddDoctor(true)}
              >
                <Plus size={16} />
                Add New Doctor
              </button>
            </div>

            {showAddDoctor && (
              <div className="card mb-3">
                <h4 className="mb-2">Add New Doctor</h4>
                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">Doctor Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newDoctor.name}
                      onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
                      placeholder="Enter doctor name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Specialization</label>
                    <select
                      className="form-input"
                      value={newDoctor.specialization}
                      onChange={(e) => setNewDoctor({...newDoctor, specialization: e.target.value})}
                    >
                      <option value="">Select specialization</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Dermatology">Dermatology</option>
                      <option value="General Medicine">General Medicine</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-3">
                  <div className="form-group">
                    <label className="form-label">Experience (Years)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={newDoctor.experience}
                      onChange={(e) => setNewDoctor({...newDoctor, experience: e.target.value})}
                      placeholder="Enter experience in years"
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Consultations</label>
                    <input
                      type="number"
                      className="form-input"
                      value={newDoctor.consultations}
                      onChange={(e) => setNewDoctor({...newDoctor, consultations: e.target.value})}
                      placeholder="Enter number of consultations"
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Revenue Generated (₹)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={newDoctor.revenue}
                      onChange={(e) => setNewDoctor({...newDoctor, revenue: e.target.value})}
                      placeholder="Enter revenue generated"
                      min="0"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Assign to Hospital</label>
                  <select
                    className="form-input"
                    value={newDoctor.assignedHospital}
                    onChange={(e) => setNewDoctor({...newDoctor, assignedHospital: e.target.value})}
                  >
                    <option value="">Select hospital</option>
                    {hospitals.map(hosp => (
                      <option key={hosp.id} value={hosp.id}>{hosp.name}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn btn-primary" onClick={handleAddDoctor}>
                    Add Doctor
                  </button>
                  <button className="btn btn-secondary" onClick={() => setShowAddDoctor(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Doctor</th>
                    <th>Specialization</th>
                    <th>Experience</th>
                    <th>Consultations</th>
                    <th>Revenue Generated</th>
                    <th>Assigned Hospital</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map(doctor => (
                    <tr key={doctor.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Stethoscope size={16} />
                          <strong>{doctor.name}</strong>
                        </div>
                      </td>
                      <td>{doctor.specialization}</td>
                      <td>{doctor.experience} years</td>
                      <td>{doctor.consultations}</td>
                      <td>₹{doctor.revenue.toLocaleString()}</td>
                      <td>
                        {doctor.assignedHospital ? 
                          hospitals.find(h => h.id === parseInt(doctor.assignedHospital))?.name || 'Unknown' 
                          : 'Not Assigned'
                        }
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="btn btn-secondary" style={{ padding: '0.5rem' }}>
                            <Edit size={16} />
                          </button>
                          <button 
                            className="btn btn-danger" 
                            style={{ padding: '0.5rem' }}
                            onClick={() => handleDeleteDoctor(doctor.id)}
                          >
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

        {/* Revenue Tab */}
        {activeTab === 'revenue' && (
          <div>
            <div className="grid grid-2">
              <div className="card">
                <h3 className="mb-2">Revenue Summary</h3>
                <div className="mb-2">
                  <strong>Total Revenue:</strong> ₹{totalRevenue.toLocaleString()}
                </div>
                <div className="mb-2">
                  <strong>Hospital Share (40%):</strong> ₹{(totalRevenue * 0.4).toLocaleString()}
                </div>
                <div className="mb-2">
                  <strong>Doctors Share (60%):</strong> ₹{(totalRevenue * 0.6).toLocaleString()}
                </div>
                <div className="mb-2">
                  <strong>Average per Consultation:</strong> ₹{(totalRevenue / totalConsultations).toFixed(0)}
                </div>
              </div>

              <div className="card">
                <h3 className="mb-2">Revenue by Department</h3>
                <div>
                  <div className="mb-2">
                    <strong>Cardiology:</strong> ₹{(totalRevenue * 0.35).toLocaleString()}
                  </div>
                  <div className="mb-2">
                    <strong>Orthopedics:</strong> ₹{(totalRevenue * 0.25).toLocaleString()}
                  </div>
                  <div className="mb-2">
                    <strong>Pediatrics:</strong> ₹{(totalRevenue * 0.40).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="card mt-3">
              <h3 className="mb-2">Monthly Revenue Trend</h3>
              <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <p style={{ color: '#666' }}>Revenue chart would be displayed here</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HospitalAdmin
