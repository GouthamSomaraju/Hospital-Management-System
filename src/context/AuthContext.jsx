import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user on app load
    const storedUser = localStorage.getItem('hospitalUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const register = (userData) => {
    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('hospitalUsers') || '[]')
    
    // Check if email already exists
    const emailExists = existingUsers.some(user => user.email === userData.email)
    if (emailExists) {
      throw new Error('User with this email already exists')
    }

    // Add new user to the list
    const newUser = {
      ...userData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }
    
    const updatedUsers = [...existingUsers, newUser]
    localStorage.setItem('hospitalUsers', JSON.stringify(updatedUsers))
    
    // Set current user
    setUser(newUser)
    localStorage.setItem('hospitalUser', JSON.stringify(newUser))
    
    return newUser
  }

  const login = (email, password, role) => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('hospitalUsers') || '[]')
    
    // Find user by email and role
    const user = users.find(u => u.email === email && u.role === role)
    
    if (!user) {
      throw new Error('User not found')
    }
    
    // Check password
    if (user.password !== password) {
      throw new Error('Invalid password')
    }
    
    // Remove password from user object before storing in session
    const { password: _, ...userWithoutPassword } = user
    
    // Set current user
    setUser(userWithoutPassword)
    localStorage.setItem('hospitalUser', JSON.stringify(userWithoutPassword))
    
    return userWithoutPassword
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('hospitalUser')
  }

  const updateUser = (updatedData) => {
    const newUserData = { ...user, ...updatedData }
    setUser(newUserData)
    localStorage.setItem('hospitalUser', JSON.stringify(newUserData))
    
    // Also update in the users list
    const users = JSON.parse(localStorage.getItem('hospitalUsers') || '[]')
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, ...updatedData } : u
    )
    localStorage.setItem('hospitalUsers', JSON.stringify(updatedUsers))
  }

  // Hospital Management Functions
  const getHospitals = () => {
    return JSON.parse(localStorage.getItem('hospitals') || '[]')
  }

  const addHospital = (hospitalData) => {
    const hospitals = getHospitals()
    const newHospital = {
      ...hospitalData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      adminId: user?.id
    }
    const updatedHospitals = [...hospitals, newHospital]
    localStorage.setItem('hospitals', JSON.stringify(updatedHospitals))
    return newHospital
  }

  const updateHospital = (hospitalId, updatedData) => {
    const hospitals = getHospitals()
    const updatedHospitals = hospitals.map(h => 
      h.id === hospitalId ? { ...h, ...updatedData } : h
    )
    localStorage.setItem('hospitals', JSON.stringify(updatedHospitals))
  }

  const deleteHospital = (hospitalId) => {
    const hospitals = getHospitals()
    const updatedHospitals = hospitals.filter(h => h.id !== hospitalId)
    localStorage.setItem('hospitals', JSON.stringify(updatedHospitals))
  }

  // Doctor Management Functions
  const getDoctors = () => {
    return JSON.parse(localStorage.getItem('doctors') || '[]')
  }

  const addDoctor = (doctorData) => {
    const doctors = getDoctors()
    const newDoctor = {
      ...doctorData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      adminId: user?.id
    }
    const updatedDoctors = [...doctors, newDoctor]
    localStorage.setItem('doctors', JSON.stringify(updatedDoctors))
    return newDoctor
  }

  const updateDoctor = (doctorId, updatedData) => {
    const doctors = getDoctors()
    const updatedDoctors = doctors.map(d => 
      d.id === doctorId ? { ...d, ...updatedData } : d
    )
    localStorage.setItem('doctors', JSON.stringify(updatedDoctors))
  }

  const deleteDoctor = (doctorId) => {
    const doctors = getDoctors()
    const updatedDoctors = doctors.filter(d => d.id !== doctorId)
    localStorage.setItem('doctors', JSON.stringify(updatedDoctors))
  }

  // Doctor-specific data management
  const getDoctorHospitals = (doctorId) => {
    return JSON.parse(localStorage.getItem(`doctorHospitals_${doctorId}`) || '[]')
  }

  const addDoctorHospital = (doctorId, hospitalData) => {
    const doctorHospitals = getDoctorHospitals(doctorId)
    const newAssociation = {
      ...hospitalData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }
    const updatedAssociations = [...doctorHospitals, newAssociation]
    localStorage.setItem(`doctorHospitals_${doctorId}`, JSON.stringify(updatedAssociations))
    return newAssociation
  }

  const updateDoctorHospital = (doctorId, associationId, updatedData) => {
    const doctorHospitals = getDoctorHospitals(doctorId)
    const updatedAssociations = doctorHospitals.map(assoc => 
      assoc.id === associationId ? { ...assoc, ...updatedData } : assoc
    )
    localStorage.setItem(`doctorHospitals_${doctorId}`, JSON.stringify(updatedAssociations))
  }

  const deleteDoctorHospital = (doctorId, associationId) => {
    const doctorHospitals = getDoctorHospitals(doctorId)
    const updatedAssociations = doctorHospitals.filter(assoc => assoc.id !== associationId)
    localStorage.setItem(`doctorHospitals_${doctorId}`, JSON.stringify(updatedAssociations))
  }

  const getDoctorAvailability = (doctorId) => {
    return JSON.parse(localStorage.getItem(`doctorAvailability_${doctorId}`) || '[]')
  }

  const addDoctorAvailability = (doctorId, availabilityData) => {
    const availability = getDoctorAvailability(doctorId)
    const newSlot = {
      ...availabilityData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }
    const updatedAvailability = [...availability, newSlot]
    localStorage.setItem(`doctorAvailability_${doctorId}`, JSON.stringify(updatedAvailability))
    return newSlot
  }

  const updateDoctorAvailability = (doctorId, slotId, updatedData) => {
    const availability = getDoctorAvailability(doctorId)
    const updatedSlots = availability.map(slot => 
      slot.id === slotId ? { ...slot, ...updatedData } : slot
    )
    localStorage.setItem(`doctorAvailability_${doctorId}`, JSON.stringify(updatedSlots))
  }

  const deleteDoctorAvailability = (doctorId, slotId) => {
    const availability = getDoctorAvailability(doctorId)
    const updatedSlots = availability.filter(slot => slot.id !== slotId)
    localStorage.setItem(`doctorAvailability_${doctorId}`, JSON.stringify(updatedSlots))
  }

  const getDoctorConsultations = (doctorId) => {
    return JSON.parse(localStorage.getItem(`doctorConsultations_${doctorId}`) || '[]')
  }

  const addDoctorConsultation = (doctorId, consultationData) => {
    const consultations = getDoctorConsultations(doctorId)
    const newConsultation = {
      ...consultationData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }
    const updatedConsultations = [...consultations, newConsultation]
    localStorage.setItem(`doctorConsultations_${doctorId}`, JSON.stringify(updatedConsultations))
    return newConsultation
  }

  const updateDoctorConsultation = (doctorId, consultationId, updatedData) => {
    const consultations = getDoctorConsultations(doctorId)
    const updatedConsultationsList = consultations.map(consultation => 
      consultation.id === consultationId ? { ...consultation, ...updatedData } : consultation
    )
    localStorage.setItem(`doctorConsultations_${doctorId}`, JSON.stringify(updatedConsultationsList))
  }

  const value = {
    user,
    register,
    login,
    logout,
    updateUser,
    // Hospital management
    getHospitals,
    addHospital,
    updateHospital,
    deleteHospital,
    // Doctor management
    getDoctors,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    // Doctor-specific data management
    getDoctorHospitals,
    addDoctorHospital,
    updateDoctorHospital,
    deleteDoctorHospital,
    getDoctorAvailability,
    addDoctorAvailability,
    updateDoctorAvailability,
    deleteDoctorAvailability,
    getDoctorConsultations,
    addDoctorConsultation,
    updateDoctorConsultation,
    loading,
    isAuthenticated: !!user,
    isHospitalAdmin: user?.role === 'hospital_admin',
    isDoctor: user?.role === 'doctor',
    isPatient: user?.role === 'patient'
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 