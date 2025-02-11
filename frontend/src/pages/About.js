// src/pages/about.js
import React from 'react';
import backgroundImage from '../assets/about.jpg'; // Import the background image

export const About = () => {
  return (
    <div>
      {/* Full-width background with gradient and text */}
      <div
        style={{
          background: `linear-gradient(to right, rgba(63, 63, 63, 0.31), rgba(65, 22, 66, 0.26)), url(${backgroundImage})`, // Gradient on top of image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          color: 'white',
          width: '100%',
          padding: '50px 20px',
        }}
      >
        <div
          style={{
            padding: '30px',
            maxWidth: '1200px',
            margin: '0 auto',
            borderRadius: '10px',
          }}
        >
          <h1 className="text-center mb-4" style={{ fontSize: '2.5rem', color:'skyblue' }}>
            About PotalaVista
          </h1>
          <p className="lead" style={{ fontSize: '1.5rem' }}>
            Welcome to <strong>PotalaVista</strong>, your one-stop solution for managing online travel experiences. This platform is designed to connect travel enthusiasts with travel agencies and administrators, offering a seamless travel management experience.
          </p>

          <div className="row mt-5">
            <div className="col-md-6">
              <h3 style={{ fontSize: '1.75rem', color:'skyblue' }}>Purpose</h3>
              <ul style={{ fontSize: '1.25rem', lineHeight: '1.8' }}>
                <li>Admins can oversee the platform and ensure smooth operations.</li>
                <li>Travel agencies can list their packages and attract visitors.</li>
                <li>Visitors can explore, plan, and book their dream vacations.</li>
              </ul>
            </div>
            <div className="col-md-6">
              <h3 style={{ fontSize: '1.75rem', color:'skyblue' }}>Features</h3>
              <ol style={{ fontSize: '1.25rem', lineHeight: '1.8' }}>
                <li>Comprehensive travel package listings.</li>
                <li>Streamlined booking processes.</li>
                <li>User roles and management for admins, travel agencies, and visitors.</li>
                <li>Easy-to-navigate interface with clear workflows.</li>
              </ol>
            </div>
          </div>

          <h3 className="mt-5" style={{ fontSize: '1.75rem', color:'skyblue' }}>Connect with Us</h3>
          <p style={{ fontSize: '1.25rem' }}>
            Have questions or need help? Feel free to reach out to us:
          </p>
          <ul style={{ fontSize: '1.5rem' }}>
            <li><strong>Phone:</strong> +977 9841980994</li>
            <li><strong>Website:</strong> <a href="https://www.potalavista.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'white' }}>www.potalavista.com</a></li>
            <li><strong>Email:</strong> support@potalavista.com</li>
            <li><strong>Address:</strong> Patandhoka, Lalitpur, Nepal</li>
          </ul>
        </div>
      </div>

      {/* Full-width map */}
      <div>
        <h3 className="text-center mt-4 mb-3" style={{ fontSize: '2rem' }}>Our Location</h3>
        <iframe
          title="PotalaVista Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.4230614279725!2d85.3197000150612!3d27.68694498279912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb193cbdcdbaed%3A0x6dded3460123e5f2!2sPatandhoka%2C%20Lalitpur%2044600%2C%20Nepal!5e0!3m2!1sen!2snp!4v1234567890123!5m2!1sen!2snp"
          width="100%"
          height="620"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <p className="text-center mt-2" style={{ fontSize: '1.5rem', color:'maroon' }}>
        Thank you for visiting Potala Vista. We hope you have a great experience!
      </p>
    </div>
  );
};
