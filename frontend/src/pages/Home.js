// src/pages/Home.js
import { HeroCarousel } from '../components/HeroCarousel';
import { CheckCircle } from 'react-feather';
import person1 from '../assets/person1.jpeg';
import person2 from '../assets/person2.jpg';
import person3 from '../assets/person3.jpg';
import { Footer } from '../components/Footer.js';

export const Home = () => (
  <div style={styles.pageBackground}>
    <HeroCarousel />
    
    {/* Slogan Section */}
    <div style={styles.sloganContainer}>
      <h1 style={styles.sloganText}>Connecting Travelers with Trusted Service Providers</h1>
      <h5 style={styles.sloganText}>Discover, Book, and Experience the best travel packages effortlessly.</h5>
    </div>

    {/* Why Choose Potala Vista? */}
    <div className="container mt-5 text-center" style={styles.whyChooseContainer}>
      <h2 className="mb-4">Why Choose Potala Vista?</h2>
      <div style={styles.featuresContainer}>
        <div style={styles.featureItem}>
          <CheckCircle size={30} color="#4CAF50" />
          <p><strong>Trusted Service Providers</strong> – Verified agencies offering top travel experiences.</p>
        </div>
        <div style={styles.featureItem}>
          <CheckCircle size={30} color="#4CAF50" />
          <p><strong>Seamless Booking</strong> – Hassle-free booking process with secure payments.</p>
        </div>
        <div style={styles.featureItem}>
          <CheckCircle size={30} color="#4CAF50" />
          <p><strong>Personalized Trips</strong> – Tailored travel itineraries to suit your needs.</p>
        </div>
      </div>
    </div>

    {/* Testimonials Section */}
    <div className="container mt-5" style={styles.testimonialsContainer}>
      <h2 className="text-center mb-4">What Our Users Say</h2>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div style={styles.testimonialCard}>
            <img src={person3} alt="Amrit Pun" style={styles.testimonialImage} />
            <div style={styles.testimonialContent}>
              <p>"Potala Vista made our trip planning so easy! Highly recommend!"</p>
              <h5>- Amrit Pun</h5>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div style={styles.testimonialCard}>
            <img src={person2} alt="Sarah L." style={styles.testimonialImage} />
            <div style={styles.testimonialContent}>
              <p>"A seamless experience from start to finish. Will book again!"</p>
              <h5>- Luna Nepal</h5>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div style={styles.testimonialCard}>
            <img src={person1} alt="John D." style={styles.testimonialImage} />
            <div style={styles.testimonialContent}>
              <p>"Fantastic customer support and well-organized trips. 5 stars!"</p>
              <h5>- Nabin Thapa</h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* footer */}
    <Footer />
  </div>
);

const styles = {
  pageBackground: {
    background: 'linear-gradient(to right, #ece9e6, #ffffff)',
    minHeight: '100vh',
  },
  sloganContainer: {
    textAlign: 'center',
    marginTop: '50px',
    marginBottom: '40px',
    padding: '20px',
    borderRadius: '10px',
  },
  
  sloganText: {
    // fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
  },
  whyChooseContainer: {
    padding: '40px 0',
    marginBottom: '50px',
  },
  featuresContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    maxWidth: '300px',
    textAlign: 'left',
  },
  testimonialsContainer: {
    marginBottom: '60px',
  },
  testimonialCard: {
    display: 'flex',
    alignItems: 'center',
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  testimonialImage: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    marginRight: '15px',
  },
  testimonialContent: {
    textAlign: 'left',
  }
};
