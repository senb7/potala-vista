// src/components/HeroCarousel.js
import nepal1 from '../assets/nepal1.jpg';
import nepal2 from '../assets/nepal2.jpg';
import nepal3 from '../assets/nepal3.jpg';
import nepal4 from '../assets/nepal4.jpg';
import nepal5 from '../assets/nepal5.jpg';

export const HeroCarousel = () => {
  const carouselImages = [
    {
      src: nepal2,
      title: "Eternal Landscapes",
      description: "Discover sacred & eternal landscapes in Nepal"
    },
    {
      src: nepal4,
      title: "A Dreamy Paradise",
      description: "Create unforgettable memories in Heaven-like places."
    },
    {
      src: nepal3,
      title: "Adventure Awaits",
      description: "Catch life's adventurous moments"
    },
    {
      src: nepal5,
      title: "On Top of the World",
      description: "Fly high in the lap of Himalayas"
    },
    {
      src: nepal1,
      title: "Luxury Experiences",
      description: "Indulge in premium travel packages"
    }
  ];

  return (
    <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel" style={{ marginTop: '56px' }} data-bs-interval="3000">
      <div className="carousel-inner">
        {carouselImages.map((image, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <img 
              src={image.src} 
              className="d-block w-100" 
              alt={`Travel ${index + 1}`}
              style={{ height: '600px', objectFit: 'cover' }}
            />
            <div className="carousel-caption">
              <h2>{image.title}</h2>
              <h5>{image.description}</h5>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
};