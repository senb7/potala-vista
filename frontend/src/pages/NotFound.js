// NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '150px',
    height: '620px'
  },
  link: {
    display: 'inline-block',
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#dd7973',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
  }
};

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1>404 - Page Not Found</h1>
      <h5>The page you are looking for does not exist.</h5>
      <Link to="/" style={styles.link}>Go back to Home</Link>
    </div>
  );
};



export default NotFound;
