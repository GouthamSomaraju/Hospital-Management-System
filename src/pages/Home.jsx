import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Building2, Stethoscope, Heart, Users, Calendar, DollarSign, Shield } from 'lucide-react'

const Home = () => {
  const { isAuthenticated } = useAuth()

  const features = [
    {
      icon: <Building2 size={48} />,
      title: 'Hospital Management',
      description: 'Comprehensive hospital registration and department management system'
    },
    {
      icon: <Stethoscope size={48} />,
      title: 'Doctor Portal',
      description: 'Doctor registration, availability management, and consultation tracking'
    },
    {
      icon: <Heart size={48} />,
      title: 'Patient Care',
      description: 'Easy appointment booking and consultation history tracking'
    },
    {
      icon: <Calendar size={48} />,
      title: 'Appointment System',
      description: 'Seamless appointment booking with real-time availability'
    },
    {
      icon: <DollarSign size={48} />,
      title: 'Revenue Tracking',
      description: 'Automated revenue sharing and financial reporting'
    },
    {
      icon: <Shield size={48} />,
      title: 'Secure Platform',
      description: 'Role-based access control and data security'
    }
  ]

  return (
    <div>
   
      <div className="hero">
        <h1>Hospital & Appointment Management System</h1>
        <p>
          Streamline healthcare operations with our comprehensive management platform. 
          Connect hospitals, doctors, and patients in one integrated system.
        </p>
        
        {!isAuthenticated && (
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">
              <Users size={20} />
              Get Started
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Sign In
            </Link>
          </div>
        )}
      </div>

  
      <div className="card">
        <div className="card-header">
          <Shield className="card-icon" />
          <h2 className="card-title">System Features</h2>
        </div>
        
        <div className="grid grid-3">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-3">
              <div className="mb-2" style={{ color: '#667eea' }}>
                {feature.icon}
              </div>
              <h3 className="mb-1">{feature.title}</h3>
              <p style={{ color: '#666' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      
      <div className="grid grid-2">
      
        <div className="card">
          <div className="card-header">
            <Building2 className="card-icon" />
            <h3 className="card-title">For Hospital Administrators</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li className="mb-2">✓ Register and manage hospitals</li>
            <li className="mb-2">✓ Create and organize departments</li>
            <li className="mb-2">✓ View associated doctors and their schedules</li>
            <li className="mb-2">✓ Track consultations and revenue</li>
            <li className="mb-2">✓ Generate comprehensive reports</li>
          </ul>
        </div>

        
        <div className="card">
          <div className="card-header">
            <Stethoscope className="card-icon" />
            <h3 className="card-title">For Doctors</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li className="mb-2">✓ Register with qualifications and specializations</li>
            <li className="mb-2">✓ Associate with multiple hospitals</li>
            <li className="mb-2">✓ Manage availability and consultation fees</li>
            <li className="mb-2">✓ Track earnings and consultations</li>
            <li className="mb-2">✓ View patient appointment history</li>
          </ul>
        </div>

        
        <div className="card">
          <div className="card-header">
            <Heart className="card-icon" />
            <h3 className="card-title">For Patients</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li className="mb-2">✓ Easy registration with unique ID</li>
            <li className="mb-2">✓ Search doctors by specialization</li>
            <li className="mb-2">✓ Book appointments with available slots</li>
            <li className="mb-2">✓ View consultation history</li>
            <li className="mb-2">✓ Track medical appointments across hospitals</li>
          </ul>
        </div>

       
        <div className="card">
          <div className="card-header">
            <DollarSign className="card-icon" />
            <h3 className="card-title">Revenue Management</h3>
          </div>
          <div className="text-center">
            <div className="stat-number mb-2">60% / 40%</div>
            <p className="mb-2">Revenue sharing model</p>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              60% goes to doctors, 40% to hospitals for every consultation
            </p>
          </div>
        </div>
      </div>

      
      {!isAuthenticated && (
        <div className="card text-center">
          <h2 className="mb-2">Ready to Get Started?</h2>
          <p className="mb-3" style={{ color: '#666' }}>
            Join our platform and experience seamless healthcare management
          </p>
          <Link to="/register" className="btn btn-primary">
            <Users size={20} />
            Register Now
          </Link>
        </div>
      )}
    </div>
  )
}

export default Home 