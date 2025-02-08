// src/components/Navbar.js
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export const Navbar = () => (
  <nav className="navbar navbar-expand-lg fixed-top" style={{
    background: 'linear-gradient(to right,rgb(145, 224, 212),rgb(99, 9, 111))',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    padding: '4px 0'
  }}>
    <div className="container">
      <Link className="navbar-brand" to="/">
        <img 
          src={logo} 
          alt="TravelWorld Logo" 
          height="40" 
          style={{ objectFit: 'contain' }}
        />
      </Link>
      <div className="navbar-nav ms-auto">
        <Link 
          className="nav-link" 
          to="/"
          style={{
            color: 'rgba(255,255,255,0.9)',
            margin: '0 10px',
            fontSize: '15px',
            fontWeight: '500',
            transition: 'all 0.3s ease',
            padding: '8px 15px',
            borderRadius: '4px'
          }}
          onMouseEnter={e => {
            e.target.style.color = '#ffffff';
            e.target.style.background = 'rgba(255,255,255,0.1)';
          }}
          onMouseLeave={e => {
            e.target.style.color = 'rgba(255,255,255,0.9)';
            e.target.style.background = 'transparent';
          }}
        >HOME</Link>
        <Link 
          className="nav-link" 
          to="/about"
          style={{
            color: 'rgba(255,255,255,0.9)',
            margin: '0 10px',
            fontSize: '15px',
            fontWeight: '500',
            transition: 'all 0.3s ease',
            padding: '8px 15px',
            borderRadius: '4px'
          }}
          onMouseEnter={e => {
            e.target.style.color = '#ffffff';
            e.target.style.background = 'rgba(255,255,255,0.1)';
          }}
          onMouseLeave={e => {
            e.target.style.color = 'rgba(255,255,255,0.9)';
            e.target.style.background = 'transparent';
          }}
        >ABOUT</Link>
         <Link 
          className="nav-link" 
          to="/explore"
          style={{
            color: 'rgba(255,255,255,0.9)',
            margin: '0 10px',
            fontSize: '15px',
            fontWeight: '500',
            transition: 'all 0.3s ease',
            padding: '8px 15px',
            borderRadius: '4px'
          }}
          onMouseEnter={e => {
            e.target.style.color = '#ffffff';
            e.target.style.background = 'rgba(255,255,255,0.1)';
          }}
          onMouseLeave={e => {
            e.target.style.color = 'rgba(255,255,255,0.9)';
            e.target.style.background = 'transparent';
          }}
        >EXPLORE</Link>
        <Link 
          className="nav-link" 
          to="/packages"
          style={{
            color: 'rgba(255,255,255,0.9)',
            margin: '0 10px',
            fontSize: '15px',
            fontWeight: '500',
            transition: 'all 0.3s ease',
            padding: '8px 15px',
            borderRadius: '4px'
          }}
          onMouseEnter={e => {
            e.target.style.color = '#ffffff';
            e.target.style.background = 'rgba(255,255,255,0.1)';
          }}
          onMouseLeave={e => {
            e.target.style.color = 'rgba(255,255,255,0.9)';
            e.target.style.background = 'transparent';
          }}
        >PACKAGES</Link>
        <Link 
          className="nav-link" 
          to="/agency/login"
          style={{
            color: 'rgba(255,255,255,0.9)',
            margin: '0 10px',
            fontSize: '15px',
            fontWeight: '500',
            transition: 'all 0.3s ease',
            padding: '8px 15px',
            borderRadius: '4px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
          onMouseEnter={e => {
            e.target.style.color = '#ffffff';
            e.target.style.background = 'rgba(255,255,255,0.1)';
            e.target.style.border = '1px solid rgba(255,255,255,0.4)';
          }}
          onMouseLeave={e => {
            e.target.style.color = 'rgba(255,255,255,0.9)';
            e.target.style.background = 'transparent';
            e.target.style.border = '1px solid rgba(255,255,255,0.2)';
          }}
        >AGENCY LOGIN</Link>
        <Link 
          className="nav-link" 
          to="/visitor/login"
          style={{
            color: 'rgba(255,255,255,0.9)',
            margin: '0 10px',
            fontSize: '15px',
            fontWeight: '500',
            transition: 'all 0.3s ease',
            padding: '8px 15px',
            borderRadius: '4px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
          onMouseEnter={e => {
            e.target.style.color = '#ffffff';
            e.target.style.background = 'rgba(255,255,255,0.1)';
            e.target.style.border = '1px solid rgba(255,255,255,0.4)';
          }}
          onMouseLeave={e => {
            e.target.style.color = 'rgba(255,255,255,0.9)';
            e.target.style.background = 'transparent';
            e.target.style.border = '1px solid rgba(255,255,255,0.2)';
          }}
        >VISITOR LOGIN</Link>
      </div>
    </div>
  </nav>
);